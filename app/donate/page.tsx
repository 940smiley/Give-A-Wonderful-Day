import PublicPage from '../components/PublicPage';
import InvestorDonationDemo from '../components/donations/InvestorDonationDemo';

export default function DonatePage() {
  return (
    <PublicPage
      title="Invest & Donate"
      intro="A comprehensive funding and strategic giving platform for philanthropic funders, impact investors, and individual donors. Calculate community impact, execute card/ACH or Web3 crypto contributions, and track transparent capital allocation."
    >
      <div className="mb-6 border-b border-slate-200">
        <nav className="-mb-px flex space-x-8" aria-label="Donation Networks">
          <a
            href="/donate"
            className="border-emerald-600 text-emerald-600 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
            aria-current="page"
          >
            Ethereum
          </a>
          <a
            href="/donate/ton"
            className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
          >
            TON Network
          </a>
        </nav>
      </div>

      <InvestorDonationDemo />
    </PublicPage>
  );
}
