import PublicPage from '../components/PublicPage';
import DonationWidget from '../components/donations/DonationWidget';

export default function DonatePage() {
  return (
    <PublicPage
      title="Donate"
      intro="Crypto donations are supported through the existing Web3 path. A traditional donation provider abstraction is scaffolded for future one-time and recurring giving."
    >
      <DonationWidget />
    </PublicPage>
  );
}
