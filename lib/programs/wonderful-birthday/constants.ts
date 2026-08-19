export const PROGRAM_NAME = 'Wonderful Birthday Project';
export const PROGRAM_SLUG = 'wonderful-birthday';

export const AGE_RANGES = ['0-4', '5-8', '9-12', '13-17'] as const;
export type AgeRange = (typeof AGE_RANGES)[number];

export const MEDICAL_CONTEXTS = [
  'Life-limiting condition',
  'Terminal illness',
  'Critical illness',
  'Severe chronic condition',
  'Palliative care',
  'Other extraordinary circumstance',
] as const;
export type MedicalContext = (typeof MEDICAL_CONTEXTS)[number];

export const EXPERIENCE_TIERS = {
  WONDERFUL: {
    label: 'Wonderful Birthday',
    description:
      "A meaningful birthday celebration tailored to the child's interests, shared with close family.",
  },
  EXTRAORDINARY: {
    label: 'Extraordinary Birthday',
    description:
      'An expanded celebration with additional elements such as travel, special activities, or professional photography.',
  },
  DREAM: {
    label: 'Dream Birthday',
    description:
      'A comprehensive experience designed to create lasting memories, potentially including travel, lodging, entertainment, and memory preservation.',
  },
} as const;

export const APPLICATION_TIERS = {
  PRIORITY_EMERGENCY: {
    label: 'Priority / Emergency',
    description:
      'For families facing urgent circumstances where time-sensitive planning is essential.',
  },
  STANDARD_OPPORTUNITY: {
    label: 'Wonderful Birthday Opportunity',
    description:
      'For eligible children during periodic selection windows when funding and capacity permit.',
  },
} as const;

export type ApplicationTier = keyof typeof APPLICATION_TIERS;

export const EXPERIENCE_COMPONENTS = [
  'celebration',
  'familyExperience',
  'travel',
  'lodging',
  'transportation',
  'meals',
  'entertainment',
  'gifts',
  'specialActivities',
  'photography',
  'videoMemoryPreservation',
  'accessibilityAccommodations',
  'familySupport',
] as const;
export type ExperienceComponent = (typeof EXPERIENCE_COMPONENTS)[number];

export type ExperienceComponentConfig = {
  included: boolean;
  description?: string;
  estimatedCostCents?: number;
};

export type ExperiencePackageConfig = Record<ExperienceComponent, ExperienceComponentConfig>;
