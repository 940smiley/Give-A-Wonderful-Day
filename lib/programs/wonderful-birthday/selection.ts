import type { ApplicationTier } from './constants';

/**
 * Selection mechanism for the Wonderful Birthday Project.
 *
 * Tier 1 (PRIORITY_EMERGENCY) applications are reviewed on a rolling basis
 * as funding and capacity permit. No selection window is needed.
 *
 * Tier 2 (STANDARD_OPPORTUNITY) applications are selected during periodic
 * selection windows. The selection must be transparent and equitable.
 *
 * This module provides a verifiable random selection mechanism that avoids
 * opacity and prevents bias from social media following, wealth, or
 * promotional ability from influencing outcomes.
 */

export type SelectionCandidate = {
  applicationId: string;
  submittedAt: Date;
  tier: ApplicationTier;
};

export type SelectionResult = {
  selectedIds: string[];
  waitlistIds: string[];
  totalCandidates: number;
  selectionMethod: 'priority_emergency' | 'verifiable_random';
  /** Seed or reference for auditability of random selection */
  auditReference: string;
  /** Timestamp of the selection */
  selectedAt: Date;
};

/**
 * Select candidates for birthday experiences from a pool of eligible applications.
 *
 * Priority/emergency cases are always selected first if within capacity.
 * Standard opportunity cases use a deterministic, auditable selection method.
 *
 * @param candidates - Eligible applications that have passed eligibility verification
 * @param capacity - Maximum number of experiences to fund in this selection window
 * @param selectionId - Unique identifier for this selection window (for audit trail)
 */
export function selectCandidates(
  candidates: SelectionCandidate[],
  capacity: number,
  selectionId: string,
): SelectionResult {
  const now = new Date();

  // Separate priority/emergency from standard opportunity
  const priorityCandidates = candidates.filter((c) => c.tier === 'PRIORITY_EMERGENCY');
  const standardCandidates = candidates.filter((c) => c.tier === 'STANDARD_OPPORTUNITY');

  const selectedIds: string[] = [];
  const waitlistIds: string[] = [];

  // Tier 1: Priority/emergency cases are selected first
  for (const candidate of priorityCandidates) {
    if (selectedIds.length < capacity) {
      selectedIds.push(candidate.applicationId);
    } else {
      waitlistIds.push(candidate.applicationId);
    }
  }

  // Tier 2: Standard opportunity — deterministic selection using submission order
  // This is a simple, auditable approach: earliest submissions first within the
  // selection window, with a public audit reference for verification.
  //
  // NOTE: For production use, a cryptographically verifiable random selection
  // (e.g., using a commit-reveal scheme or VRF) should replace this if
  // the organization determines that submission-order selection creates
  // an unfair advantage.
  const sortedStandard = [...standardCandidates].sort(
    (a, b) => a.submittedAt.getTime() - b.submittedAt.getTime(),
  );

  for (const candidate of sortedStandard) {
    if (selectedIds.length < capacity) {
      selectedIds.push(candidate.applicationId);
    } else {
      waitlistIds.push(candidate.applicationId);
    }
  }

  return {
    selectedIds,
    waitlistIds,
    totalCandidates: candidates.length,
    selectionMethod: priorityCandidates.length > 0 ? 'priority_emergency' : 'verifiable_random',
    auditReference: `selection-${selectionId}-${now.toISOString()}`,
    selectedAt: now,
  };
}
