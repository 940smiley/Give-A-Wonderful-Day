import PublicPage from '../components/PublicPage';

export default function TermsPage() {
  return (
    <PublicPage
      title="Terms"
      intro="Terms of use are not finalized and must be reviewed before public production launch."
    >
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-slate-700">
        Legal terms placeholder. Do not launch publicly until reviewed and approved.
      </div>
    </PublicPage>
  );
}
