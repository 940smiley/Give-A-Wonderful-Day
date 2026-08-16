'use client';

import { useState } from 'react';
import PublicPage from '../components/PublicPage';

type ServiceType = {
  id: string;
  title: string;
  category: string;
  priorityTier: string;
  description: string;
  estimatedTurnaround: string;
  maxGrantValue: string;
  icon: string;
};

const SERVICES: ServiceType[] = [
  {
    id: 'assault-survivor',
    title: 'Survivors of Assault & Violence Refuge',
    category: 'Priority "Wonderful Day" Allocation',
    priorityTier: 'Tier 1 Priority (Automatic)',
    description: 'Immediate safe refuge, trauma-informed emergency relocation, security assistance, and a dedicated "Wonderful Day" respite package. Automatically prioritized as funds allow.',
    estimatedTurnaround: '12–24 hours (Expedited)',
    maxGrantValue: 'Automatic Priority Aid',
    icon: '🛡️',
  },
  {
    id: 'terminal-illness',
    title: 'Terminally Ill Patients & Palliative Care',
    category: 'Priority "Wonderful Day" Allocation',
    priorityTier: 'Tier 1 Priority (Automatic)',
    description: 'Joyful family memory creation, specialized medical respite, wish fulfillment, and comfort care packages for individuals and families facing terminal diagnoses.',
    estimatedTurnaround: '24 hours (Expedited)',
    maxGrantValue: 'Automatic Priority Aid',
    icon: '🕊️',
  },
  {
    id: 'emergency-grant',
    title: 'Emergency Relief Micro-Grant',
    category: 'Financial Assistance',
    priorityTier: 'Standard Priority',
    description: 'Immediate micro-grant ($250 – $1,000) for essential needs such as overdue utilities, housing preservation, or urgent medical prescriptions.',
    estimatedTurnaround: '24–48 hours',
    maxGrantValue: 'Up to $1,000',
    icon: '⚡',
  },
  {
    id: 'warmth-care',
    title: 'Gentle Warmth & Care Package',
    category: 'Encouragement & Dignity',
    priorityTier: 'Standard Priority',
    description: 'Customized care box filled with essential hygiene items, warm meal vouchers, handwritten community encouragement notes, and grocery support.',
    estimatedTurnaround: '2–3 business days',
    maxGrantValue: '$150 Value',
    icon: '☀',
  },
];

type EmergencyAgency = {
  name: string;
  service: string;
  contact: string;
  availability: string;
  website: string;
};

const EMERGENCY_AGENCIES: EmergencyAgency[] = [
  {
    name: 'National Domestic Violence Hotline',
    service: '24/7 Confidential Refuge & Safety Planning',
    contact: '1-800-799-SAFE (7233) · Text "START" to 88788',
    availability: '24/7 / 365 Days',
    website: 'https://thehotline.org',
  },
  {
    name: 'RAINN Sexual Assault Hotline',
    service: '24/7 Crisis Intervention & Trauma Support',
    contact: '1-800-656-4673',
    availability: '24/7 Instant Response',
    website: 'https://rainn.org',
  },
  {
    name: '988 Suicide & Crisis Lifeline',
    service: 'Free Mental Health & Emotional Support',
    contact: 'Dial 988',
    availability: '24/7 / 365 Days',
    website: 'https://988lifeline.org',
  },
  {
    name: 'National Shelter & Housing Directory (HUD/211)',
    service: 'Immediate Emergency Beds & Overnight Refuge',
    contact: 'Call 211',
    availability: 'Local Regional Match',
    website: 'https://211.org',
  },
  {
    name: 'National Hospice & Palliative Care Helpline',
    service: 'Palliative Respite & Family Grief Guidance',
    contact: '1-800-658-8898',
    availability: 'Mon-Fri 8am-8pm EST',
    website: 'https://nhpco.org',
  },
];

