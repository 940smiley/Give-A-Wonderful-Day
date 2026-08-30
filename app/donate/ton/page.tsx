import PublicPage from '../../components/PublicPage';
import TonProvider from '../../components/ton/TonProvider';
import TonDonationWidget from '../../components/ton/TonDonationWidget';

export default function TonDonatePage() {
  return (
    <PublicPage
      title="Donate with TON"
      intro="Support Give-A-Wonderful-Day instantly using The Open Network (TON). Fast, low fees, and deeply integrated with Telegram."
    >
      <div className="mb-6 border-b border-slate-200">
        <nav className="-mb-px flex space-x-8" aria-label="Donation Networks">
          <a
            href="/donate"
            className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
          >
            Ethereum
          </a>
          <a
            href="/donate/ton"
            className="border-[#0088CC] text-[#0088CC] whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
            aria-current="page"
          >
            TON Network
          </a>
        </nav>
      </div>

      <TonProvider>
        <TonDonationWidget />
      </TonProvider>
    </PublicPage>
  );
}
