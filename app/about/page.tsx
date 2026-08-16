import PublicPage from '../components/PublicPage';

export default function AboutPage() {
  return (
    <PublicPage
      title="About"
      intro="Give-A-Wonderful-Day is being prepared as a software and operations platform for a proposed nonprofit program."
    >
      <div className="prose prose-slate max-w-none">
        <p>
          This project does not assert verified tax-exempt status, board membership, fundraising
          authorization, or recipient outcomes. Those details must be confirmed outside the software
          before public launch.
        </p>
      </div>
    </PublicPage>
  );
}
