import { z } from 'zod';

export const nominationSchema = z.object({
  nomineeName: z.string().min(2).max(120),
  nomineeEmail: z
    .string()
    .email()
    .optional()
    .or(z.literal('').transform(() => undefined)),
  nomineePhone: z
    .string()
    .min(7)
    .max(40)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  city: z.string().min(2).max(120),
  state: z.string().min(2).max(80),
  reason: z.string().min(40).max(2_500),
  requestedExperience: z
    .string()
    .max(1_000)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  nominatorName: z.string().min(2).max(120),
  nominatorEmail: z.string().email(),
  privacyAcknowledged: z.literal('on').or(z.literal(true)),
});

export const contactInquirySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  subject: z.string().min(4).max(160),
  message: z.string().min(20).max(2_000),
});

export type NominationInput = z.infer<typeof nominationSchema>;
export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;
