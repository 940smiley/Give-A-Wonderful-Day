export const dynamic = 'force-dynamic';

const sections = [
  'Nominations awaiting review',
  'Recipient consent and planning',
  'Donation reconciliation',
  'Impact reports requiring approval',
  'Audit history',
];

export default function AdminPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold">Operations overview</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <div key={section} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <h2 className="font-semibold">{section}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Connect PostgreSQL and seed staff roles to populate this operational panel.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
