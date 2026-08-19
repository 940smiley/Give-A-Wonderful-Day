import PublicPage from '../components/PublicPage';

export default function TransparencyPage() {
  return (
    <PublicPage
      title="Transparency"
      intro="Transparency must balance donor stewardship with recipient privacy and verified financial reporting."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Donation records</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Blockchain transactions can be verified publicly. Traditional donations require provider
            reconciliation before publication.
          </p>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Impact reporting</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Impact reports must be reviewed for consent, accuracy, and legal compliance before
            publication.
          </p>
        </section>
      </div>
    </PublicPage>
  );
}
