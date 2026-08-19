import type { ExperiencePackageConfig } from './constants';

export const DEFAULT_WONDERFUL_PACKAGE: ExperiencePackageConfig = {
  celebration: {
    included: true,
    description: 'Birthday celebration with cake, decorations, and age-appropriate activities',
    estimatedCostCents: 15000,
  },
  familyExperience: {
    included: true,
    description: 'Shared family activity during the celebration',
    estimatedCostCents: 10000,
  },
  travel: { included: false },
  lodging: { included: false },
  transportation: {
    included: true,
    description: 'Local transportation to and from the celebration venue',
    estimatedCostCents: 5000,
  },
  meals: {
    included: true,
    description: 'Birthday meal for the immediate family',
    estimatedCostCents: 15000,
  },
  entertainment: {
    included: true,
    description: 'Age-appropriate entertainment or activity',
    estimatedCostCents: 10000,
  },
  gifts: {
    included: true,
    description: "Birthday gifts selected based on the child's interests",
    estimatedCostCents: 7500,
  },
  specialActivities: { included: false },
  photography: {
    included: true,
    description: 'Photo documentation of the celebration',
    estimatedCostCents: 5000,
  },
  videoMemoryPreservation: { included: false },
  accessibilityAccommodations: {
    included: true,
    description: 'Basic accessibility support as needed',
    estimatedCostCents: 5000,
  },
  familySupport: {
    included: true,
    description: 'Coordination and planning support for the family',
    estimatedCostCents: 5000,
  },
};

export const DEFAULT_EXTRAORDINARY_PACKAGE: ExperiencePackageConfig = {
  celebration: {
    included: true,
    description: 'Enhanced birthday celebration with themed decorations and activities',
    estimatedCostCents: 30000,
  },
  familyExperience: {
    included: true,
    description: 'Expanded family experience with extended family welcome',
    estimatedCostCents: 20000,
  },
  travel: {
    included: true,
    description: 'Travel to a special venue or destination within the region',
    estimatedCostCents: 25000,
  },
  lodging: { included: false },
  transportation: {
    included: true,
    description: 'Dedicated transportation for the family',
    estimatedCostCents: 10000,
  },
  meals: {
    included: true,
    description: 'Catered birthday meal with dietary accommodations',
    estimatedCostCents: 25000,
  },
  entertainment: {
    included: true,
    description: 'Professional entertainment or special activity experience',
    estimatedCostCents: 25000,
  },
  gifts: {
    included: true,
    description: "Curated birthday gifts aligned with the child's interests",
    estimatedCostCents: 15000,
  },
  specialActivities: {
    included: true,
    description: 'Special themed activity or experience',
    estimatedCostCents: 20000,
  },
  photography: {
    included: true,
    description: 'Professional photography session',
    estimatedCostCents: 15000,
  },
  videoMemoryPreservation: {
    included: true,
    description: 'Edited video montage of the celebration',
    estimatedCostCents: 20000,
  },
  accessibilityAccommodations: {
    included: true,
    description: 'Full accessibility accommodations and support',
    estimatedCostCents: 10000,
  },
  familySupport: {
    included: true,
    description: 'Comprehensive planning and day-of coordination',
    estimatedCostCents: 10000,
  },
};

export const DEFAULT_DREAM_PACKAGE: ExperiencePackageConfig = {
  celebration: {
    included: true,
    description: "Elaborate themed birthday celebration designed around the child's dreams",
    estimatedCostCents: 50000,
  },
  familyExperience: {
    included: true,
    description: 'Full family experience including extended family and close friends',
    estimatedCostCents: 35000,
  },
  travel: {
    included: true,
    description: 'Travel to a dream destination',
    estimatedCostCents: 60000,
  },
  lodging: {
    included: true,
    description: 'Lodging accommodation for the family during the experience',
    estimatedCostCents: 40000,
  },
  transportation: {
    included: true,
    description: 'Full transportation including flights or private transport',
    estimatedCostCents: 30000,
  },
  meals: {
    included: true,
    description: 'All meals during the experience with dietary accommodations',
    estimatedCostCents: 40000,
  },
  entertainment: {
    included: true,
    description: 'Premium entertainment and immersive experiences',
    estimatedCostCents: 40000,
  },
  gifts: {
    included: true,
    description: "Thoughtfully curated gifts reflecting the child's passions",
    estimatedCostCents: 25000,
  },
  specialActivities: {
    included: true,
    description: 'Bespoke special activities designed for the child',
    estimatedCostCents: 35000,
  },
  photography: {
    included: true,
    description: 'Full professional photography and videography',
    estimatedCostCents: 25000,
  },
  videoMemoryPreservation: {
    included: true,
    description: 'Professionally produced memory video with narrative',
    estimatedCostCents: 35000,
  },
  accessibilityAccommodations: {
    included: true,
    description: 'Comprehensive accessibility planning and on-site support',
    estimatedCostCents: 15000,
  },
  familySupport: {
    included: true,
    description: 'End-to-end experience management including pre and post-event support',
    estimatedCostCents: 15000,
  },
};

export const EXPERIENCE_PACKAGES = {
  WONDERFUL: DEFAULT_WONDERFUL_PACKAGE,
  EXTRAORDINARY: DEFAULT_EXTRAORDINARY_PACKAGE,
  DREAM: DEFAULT_DREAM_PACKAGE,
} as const;

export function getDefaultPackageForTier(
  tier: 'WONDERFUL' | 'EXTRAORDINARY' | 'DREAM',
): ExperiencePackageConfig {
  return EXPERIENCE_PACKAGES[tier];
}

export function estimatePackageCost(pkg: ExperiencePackageConfig): {
  minCents: number;
  maxCents: number;
} {
  let minCents = 0;
  let maxCents = 0;

  for (const component of Object.values(pkg)) {
    if (component.included && component.estimatedCostCents) {
      minCents += component.estimatedCostCents;
      maxCents += component.estimatedCostCents;
    }
  }

  return { minCents, maxCents };
}
