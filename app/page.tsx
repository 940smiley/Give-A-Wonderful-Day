import Link from 'next/link';
import PublicNav from './components/PublicNav';
import SocialTelegramHub from './components/SocialTelegramHub';

const demoPathways = [
  {
    title: '1. Individuals & Families Seeking Assistance',
    role: 'Service Applicants',
    href: '/assistance',
    badge: 'Confidential Aid Portal',
    icon: '🤝',
    description: 'Browse available micro-grants, emergency housing aid, and care packages. Case-by-case priority flags for assault survivors, terminally ill patients, and suicide attempt survivors with 24/7 crisis hotlines.',
    actionText: 'Launch Assistance Demo →',
    highlights: ['Priority Flags (Assault, Palliative, Mental Health)', 'Anti-Scam Background & Proof Checks', '24/7 Crisis Hotline Directory'],
  },
  {
    title: '2. Philanthropic Funders & Donors',
    role: 'Impact Investors & Donors',
    href: '/donate',
    badge: 'Fund Direct Community Impact',
    icon: '📈',
    description: 'Interactive impact calculator showing direct community outcomes. Supports dual Card/ACH simulated checkout with tax receipt generation and Web3 crypto testnet smart contracts.',
    actionText: 'Launch Investor & Donor Demo →',
    highlights: ['Interactive Impact Multiplier', 'Dual Card/ACH & Crypto Payments', 'Transparent Capital Allocation (85% Direct)'],
  },
  {
    title: '3. Nonprofit Organizations & Caseworkers',
    role: 'Nonprofit Partner Network',
    href: '/partners',
    badge: 'Co-Granting & Referrals',
    icon: '🏛',
    description: 'Cross-agency collaboration hub for registered 501(c)(3) organizations. Submit consent-verified client referrals, generate AI joint grant proposals, and access shared impact metrics.',
    actionText: 'Launch Nonprofit Partner Demo →',
    highlights: ['Cross-Agency Client Referrals', 'AI-Assisted Co-Funding Proposal Drafts', 'Partner Onboarding & SLA'],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <PublicNav />

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold text-emerald-900 mb-6">
            <span className="grid h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Give A Wonderful Day · Multi-Stakeholder Functional Demos</span>
          </div>

          <h1 className="max-w-4xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl text-slate-950">
            Dignified Care, Transparent Impact, and Collaborative Non-Profit Aid.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            Give A Wonderful Day connects people facing challenges with direct support, empowers donors with transparent giving, and collaborates with local non-profit partners to amplify community care.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center sm:justify-start">
            <Link
              href="/assistance"
              className="rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-emerald-800 shadow-sm"
            >
              Apply for Assistance →
            </Link>
            <Link
              href="/donate"
              className="rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-slate-800 shadow-sm"
            >
              Invest / Donate →
            </Link>
            <Link
              href="/partners"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-extrabold text-slate-800 transition hover:bg-slate-50"
            >
              Nonprofit Partners →
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Pathways Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 space-y-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-950">Interactive End-User Demos</h2>
          <p className="mt-2 text-slate-600 max-w-2xl text-sm">
            Select a stakeholder portal below to experience a tailored, functional workflow.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {demoPathways.map((demo) => (
            <article
              key={demo.href}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-600 transition"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl">{demo.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {demo.role}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-950">{demo.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">{demo.description}</p>

                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                  {demo.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={demo.href}
                className="mt-6 block text-center rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition hover:bg-emerald-800"
              >
                {demo.actionText}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Trust & Safeguards */}
      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-6 grid gap-8 md:grid-cols-3 text-sm">
          <div>
            <h3 className="text-base font-bold text-slate-950">Strict Recipient Privacy</h3>
            <p className="mt-2 text-slate-600 leading-relaxed text-xs">
              Every applicant detail is treated with confidential dignity. No recipient stories or identities are published without verified 100% written consent.
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-950">Transparent Stewardship</h3>
            <p className="mt-2 text-slate-600 leading-relaxed text-xs">
              85% of every contributed dollar directly funds community micro-grants and care packages, backed by public audit logs and on-chain verification option.
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-950">Collaborative Ecosystem</h3>
            <p className="mt-2 text-slate-600 leading-relaxed text-xs">
              Partnering with local food banks, shelters, and care clinics to eliminate benefit duplication and speed up emergency turnaround times.
            </p>
          </div>
        </div>
      </section>

      {/* Automated Telegram Bots & Social Channels */}
      <SocialTelegramHub />

      <footer className="border-t border-slate-200 bg-slate-50 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-6 flex justify-between items-center flex-wrap gap-4">
          <p>© Give-A-Wonderful-Day · Nonprofit Software Foundation</p>
          <div className="flex gap-4 font-semibold text-slate-600">
            <Link href="/assistance">Assistance Portal</Link>
            <Link href="/donate">Donations &amp; Investors</Link>
            <Link href="/partners">Partner Network</Link>
            <Link href="/transparency">Transparency Log</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
