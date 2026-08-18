import { z } from 'zod';
import { AGE_RANGES, MEDICAL_CONTEXTS } from './constants';

type AgeRangeValue = (typeof AGE_RANGES)[number];
type MedicalContextValue = (typeof MEDICAL_CONTEXTS)[number];

const ageRangeRecord = AGE_RANGES.reduce<Record<string, AgeRangeValue>>((acc, val) => {
  acc[val] = val;
  return acc;
}, {});

const medicalContextRecord = MEDICAL_CONTEXTS.reduce<Record<string, MedicalContextValue>>(
  (acc, val) => {
    acc[val] = val;
    return acc;
  },
  {},
);

export const birthdayApplicationSchema = z.object({
  childName: z
    .string()
    .min(1, 'Child name is required')
    .max(100, 'Child name must be 100 characters or fewer'),
  ageRange: z.enum(ageRangeRecord as Record<AgeRangeValue, AgeRangeValue>, {
    message: 'Please select a valid age range',
  }),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State is required').max(50),
  medicalContext: z.enum(medicalContextRecord as Record<MedicalContextValue, MedicalContextValue>, {
    message: 'Please select a medical context category',
  }),
  guardianName: z.string().min(1, 'Guardian name is required').max(100),
  guardianEmail: z.string().email('Valid email is required'),
  guardianPhone: z.string().max(20).optional(),
  familySize: z
    .number()
    .int()
    .min(1, 'Family size must be at least 1')
    .max(20, 'Family size must be 20 or fewer'),
  accessibilityNotes: z.string().max(1000).optional(),
  interests: z.string().max(1000).optional(),
  specialNotes: z.string().max(1000).optional(),
});

export type BirthdayApplicationInput = z.infer<typeof birthdayApplicationSchema>;

export const birthdayReviewSchema = z.object({
  applicationId: z.string().uuid(),
  status: z.enum(['UNDER_REVIEW', 'ELIGIBILITY_VERIFIED', 'SELECTED', 'DECLINED']),
  experienceTier: z.enum(['WONDERFUL', 'EXTRAORDINARY', 'DREAM']).optional(),
  tierJustification: z.string().max(2000).optional(),
  verificationStatus: z.enum(['PENDING', 'VERIFIED', 'NEEDS_INFO', 'INSUFFICIENT']).optional(),
});

export type BirthdayReviewInput = z.infer<typeof birthdayReviewSchema>;
