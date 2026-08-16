import PublicPage from '../components/PublicPage';

export default function PrivacyPage() {
  return (
    <PublicPage
      title="Privacy"
      intro="Recipient privacy, consent, and data minimization are mandatory operating requirements."
    >
      <div className="prose prose-slate max-w-none">
        <p>
          This placeholder privacy notice must be reviewed by counsel before production use. The
          application marks nominee, recipient, donor, and staff contact fields as PII in the Prisma
          schema.
        </p>
      </div>
    </PublicPage>
  );
}