type ApplicationRecord = {
  id: string;
  serviceTitle: string;
  applicantName: string;
  email: string;
  city: string;
  urgency: string;
  status: 'Submitted' | 'Under Review & Verification' | 'Approved & Dispatched';
  submittedAt: string;
  trackingCode: string;
  details: string;
  verificationMethod: string;
  isPriorityAllocation: boolean;
};

export default function AssistancePage() {
  const [selectedService, setSelectedService] = useState<ServiceType>(SERVICES[0]!);
  const [step, setStep] = useState<number>(1);

  // Form fields
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [needDescription, setNeedDescription] = useState('');

  // Verification & Background Check fields
  const [caseNumber, setCaseNumber] = useState('');
  const [advocateName, setAdvocateName] = useState('');
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [verificationPassed, setVerificationPassed] = useState(false);

  // Demo Submission state
  const [submittedApp, setSubmittedApp] = useState<ApplicationRecord | null>(null);
  const [searchTrackingCode, setSearchTrackingCode] = useState('');
  const [searchedApp, setSearchedApp] = useState<ApplicationRecord | null>(null);
  const [searchError, setSearchError] = useState('');

  // Sample historical demo application
  const sampleApps: ApplicationRecord[] = [
    {
      id: 'app-sample-1',
      serviceTitle: 'Survivors of Assault & Violence Refuge',
      applicantName: 'M. S.',
      email: 'm.s***@example.com',
      city: 'Chicago, IL',
      urgency: 'Immediate Safety (12h)',
      status: 'Approved & Dispatched',
      submittedAt: '2026-08-15',
      trackingCode: 'GAWD-AST-9921',
      details: 'Expedited safe refuge voucher and Wonderful Day relocation care box dispatched via advocate verification.',
      verificationMethod: 'Verified by Shelter Advocate (ID #7819)',
      isPriorityAllocation: true,
    },
  ];

  function handleSubmitApplication(e: React.FormEvent) {
    e.preventDefault();
    const trackingCode = `GAWD-AST-${Math.floor(1000 + Math.random() * 9000)}`;
    const isPriority = selectedService.id === 'assault-survivor' || selectedService.id === 'terminal-illness';

    const newRecord: ApplicationRecord = {
      id: `app-${Date.now()}`,
      serviceTitle: selectedService.title,
      applicantName,
      email,
      city: `${city}, ${state}`,
      urgency: isPriority ? 'Automatic Priority "Wonderful Day" Allocation' : 'Standard (24–48h)',
      status: 'Under Review & Verification',
      submittedAt: new Date().toLocaleDateString(),
      trackingCode,
      details: needDescription,
      verificationMethod: documentUploaded || advocateName ? 'Identity & Advocate Attestation Verified' : 'Pending Verification Review',
      isPriorityAllocation: isPriority,
    };

    setSubmittedApp(newRecord);
    setStep(3); // Confirmation step
  }

  function handleSimulateDocUpload() {
    setDocumentUploaded(true);
    setTimeout(() => {
      setVerificationPassed(true);
    }, 600);
  }

  function handleSearchTracking(e: React.FormEvent) {
    e.preventDefault();
    setSearchError('');
    const code = searchTrackingCode.trim().toUpperCase();

    if (submittedApp && submittedApp.trackingCode.toUpperCase() === code) {
      setSearchedApp(submittedApp);
      return;
    }

    const found = sampleApps.find((app) => app.trackingCode.toUpperCase() === code);
    if (found) {
      setSearchedApp(found);
    } else {
      setSearchError(`No demo record found for tracking code &quot;${code}&quot;. Try GAWD-AST-9921.`);
      setSearchedApp(null);
    }
  }

  return (
    <PublicPage
      title="Apply for Assistance"
      intro="A dignified, safe, and confidential portal. Priority automatic 'Wonderful Day' allocations are granted to assault survivors and terminally ill patients as funds allow, backed by verification safeguards and immediate 24/7 emergency agency resources."
    >
      {/* Top Banner / Priority Notice */}
      <div className="mb-8 rounded-2xl bg-amber-50 border border-amber-200 p-5 text-amber-950 text-sm flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5">🕊️</span>
          <div>
            <p className="font-bold text-base">Automatic &quot;Wonderful Day&quot; Priority Allocation:</p>
            <p className="text-xs text-amber-900 mt-1">
              Survivors of assault/domestic violence and terminally ill patients receive automatic priority allocation of &quot;A Wonderful Day&quot; experiences and emergency relief as funds allow. Strict anti-scam background checks &amp; professional verification protect all funds.
            </p>
          </div>
        </div>
        <a href="#emergency-directory" className="font-bold underline text-amber-900 hover:text-amber-800 text-xs">
          View Immediate 24/7 Emergency Agencies ↓
        </a>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Main Application Flow */}
        <div className="space-y-8">
          {/* Step 1: Program Selection */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">1. Select Assistance Program</h2>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                Step {step} of 3
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {SERVICES.map((service) => {
                const isSelected = selectedService.id === service.id;
                const isPriority = service.id === 'assault-survivor' || service.id === 'terminal-illness';

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      setSelectedService(service);
                      if (step === 3) setStep(1);
                    }}
                    className={`text-left p-4 rounded-xl border-2 transition relative ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {isPriority && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full">
                        Automatic Priority
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{service.icon}</span>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm leading-tight">{service.title}</h3>
                        <p className="text-[11px] text-emerald-800 font-semibold">{service.category}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">{service.description}</p>
                    <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1 font-medium">
                      <span>⏱ Turnaround:</span> <strong>{service.estimatedTurnaround}</strong>
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Application Details & Verification Safeguard */}
          {step < 3 && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">2. Application & Anti-Scam Verification</h2>
                <p className="text-xs text-slate-600">
                  Selected program: <strong className="text-emerald-800">{selectedService.title}</strong> ({selectedService.priorityTier})
                </p>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700" htmlFor="applicantName">
                      Applicant Full Name *
                    </label>
                    <input
                      id="applicantName"
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="Jane Doe"
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700" htmlFor="email">
                      Confidential Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700" htmlFor="phone">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-1234"
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700" htmlFor="city">
                        City *
                      </label>
                      <input
                        id="city"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Chicago"
                        className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700" htmlFor="state">
                        State *
                      </label>
                      <input
                        id="state"
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="IL"
                        className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700" htmlFor="description">
                    Summary of Situation & Requested Assistance *
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={3}
                    value={needDescription}
                    onChange={(e) => setNeedDescription(e.target.value)}
                    placeholder="Describe your current situation, immediate refuge/medical needs, or specific items requested..."
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>

                {/* Background Check & Scam Prevention System */}
                <div className="rounded-xl bg-slate-900 text-white p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>🛡️</span> Verification & Scam Prevention Check
                    </span>
                    <span className="text-[11px] text-slate-400">Protects donor funds & ensures direct aid to genuine victims</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    To ensure funds reach verified victims and prevent fraudulent claims, applications require at least <strong>one proof verification method</strong> (Advocate attestation, Case/Hospital reference number, or document verification).
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2 text-slate-900">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300" htmlFor="caseNumber">
                        Case # / Hospital Ref ID / Police Report #
                      </label>
                      <input
                        id="caseNumber"
                        type="text"
                        value={caseNumber}
                        onChange={(e) => setCaseNumber(e.target.value)}
                        placeholder="e.g. CR-2026-8812 / SW-9021"
                        className="mt-1 w-full rounded border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300" htmlFor="advocateName">
                        Social Worker / Doctor / Advocate Name
                      </label>
                      <input
                        id="advocateName"
                        type="text"
                        value={advocateName}
                        onChange={(e) => setAdvocateName(e.target.value)}
                        placeholder="e.g. Dr. Sarah Jenkins / Advocate Miller"
                        className="mt-1 w-full rounded border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleSimulateDocUpload}
                      className="px-3 py-1.5 text-xs font-bold rounded bg-amber-400 text-amber-950 hover:bg-amber-300 transition"
                    >
                      {documentUploaded ? '✓ Document Uploaded' : '📎 Simulate Upload Verification Doc (PDF/ID/Letter)'}
                    </button>

                    {verificationPassed && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        ✓ Background Credentials Pre-Verified
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800 transition shadow-sm"
                >
                  Submit Priority Assistance Request →
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && submittedApp && (
            <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50/40 p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-2xl text-white">
                  ✓
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-emerald-950">Assistance Request Submitted</h2>
                  <p className="text-sm text-emerald-800">Your application has entered our priority review workflow.</p>
                </div>
              </div>

              <div className="rounded-xl bg-white border border-emerald-200 p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 flex-wrap gap-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Application Tracking ID</p>
                    <p className="text-2xl font-black font-mono text-emerald-800">{submittedApp.trackingCode}</p>
                  </div>
                  <span className="rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-bold">
                    {submittedApp.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 text-xs">Program Requested</p>
                    <p className="font-semibold text-slate-900">{submittedApp.serviceTitle}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Applicant Name</p>
                    <p className="font-semibold text-slate-900">{submittedApp.applicantName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Priority Tier</p>
                    <p className="font-semibold text-emerald-800">{submittedApp.urgency}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Verification Check</p>
                    <p className="font-semibold text-slate-900">{submittedApp.verificationMethod}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setSubmittedApp(null);
                  }}
                  className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Submit Another Request
                </button>
                <a
                  href="#emergency-directory"
                  className="rounded-md bg-amber-500 px-4 py-2 text-sm font-bold text-amber-950 hover:bg-amber-400"
                >
                  Need Immediate Help? View Hotlines ↓
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Immediate Emergency Resource Directory & Status Search */}
        <div className="space-y-6">
          {/* Emergency Hotline Directory */}
          <div id="emergency-directory" className="rounded-xl border-2 border-red-200 bg-red-50/30 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🚨</span>
              <h3 className="font-bold text-red-950 text-base">Immediate 24/7 Crisis & Shelter Directory</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              If you are in immediate danger or need shelter/food while your application is processed, contact these 24/7 verified resources right away:
            </p>

            <div className="space-y-3">
              {EMERGENCY_AGENCIES.map((agency) => (
                <div key={agency.name} className="bg-white p-3 rounded-lg border border-red-200 text-xs space-y-1">
                  <p className="font-bold text-slate-900">{agency.name}</p>
                  <p className="text-slate-600">{agency.service}</p>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-100 font-mono">
                    <span className="font-bold text-red-700">{agency.contact}</span>
                    <a href={agency.website} target="_blank" rel="noreferrer" className="text-emerald-800 underline font-semibold">
                      Visit →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Tracker */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <span>🔍</span> Track Request Status
            </h3>

            <form onSubmit={handleSearchTracking} className="mt-3 space-y-3">
              <input
                type="text"
                placeholder="e.g. GAWD-AST-9921"
                value={searchTrackingCode}
                onChange={(e) => setSearchTrackingCode(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono uppercase"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                Search Tracking ID
              </button>
            </form>

            {searchError && (
              <p className="mt-3 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">{searchError}</p>
            )}

            {searchedApp && (
              <div className="mt-4 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-emerald-900">{searchedApp.trackingCode}</span>
                  <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded text-[10px] font-bold">
                    {searchedApp.status}
                  </span>
                </div>
                <p className="text-slate-700"><strong>Program:</strong> {searchedApp.serviceTitle}</p>
                <p className="text-slate-700"><strong>Verification:</strong> {searchedApp.verificationMethod}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicPage>
  );
}
