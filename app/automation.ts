<<<<<<< HEAD
import axios from 'axios';

// Grant Application Automation
export async function autoFillGrantApplication(grantUrl: string, orgProfile: Record<string, unknown>) {
  // Example: Scrape and summarize grant requirements
  const { data } = await axios.get(`/api/scrape?url=${encodeURIComponent(grantUrl)}`);
  // Example: Use AI to generate a draft application
  const draft = await axios.post('/api/ai/generate-grant-draft', { requirements: data, orgProfile });
  return draft.data;
}

// Donor Engagement Automation
export async function sendPersonalizedDonorEmail(donor: Record<string, unknown>, donationInfo: Record<string, unknown>) {
  // Example: Use AI to generate a personalized email
  const { data } = await axios.post<{ subject: string; body: string }>('/api/ai/generate-email', { donor, donationInfo });
  // Example: Send email via backend
  await axios.post('/api/send-email', { to: (donor as { email?: string }).email, subject: data.subject, body: data.body });
}

// Impact Reporting Automation
export async function generateImpactReport(onChainData: Record<string, unknown>, offChainData: Record<string, unknown>) {
  // Example: Use AI to analyze and summarize impact
  const { data } = await axios.post('/api/ai/generate-impact-report', { onChainData, offChainData });
  return data;
=======
async function postJson<TResponse>(url: string, body: unknown): Promise<TResponse> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as unknown;
  if (!response.ok) {
    const error =
      typeof data === 'object' && data !== null && 'error' in data && typeof data.error === 'string'
        ? data.error
        : 'Request failed.';
    throw new Error(error);
  }

  return data as TResponse;
}

export async function autoFillGrantApplication(
  grantUrl: string,
  orgProfile: Record<string, unknown>,
) {
  const grantPage = await postJson<{ text: string }>('/api/scrape', { url: grantUrl });
  return postJson('/api/ai/generate-grant-draft', {
    requirements: grantPage.text,
    orgProfile,
  });
}

export async function sendPersonalizedDonorEmail(
  donor: { name?: string; email?: string },
  donationInfo: Record<string, unknown>,
) {
  const draft = await postJson<{ subject: string; body: string }>('/api/ai/generate-email', {
    donor,
    donationInfo,
  });

  return postJson('/api/send-email', {
    to: donor.email,
    subject: draft.subject,
    body: draft.body,
    approved: false,
    previewOnly: true,
  });
}

export async function generateImpactReport(
  onChainData: Record<string, unknown>,
  offChainData: Record<string, unknown>,
) {
  return postJson('/api/ai/generate-impact-report', { onChainData, offChainData });
>>>>>>> origin/codex/production-readiness-upgrade
}
