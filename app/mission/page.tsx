import PublicPage from '../components/PublicPage';

export default function MissionPage() {
  return (
    <PublicPage
      title="Mission"
      intro="The mission is to create one carefully planned day of joy, dignity, and respite for recipients facing significant life challenges."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {['Dignity', 'Consent', 'Stewardship'].map((item) => (
          <section key={item} className="border-l-2 border-emerald-700 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold">{item}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Program details must be verified, documented, and approved by authorized staff before
              public claims are made.
            </p>
          </section>
        ))}
      </div>
    </PublicPage>
  );
}
