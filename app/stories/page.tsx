import PublicPage from '../components/PublicPage';

export default function StoriesPage() {
  return (
    <PublicPage
      title="Stories"
      intro="Recipient stories are intentionally empty until verified consent, privacy review, and publication approval are complete."
    >
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-slate-700">
        No recipient stories are published yet. This is a privacy-preserving placeholder.
      </div>
    </PublicPage>
  );
}
