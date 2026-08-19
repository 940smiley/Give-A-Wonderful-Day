import Link from 'next/link';
import PublicPage from '../../components/PublicPage';

const experienceTiers = [
  {
    tier: 'Wonderful Birthday',
    description:
      "A meaningful birthday celebration tailored to the child's interests, shared with close family. Includes a celebration, family activities, transportation, meals, entertainment, gifts, photography, and coordination support.",
    color: 'bg-amber-50 border-amber-200',
    accent: 'text-amber-800',
  },
  {
    tier: 'Extraordinary Birthday',
    description:
      'An expanded celebration with additional elements such as travel, special activities, professional photography, and video memory preservation. Designed for families who need a broader experience to create lasting memories.',
    color: 'bg-rose-50 border-rose-200',
    accent: 'text-rose-800',
  },
  {
    tier: 'Dream Birthday',
    description:
      'A comprehensive experience designed to create lasting memories, potentially including travel, lodging, premium entertainment, and professionally produced memory preservation. The most complete expression of the Wonderful Birthday Project.',
    color: 'bg-violet-50 border-violet-200',
    accent: 'text-violet-800',
  },
];

const applicationTracks = [
  {
    track: 'Priority / Emergency',
    description:
      'For families facing urgent circumstances where time-sensitive planning is essential. Applications are reviewed on a rolling basis as funding and capacity permit. Eligibility verification is handled through appropriate documentation and privacy-protected channels.',
    badge: 'Rolling Review',
    badgeColor: 'bg-rose-100 text-rose-800',
  },
  {
    track: 'Wonderful Birthday Opportunity',
    description:
      'For eligible children during periodic selection windows when funding and capacity permit. Selection is designed to be transparent and equitable. Popularity, social media following, wealth, or ability to promote the organization do not influence eligibility.',
    badge: 'Periodic Selection',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
];

export default function WonderfulBirthdayPage() {
  return (
    <PublicPage
      title="Wonderful Birthday Project"
      intro="Every child deserves a moment of joy. The Wonderful Birthday Project provides extraordinary birthday experiences for children facing severe, life-limiting, or terminal medical circumstances — while supporting their families with meaningful memories."
    >
      <div className="space-y-12">
        {/* Mission Statement */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">Our Mission</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Give A Wonderful Day provides meaningful moments of joy to people facing extraordinary
            circumstances. The Wonderful Birthday Project is our flagship program — creating
            extraordinary birthday experiences for children and families who need them most.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            This is not a contest. It is a commitment to ensuring that every child, regardless of
            their medical circumstances, has the opportunity to experience the joy of a wonderful
            birthday celebration surrounded by the people who love them.
          </p>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-bold text-slate-950">How It Works</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '1',
                title: 'Application',
                desc: "Families or advocates submit an application describing the child's situation and preferences.",
              },
              {
                step: '2',
                title: 'Review & Eligibility',
                desc: 'Staff review applications for eligibility with appropriate documentation and privacy protections.',
              },
              {
                step: '3',
                title: 'Experience Design',
                desc: 'Selected families work with our team to design a personalized birthday experience.',
              },
              {
                step: '4',
                title: 'Celebration & Memory',
                desc: 'The experience is delivered, documented with consent, and memories are preserved for the family.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Application Tracks */}
        <section>
          <h2 className="text-2xl font-bold text-slate-950">Application Tracks</h2>
          <p className="mt-2 text-sm text-slate-600">
            Two pathways ensure that children with urgent needs receive timely attention while
            broader opportunities are made available equitably.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {applicationTracks.map((track) => (
              <div
                key={track.track}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-slate-950">{track.track}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${track.badgeColor}`}>
                    {track.badge}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{track.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Tiers */}
        <section>
          <h2 className="text-2xl font-bold text-slate-950">Experience Tiers</h2>
          <p className="mt-2 text-sm text-slate-600">
            Experiences are designed around configurable components rather than hard-coded promises.
            The tier assigned to each family reflects their specific needs and circumstances.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {experienceTiers.map((tier) => (
              <div key={tier.tier} className={`rounded-xl border p-6 ${tier.color}`}>
                <h3 className={`text-lg font-bold ${tier.accent}`}>{tier.tier}</h3>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{tier.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy & Safety */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">Privacy & Child Safety</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Children are involved, and their safety is our highest priority. We maintain strict
            separation between public impact data and private beneficiary information.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
              <h3 className="text-sm font-bold text-emerald-800">Public Impact Data</h3>
              <ul className="mt-2 space-y-1 text-xs text-emerald-700">
                <li>• Number of birthdays funded and delivered</li>
                <li>• Aggregate program statistics</li>
                <li>• Total funding raised and allocated</li>
                <li>• Community impact metrics</li>
              </ul>
            </div>
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-4">
              <h3 className="text-sm font-bold text-rose-800">Private Beneficiary Data</h3>
              <ul className="mt-2 space-y-1 text-xs text-rose-700">
                <li>• Child names, dates of birth, and addresses</li>
                <li>• Medical records or diagnosis details</li>
                <li>• Family contact information</li>
                <li>• Application documentation</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            No sensitive beneficiary information is stored on a public blockchain. Any on-chain
            representation uses only non-sensitive identifiers, hashes, or aggregate statistics.
          </p>
        </section>

        {/* Impact Model */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">Impact Model</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            The Wonderful Birthday Project integrates with G.A.W.D.&apos;s broader impact model. We
            track outcomes that matter while avoiding unnecessary collection of personal
            information.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              'Birthdays funded',
              'Birthdays delivered',
              'Children served',
              'Families supported',
              'Total program funding',
              'Average cost per experience',
              'Donor contributions',
              'Sponsor contributions',
              'Volunteer participation',
            ].map((metric) => (
              <div
                key={metric}
                className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2"
              >
                <span className="text-emerald-600 font-bold">✓</span>
                <span className="text-sm font-medium text-slate-700">{metric}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-emerald-900">Help Make a Birthday Wonderful</h2>
          <p className="mt-3 text-emerald-700 max-w-2xl mx-auto">
            Whether you represent a family in need, want to sponsor a birthday experience, or
            volunteer your time and skills — there is a place for you in this program.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/programs/wonderful-birthday/apply"
              className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
            >
              Apply for a Wonderful Birthday →
            </Link>
            <Link
              href="/donate"
              className="rounded-xl border border-emerald-300 bg-white px-6 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
            >
              Sponsor a Birthday →
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-emerald-300 bg-white px-6 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
            >
              Volunteer →
            </Link>
          </div>
        </section>

        {/* Footer Note */}
        <div className="rounded-lg bg-slate-100 p-4 text-xs text-slate-500">
          <p>
            The Wonderful Birthday Project is a program of Give A Wonderful Day. This program
            operates under the organization&apos;s privacy, safeguarding, and data-handling
            policies. Legal, fundraising, tax, and compliance requirements are confirmed through
            appropriate channels before public launch.
          </p>
        </div>
      </div>
    </PublicPage>
  );
}
