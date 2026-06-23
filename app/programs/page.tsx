import PublicPage from '../components/PublicPage';

export default function ProgramsPage() {
  return (
    <PublicPage
      title="Programs"
      intro="Program workflows are prepared for nominations, consent, planning, expenses, donations, and impact reporting."
    >
      <div className="space-y-6">
        {['Nomination review', 'Wonderful Day planning', 'Transparency reporting'].map(
          (program) => (
            <section
              key={program}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{program}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                This workflow is scaffolded for staff review and auditability. Final operating
                policy, eligibility rules, and compliance review remain required before launch.
              </p>
            </section>
          ),
        )}
      </div>
    </PublicPage>
  );
}
