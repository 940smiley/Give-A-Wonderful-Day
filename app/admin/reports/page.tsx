export const dynamic = 'force-dynamic';

export default function AdminReportsPage() {
  return (
    <AdminScaffold
      title="Reports"
      items={['Impact report drafts', 'Review and approval', 'Publication readiness']}
    />
  );
}

function AdminScaffold({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h1 className="text-3xl font-semibold">{title}</h1>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-slate-800 bg-slate-900 p-5 text-sm text-slate-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
