import { useState } from "react";
import { autoFillGrantApplication, sendPersonalizedDonorEmail, generateImpactReport } from "../automation";

export default function AutomationTestUI() {
  // Grant Application
  const [grantUrl, setGrantUrl] = useState("");
  const [orgProfile, setOrgProfile] = useState("{\"name\":\"Wonderful Org\"}");
  const [grantResult, setGrantResult] = useState("");
  const [grantLoading, setGrantLoading] = useState(false);

  // Donor Engagement
  const [donor, setDonor] = useState("{\"name\":\"Alice\",\"email\":\"alice@example.com\"}");
  const [donationInfo, setDonationInfo] = useState("{\"amount\":\"1.0\"}");
  const [donorStatus, setDonorStatus] = useState("");
  const [donorLoading, setDonorLoading] = useState(false);

  // Impact Reporting
  const [onChainData, setOnChainData] = useState("{\"donations\":100}");
  const [offChainData, setOffChainData] = useState("{\"events\":5}");
  const [impactResult, setImpactResult] = useState("");
  const [impactLoading, setImpactLoading] = useState(false);

  // Grant Application Handler
  const handleGrant = async (e) => {
    e.preventDefault();
    setGrantLoading(true);
    setGrantResult("");
    try {
      const result = await autoFillGrantApplication(grantUrl, JSON.parse(orgProfile));
      setGrantResult(JSON.stringify(result, null, 2));
    } catch (err) {
      setGrantResult("Error: " + err.message);
    }
    setGrantLoading(false);
  };

  // Donor Engagement Handler
  const handleDonor = async (e) => {
    e.preventDefault();
    setDonorLoading(true);
    setDonorStatus("");
    try {
      await sendPersonalizedDonorEmail(JSON.parse(donor), JSON.parse(donationInfo));
      setDonorStatus("Email sent successfully.");
    } catch (err) {
      setDonorStatus("Error: " + err.message);
    }
    setDonorLoading(false);
  };

  // Impact Reporting Handler
  const handleImpact = async (e) => {
    e.preventDefault();
    setImpactLoading(true);
    setImpactResult("");
    try {
      const result = await generateImpactReport(JSON.parse(onChainData), JSON.parse(offChainData));
      setImpactResult(JSON.stringify(result, null, 2));
    } catch (err) {
      setImpactResult("Error: " + err.message);
    }
    setImpactLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Automation Scripts Test UI</h2>
      {/* Grant Application Automation */}
      <form onSubmit={handleGrant} className="mb-6">
        <h3 className="font-semibold mb-2">Grant Application Automation</h3>
        <input
          className="border px-2 py-1 rounded w-full mb-2"
          placeholder="Grant URL"
          value={grantUrl}
          onChange={e => setGrantUrl(e.target.value)}
        />
        <textarea
          className="border px-2 py-1 rounded w-full mb-2"
          placeholder='Org Profile (JSON)'
          value={orgProfile}
          onChange={e => setOrgProfile(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={grantLoading}>
          {grantLoading ? "Processing..." : "Run Grant Automation"}
        </button>
        {grantResult && <pre className="bg-gray-100 p-2 mt-2 text-xs overflow-x-auto">{grantResult}</pre>}
      </form>
      {/* Donor Engagement Automation */}
      <form onSubmit={handleDonor} className="mb-6">
        <h3 className="font-semibold mb-2">Donor Engagement Automation</h3>
        <textarea
          className="border px-2 py-1 rounded w-full mb-2"
          placeholder='Donor (JSON)'
          value={donor}
          onChange={e => setDonor(e.target.value)}
        />
        <textarea
          className="border px-2 py-1 rounded w-full mb-2"
          placeholder='Donation Info (JSON)'
          value={donationInfo}
          onChange={e => setDonationInfo(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={donorLoading}>
          {donorLoading ? "Processing..." : "Send Donor Email"}
        </button>
        {donorStatus && <div className="mt-2 text-sm">{donorStatus}</div>}
      </form>
      {/* Impact Reporting Automation */}
      <form onSubmit={handleImpact}>
        <h3 className="font-semibold mb-2">Impact Reporting Automation</h3>
        <textarea
          className="border px-2 py-1 rounded w-full mb-2"
          placeholder='On-Chain Data (JSON)'
          value={onChainData}
          onChange={e => setOnChainData(e.target.value)}
        />
        <textarea
          className="border px-2 py-1 rounded w-full mb-2"
          placeholder='Off-Chain Data (JSON)'
          value={offChainData}
          onChange={e => setOffChainData(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={impactLoading}>
          {impactLoading ? "Processing..." : "Generate Impact Report"}
        </button>
        {impactResult && <pre className="bg-gray-100 p-2 mt-2 text-xs overflow-x-auto">{impactResult}</pre>}
      </form>
    </div>
  );
}
