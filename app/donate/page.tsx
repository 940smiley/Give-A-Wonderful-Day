import PublicPage from '../components/PublicPage';
import InvestorDonationDemo from '../components/donations/InvestorDonationDemo';

export default function DonatePage() {
  return (
    <PublicPage
      title="Invest & Donate"
      intro="A comprehensive funding and strategic giving platform for philanthropic funders, impact investors, and individual donors. Calculate community impact, execute card/ACH or Web3 crypto contributions, and track transparent capital allocation."
    >
      <InvestorDonationDemo />
    </PublicPage>
  );
}
