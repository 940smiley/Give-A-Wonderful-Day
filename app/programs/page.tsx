import Link from 'next/link';
import PublicPage from '../components/PublicPage';

const programs = [
  {
    name: 'Wonderful Birthday Project',
    description:
      'Our flagship program providing extraordinary birthday experiences for children facing severe, life-limiting, or terminal medical circumstances. Includes family support, memory preservation, and configurable experience tiers.',
    status: 'Active',
    statusColor: 'bg-emerald-100 text-emerald-800',
    href: '/programs/wonderful-birthday',
    featured: true,
  },
  {
    name: 'Wonderful Day',
    description:
      'General wonderful day experiences for individuals facing extraordinary circumstances beyond birthday celebrations. Nomination review, consent management, event planning, and impact reporting workflows.',
    status: 'Scaffolded',
    statusColor: 'bg-slate-100 text-slate-800',
    href: '/programs',
    featured: false,
  },
  {
    name: 'Transparency & Impact Reporting',
    description:
      'Public transparency dashboard and internal impact reporting. Tracks donation allocation, program outcomes, and community impact metrics.',
    status: 'Scaffolded',
    statusColor: 'bg-slate-100 text-slate-800',
    href: '/transparency',
    featured: false,
  },
];

export default function ProgramsPage() {
  return (
    <PublicPage
      title="Programs"
      intro="Give A Wonderful Day operates programs designed to provide meaningful moments of joy to people facing extraordinary circumstances. Each program follows a structured workflow from application through impact reporting."
    >
      <div className="space-y-8">
        {/* Featured Program */}
        {programs
          .filter((p) => p.featured)
          .map((program) => (
            <section
              key={program.name}
              className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-8 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎂</span>
                    <h2 className="text-2xl font-bold text-emerald-900">{program.name}</h2>
                  </div>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${program.statusColor}`}
                  >
                    {program.status}
                  </span>
                </div>
                <Link
                  href={program.href}
                  className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  Learn More →
                </Link>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-emerald-800 max-w-3xl">
                {program.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/programs/wonderful-birthday/apply"
                  className="rounded-lg border border-emerald-300 bg-white px-4 py-2 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100"
                >
                  Apply Now →
                </Link>
                <Link
                  href="/donate"
                  className="rounded-lg border border-emerald-300 bg-white px-4 py-2 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100"
                >
                  Sponsor a Birthday →
                </Link>
              </div>
            </section>
          ))}

        {/* Other Programs */}
        <div>
          <h3 className="text-lg font-bold text-slate-950">Additional Programs</h3>
          <p className="mt-1 text-sm text-slate-600">
            These programs share the same underlying infrastructure and workflow patterns.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {programs
            .filter((p) => !p.featured)
            .map((program) => (
              <section
                key={program.name}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-950">{program.name}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${program.statusColor}`}
                  >
                    {program.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{program.description}</p>
              </section>
            ))}
        </div>
      </div>
    </PublicPage>
  );
}
