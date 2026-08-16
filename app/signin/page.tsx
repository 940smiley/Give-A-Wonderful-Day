import PublicPage from '../components/PublicPage';

export default function SignInPage() {
  return (
    <PublicPage
      title="Staff sign in"
      intro="Authentication is required for administrative workflows. Configure provider credentials and seed staff users before production use."
    >
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm leading-6 text-slate-700">
          Development credentials use the Auth.js credentials provider with Prisma-backed users.
          Configure `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_DEV_EMAIL`, and `ADMIN_DEV_PASSWORD`, then
          run `npm run db:seed`.
        </p>
      </div>
    </PublicPage>
  );
}
