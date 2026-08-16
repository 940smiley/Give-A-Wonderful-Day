import { z } from 'zod';
import { jsonError, jsonOk, readJsonBody, safeJsonError } from '../../../lib/api';
import { getPrisma } from '../../../lib/db';
import { getAiProvider } from '../../../lib/ai/provider';
import { checkRateLimit, rateLimitKey } from '../../../lib/rate-limit';

export const runtime = 'nodejs';

const chatMessageSchema = z.object({
  sessionId: z.string().uuid().optional(),
  message: z.string().min(1).max(2000),
});

export async function POST(request: Request) {
  // Stricter rate limit for public chat
  const limit = checkRateLimit(rateLimitKey(request, 'gawd:chat'), {
    limit: 15,
    windowMs: 60_000,
  });
  
  if (!limit.allowed) {
    return jsonError('Too many chat requests.', 429);
  }

  try {
    const input = await readJsonBody(request, chatMessageSchema, 4_000);
    const prisma = getPrisma();
    const provider = getAiProvider();

    let sessionId = input.sessionId;
    let history: { role: 'USER' | 'GAWD' | 'SYSTEM'; content: string }[] = [];

    if (sessionId) {
      const session = await prisma.chatSession.findUnique({
        where: { id: sessionId },
        include: {
          messages: {
            orderBy: { timestamp: 'asc' },
            take: 50, // Context window limit
          }
        },
      });

      if (!session) {
        return jsonError('Session not found.', 404);
      }
      
      if (session.status !== 'ACTIVE') {
        return jsonError('This chat session is no longer active.', 403);
      }

      history = session.messages.map(m => ({
        role: m.role as 'USER' | 'GAWD' | 'SYSTEM',
        content: m.content
      }));
    } else {
      // Create new session
      const newSession = await prisma.chatSession.create({ data: {} });
      sessionId = newSession.id;
    }

    // Append new user message to history
    const userMessage = { role: 'USER' as const, content: input.message };
    history.push(userMessage);

    // Save user message to DB
    await prisma.chatMessage.create({
      data: {
        chatSessionId: sessionId,
        role: 'USER',
        content: input.message,
      }
    });

    // Call AI Provider with guardrails
    const aiResponse = await provider.chatWithGawd(history);

    // Save GAWD response to DB
    await prisma.chatMessage.create({
      data: {
        chatSessionId: sessionId,
        role: 'GAWD',
        content: aiResponse.response,
      }
    });

    // Handle escalation if guardrails were triggered
    if (aiResponse.flagged) {
      await prisma.chatSession.update({
        where: { id: sessionId },
        data: { status: 'ESCALATED' }
      });

      await prisma.chatEscalation.create({
        data: {
          chatSessionId: sessionId,
          reason: 'Automated guardrail triggered: Self-harm or violence mentioned.',
        }
      });
    }

    return jsonOk({ 
      sessionId, 
      response: aiResponse.response,
      isEscalated: aiResponse.flagged 
    });
  } catch (error) {
    return safeJsonError(error, 400);
  }
}
