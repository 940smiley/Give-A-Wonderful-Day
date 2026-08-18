'use client';

import { useState } from 'react';
import PublicPage from '../components/PublicPage';

type PartnerTab = 'referral' | 'grant-builder' | 'onboarding';

type ReferralRecord = {
  referralId: string;
  partnerOrg: string;
  clientInitials: string;
  needCategory: string;
  status: 'Pending Verification' | 'Matched & Funded' | 'Active Support';
  submittedAt: string;
};

export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState<PartnerTab>('referral');

  // Referral form state
  const [partnerOrgName, setPartnerOrgName] = useState('Hope Community Center');
  const [caseManagerName, setCaseManagerName] = useState('David Miller');
  const [clientInitials, setClientInitials] = useState('R.T.');
  const [clientCity, setClientCity] = useState('Oakland, CA');
  const [referralCategory, setReferralCategory] = useState('Emergency Housing Aid');
  const [consentVerified, setConsentVerified] = useState(true);

  const [submittedReferral, setSubmittedReferral] = useState<ReferralRecord | null>(null);

  // AI Grant Builder state
  const [grantPartnerName, setGrantPartnerName] = useState('Valley Youth & Family Services');
  const [targetDemographic, setTargetDemographic] = useState('Unsheltered youth & single caregivers');
  const [requestedCoFunding, setRequestedCoFunding] = useState(5000);
  const [projectGoal, setProjectGoal] = useState('Emergency winter shelter kits & warm meal vouchers');
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);

  // Partner Onboarding state
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgEin, setNewOrgEin] = useState('');
  const [newOrgWebsite, setNewOrgWebsite] = useState('');
  const [onboardSuccess, setOnboardSuccess] = useState(false);

  function handleReferralSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newRef: ReferralRecord = {
      referralId: `GAWD-REF-${Math.floor(1000 + Math.random() * 9000)}`,
      partnerOrg: partnerOrgName,
      clientInitials,
      needCategory: referralCategory,
      status: 'Matched & Funded',
      submittedAt: new Date().toLocaleDateString(),
    };
    setSubmittedReferral(newRef);
  }

  function handleGenerateGrantDraft(e: React.FormEvent) {
    e.preventDefault();
    setIsGeneratingDraft(true);

    setTimeout(() => {
      const draft = `EXECUTIVE CO-FUNDING PROPOSAL
--------------------------------------------------
Partner Organization: ${grantPartnerName}
Co-Funding Partner: Give A Wonderful Day Foundation
Requested Co-Funding Amount: $${requestedCoFunding.toLocaleString()} USD
Target Population: ${targetDemographic}

PROJECT OBJECTIVE:
${projectGoal}

PROGRAMMATIC IMPACT & DELIVERABLES:
1. Rapid Aid Deployment: Direct distribution of $${requestedCoFunding.toLocaleString()} in micro-grants and essential care packages within 7 business days.
2. Shared Casework: Dual-agency case navigation ensuring non-duplication of benefits and 100% consent-verified privacy.
3. Measurable Outcomes: Shared impact tracking on local community warm-moments dashboard with transparent financial reporting.

SUBMISSION STATUS: Ready for Board Review & Co-Funding Authorization.`;

      setGeneratedDraft(draft);
      setIsGeneratingDraft(false);
    }, 900);
  }

  function handleOnboardingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOnboardSuccess(true);
  }

  return (
    <PublicPage
      title="Nonprofit Partner Network"
      intro="A collaborative portal for registered nonprofit organizations, community health centers, and social service providers. Cross-refer clients with verified privacy, generate joint grant proposals, and share community resources."
    >
      {/* Network Stats Banner */}
      <div className="mb-8 rounded-2xl bg-slate-900 p-6 text-white shadow-md">
        <div className="grid gap-6 sm:grid-cols-3 text-center sm:text-left">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Active Partners</span>
            <p className="text-3xl font-black mt-1">48 Nonprofits</p>
            <p className="text-xs text-slate-400 mt-0.5">Shelters, food banks, care clinics</p>
          </div>
          <div className="border-t sm:border-t-0 sm:border-l border-slate-700 pt-4 sm:pt-0 sm:pl-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Joint Referrals Fulfilled</span>
            <p className="text-3xl font-black mt-1">1,420 Clients</p>
            <p className="text-xs text-slate-400 mt-0.5">Zero duplication of benefits</p>
          </div>
          <div className="border-t sm:border-t-0 sm:border-l border-slate-700 pt-4 sm:pt-0 sm:pl-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Co-Funding Distributed</span>
            <p className="text-3xl font-black mt-1">$380,000 USD</p>
            <p className="text-xs text-slate-400 mt-0.5">In direct local micro-grants</p>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-4 mb-8 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('referral')}
          className={`pb-3 text-sm font-bold transition border-b-2 whitespace-nowrap ${
            activeTab === 'referral'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          🤝 Case Manager Client Referral Hub
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('grant-builder')}
          className={`pb-3 text-sm font-bold transition border-b-2 whitespace-nowrap ${
            activeTab === 'grant-builder'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          📝 Joint Grant & Co-Funding Builder
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('onboarding')}
          className={`pb-3 text-sm font-bold transition border-b-2 whitespace-nowrap ${
            activeTab === 'onboarding'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          🏛 Partner Registration & Onboarding
        </button>
      </div>

      {/* TAB 1: Case Manager Client Referral Hub */}
      {activeTab === 'referral' && (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Cross-Agency Client Referral</h3>
              <p className="text-xs text-slate-600 mt-1">
                Case managers can refer clients directly for Give A Wonderful Day micro-grants or care packages with automated consent tracking.
              </p>
            </div>

            <form onSubmit={handleReferralSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700" htmlFor="partnerOrgName">
                    Referring Organization *
                  </label>
                  <input
                    id="partnerOrgName"
                    type="text"
                    required
                    value={partnerOrgName}
                    onChange={(e) => setPartnerOrgName(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700" htmlFor="caseManagerName">
                    Case Manager Name *
                  </label>
                  <input
                    id="caseManagerName"
                    type="text"
                    required
                    value={caseManagerName}
                    onChange={(e) => setCaseManagerName(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700" htmlFor="clientInitials">
                    Client Initials / ID *
                  </label>
                  <input
                    id="clientInitials"
                    type="text"
                    required
                    value={clientInitials}
                    onChange={(e) => setClientInitials(e.target.value)}
                    placeholder="E.g. J.D."
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700" htmlFor="clientCity">
                    Location *
                  </label>
                  <input
                    id="clientCity"
                    type="text"
                    required
                    value={clientCity}
                    onChange={(e) => setClientCity(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700" htmlFor="referralCategory">
                    Service Needed *
                  </label>
                  <select
                    id="referralCategory"
                    value={referralCategory}
                    onChange={(e) => setReferralCategory(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white"
                  >
                    <option value="Emergency Housing Aid">Emergency Housing Aid</option>
                    <option value="Food & Care Package">Food & Care Package</option>
                    <option value="Childcare / Family Respite">Childcare / Family Respite</option>
                    <option value="Transportation Aid">Transportation Aid</option>
                  </select>
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                <label className="flex items-start gap-3 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentVerified}
                    onChange={(e) => setConsentVerified(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    required
                  />
                  <span>
                    <strong>Client Consent Verified:</strong> I confirm that the client has authorized our organization to share referral information for receiving emergency aid.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800 transition shadow-sm"
              >
                Submit Partner Client Referral →
              </button>
            </form>

            {submittedReferral && (
              <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50/50 p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-emerald-950 text-base">Referral Processed</h4>
                  <span className="font-mono text-xs font-bold bg-emerald-200 text-emerald-900 px-2.5 py-1 rounded">
                    {submittedReferral.referralId}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                  <p><strong>Partner Agency:</strong> {submittedReferral.partnerOrg}</p>
                  <p><strong>Client Code:</strong> {submittedReferral.clientInitials}</p>
                  <p><strong>Category:</strong> {submittedReferral.needCategory}</p>
                  <p><strong>Status:</strong> <span className="text-emerald-800 font-bold">{submittedReferral.status}</span></p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span>⚡</span> Rapid Turnaround SLA
              </h4>
              <p className="text-xs text-slate-600">
                Partner referrals with verified caseworker consent are prioritized for disbursement within <strong>24 business hours</strong>.
              </p>
              <div className="bg-slate-50 p-3 rounded text-xs space-y-1.5 border border-slate-200">
                <p className="text-slate-700"><strong>Direct Vendor Payments:</strong> Landlords & utilities paid directly.</p>
                <p className="text-slate-700"><strong>Zero Fee Structure:</strong> 100% of referral funding reaches client care.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Joint Grant & Co-Funding Builder */}
      {activeTab === 'grant-builder' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Co-Funding & Joint Grant Application Builder</h3>
            <p className="text-xs text-slate-600 mt-1">
              Collaborate on community proposals. Generate a structured co-funding draft to present to foundation boards and philanthropic sponsors.
            </p>
          </div>

          <form onSubmit={handleGenerateGrantDraft} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700" htmlFor="grantPartnerName">
                  Your Organization Name *
                </label>
                <input
                  id="grantPartnerName"
                  type="text"
                  required
                  value={grantPartnerName}
                  onChange={(e) => setGrantPartnerName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700" htmlFor="requestedCoFunding">
                  Requested Joint Co-Funding Amount ($ USD) *
                </label>
                <input
                  id="requestedCoFunding"
                  type="number"
                  min={500}
                  max={50000}
                  step={500}
                  required
                  value={requestedCoFunding}
                  onChange={(e) => setRequestedCoFunding(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700" htmlFor="targetDemographic">
                Target Community Demographic *
              </label>
              <input
                id="targetDemographic"
                type="text"
                required
                value={targetDemographic}
                onChange={(e) => setTargetDemographic(e.target.value)}
                placeholder="e.g. Low-income seniors, unsheltered families, veteran caregivers"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700" htmlFor="projectGoal">
                Specific Project Objective & Deliverables *
              </label>
              <textarea
                id="projectGoal"
                required
                rows={3}
                value={projectGoal}
                onChange={(e) => setProjectGoal(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isGeneratingDraft}
              className="w-full rounded-md bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 transition disabled:opacity-60"
            >
              {isGeneratingDraft ? 'Synthesizing Co-Funding Proposal...' : 'Generate Joint Grant Proposal Draft →'}
            </button>
          </form>

          {generatedDraft && (
            <div className="rounded-xl bg-slate-900 text-slate-100 p-5 space-y-3 font-mono text-xs shadow-inner">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-amber-400 font-bold">📄 Generated Proposal Draft</span>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(generatedDraft)}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded"
                >
                  Copy Text
                </button>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed">{generatedDraft}</pre>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Partner Onboarding */}
      {activeTab === 'onboarding' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm max-w-2xl mx-auto space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Partner Organization Onboarding</h3>
            <p className="text-xs text-slate-600 mt-1">
              Join our network of 501(c)(3) nonprofits, community health centers, and emergency service providers.
            </p>
          </div>

          {onboardSuccess ? (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
              <span className="text-3xl">🎉</span>
              <h4 className="font-bold text-emerald-950 text-lg">Partner Onboarding Request Received</h4>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                Thank you, <strong>{newOrgName}</strong>. Our partner relations team will review your EIN verification ({newOrgEin}) and activate your referral credentials within 1 business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleOnboardingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700" htmlFor="newOrgName">
                  Organization Name *
                </label>
                <input
                  id="newOrgName"
                  type="text"
                  required
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  placeholder="e.g. Metro Food Bank Coalition"
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700" htmlFor="newOrgEin">
                    Federal EIN / Tax ID *
                  </label>
                  <input
                    id="newOrgEin"
                    type="text"
                    required
                    value={newOrgEin}
                    onChange={(e) => setNewOrgEin(e.target.value)}
                    placeholder="XX-XXXXXXX"
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700" htmlFor="newOrgWebsite">
                    Organization Website *
                  </label>
                  <input
                    id="newOrgWebsite"
                    type="url"
                    required
                    value={newOrgWebsite}
                    onChange={(e) => setNewOrgWebsite(e.target.value)}
                    placeholder="https://example.org"
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800 transition"
              >
                Submit Organization Onboarding Request →
              </button>
            </form>
          )}
        </div>
      )}
    </PublicPage>
  );
}
