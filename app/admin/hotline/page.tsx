import { getPrisma } from '../../../lib/db';
import { requirePagePermission } from '../../../lib/auth/session';
import HotlineQueueClient from './HotlineQueueClient';

export default async function HotlinePage() {
  await requirePagePermission('nomination:review');

  const prisma = getPrisma();
  const escalations = await prisma.chatEscalation.findMany({
    where: { resolvedAt: null },
    include: {
      chatSession: {
        include: {
          messages: { orderBy: { timestamp: 'asc' } }
        }
      }
    },
    orderBy: { escalatedAt: 'desc' }
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Emergency Escalation Queue</h1>
          <p className="text-slate-600 mt-1">Review flagged GAWD Chatbot sessions and authorize Suicide Prevention Grants.</p>
        </div>
      </div>
      
      {escalations.length === 0 ? (
        <div className="bg-emerald-50 text-emerald-800 p-6 rounded-lg border border-emerald-200 text-center">
          <p className="font-semibold text-lg">Queue is clear.</p>
          <p className="text-sm mt-1">No active escalations require your attention.</p>
        </div>
      ) : (
        <HotlineQueueClient escalations={escalations} />
      )}
    </div>
  );
}
