import PublicPage from '../components/PublicPage';
import NominationForm from '../components/forms/NominationForm';

export default function NominatePage() {
  return (
    <PublicPage
      title="Nominate"
      intro="Submit a private nomination for staff review. A nomination is not approval, and staff must handle every submission with consent and privacy controls."
    >
      <NominationForm />
    </PublicPage>
  );
}
