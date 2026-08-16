<<<<<<< HEAD
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
=======
'use client';

import { type FormEvent, useState } from 'react';
import {
  autoFillGrantApplication,
  generateImpactReport,
  sendPersonalizedDonorEmail,
} from '../automation';
import { getErrorMessage } from '../../lib/errors';

function parseJsonObject(value: string): Record<string, unknown> {
  const parsed = JSON.parse(value) as unknown;
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('JSON value must be an object.');
  }

  return parsed as Record<string, unknown>;
}

export default function AutomationTestUI() {
  const [grantUrl, setGrantUrl] = useState('');
  const [orgProfile, setOrgProfile] = useState('{"name":"Wonderful Org"}');
  const [grantResult, setGrantResult] = useState('');
  const [grantLoading, setGrantLoading] = useState(false);

  const [donor, setDonor] = useState('{"name":"Alice","email":"alice@example.com"}');
  const [donationInfo, setDonationInfo] = useState('{"amount":"1.0"}');
  const [donorStatus, setDonorStatus] = useState('');
  const [donorLoading, setDonorLoading] = useState(false);

  const [onChainData, setOnChainData] = useState('{"donations":100}');
  const [offChainData, setOffChainData] = useState('{"events":5}');
  const [impactResult, setImpactResult] = useState('');
  const [impactLoading, setImpactLoading] = useState(false);

  async function handleGrant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGrantLoading(true);
    setGrantResult('');

    try {
      const result = await autoFillGrantApplication(grantUrl, parseJsonObject(orgProfile));
      setGrantResult(JSON.stringify(result, null, 2));
    } catch (error) {
      setGrantResult(`Error: ${getErrorMessage(error)}`);
    } finally {
      setGrantLoading(false);
    }
  }

  async function handleDonor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDonorLoading(true);
    setDonorStatus('');

    try {
      const parsedDonor = parseJsonObject(donor);
      await sendPersonalizedDonorEmail(
        {
          name: typeof parsedDonor.name === 'string' ? parsedDonor.name : undefined,
          email: typeof parsedDonor.email === 'string' ? parsedDonor.email : undefined,
        },
        parseJsonObject(donationInfo),
      );
      setDonorStatus('Draft generated in preview mode. Staff approval is required before send.');
    } catch (error) {
      setDonorStatus(`Error: ${getErrorMessage(error)}`);
    } finally {
      setDonorLoading(false);
    }
  }

  async function handleImpact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setImpactLoading(true);
    setImpactResult('');

    try {
      const result = await generateImpactReport(
        parseJsonObject(onChainData),
        parseJsonObject(offChainData),
      );
      setImpactResult(JSON.stringify(result, null, 2));
    } catch (error) {
      setImpactResult(`Error: ${getErrorMessage(error)}`);
    } finally {
      setImpactLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-950">Automation Review Console</h1>
      <p className="mt-2 text-sm text-slate-600">
        Automation creates drafts and previews only. Staff approval is required before sending or
        publishing.
      </p>

      <form onSubmit={handleGrant} className="mt-6 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Grant Draft</h2>
        <label className="block text-sm font-medium text-slate-700" htmlFor="grant-url">
          Grant URL
        </label>
        <input
          id="grant-url"
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          placeholder="https://example.org/grants/program"
          value={grantUrl}
          onChange={(event) => setGrantUrl(event.target.value)}
          required
        />
        <label className="block text-sm font-medium text-slate-700" htmlFor="org-profile">
          Organization profile JSON
        </label>
        <textarea
          id="org-profile"
          className="min-h-28 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm"
          value={orgProfile}
          onChange={(event) => setOrgProfile(event.target.value)}
        />
        <button
          type="submit"
          className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={grantLoading}
        >
          {grantLoading ? 'Processing...' : 'Generate Grant Draft'}
        </button>
        {grantResult && (
          <pre className="overflow-x-auto rounded-md bg-slate-100 p-3 text-xs text-slate-800">
            {grantResult}
          </pre>
        )}
      </form>

      <form onSubmit={handleDonor} className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Donor Thank-You Draft</h2>
        <label className="block text-sm font-medium text-slate-700" htmlFor="donor-json">
          Donor JSON
        </label>
        <textarea
          id="donor-json"
          className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm"
          value={donor}
          onChange={(event) => setDonor(event.target.value)}
        />
        <label className="block text-sm font-medium text-slate-700" htmlFor="donation-json">
          Donation JSON
        </label>
        <textarea
          id="donation-json"
          className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm"
          value={donationInfo}
          onChange={(event) => setDonationInfo(event.target.value)}
        />
        <button
          type="submit"
          className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={donorLoading}
        >
          {donorLoading ? 'Processing...' : 'Generate Email Preview'}
        </button>
        {donorStatus && <p className="text-sm text-slate-700">{donorStatus}</p>}
      </form>

      <form onSubmit={handleImpact} className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Impact Report Draft</h2>
        <label className="block text-sm font-medium text-slate-700" htmlFor="on-chain-json">
          On-chain JSON
        </label>
        <textarea
          id="on-chain-json"
          className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm"
          value={onChainData}
          onChange={(event) => setOnChainData(event.target.value)}
        />
        <label className="block text-sm font-medium text-slate-700" htmlFor="off-chain-json">
          Off-chain JSON
        </label>
        <textarea
          id="off-chain-json"
          className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 font-mono text-sm"
          value={offChainData}
          onChange={(event) => setOffChainData(event.target.value)}
        />
        <button
          type="submit"
          className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={impactLoading}
        >
          {impactLoading ? 'Processing...' : 'Generate Impact Draft'}
        </button>
        {impactResult && (
          <pre className="overflow-x-auto rounded-md bg-slate-100 p-3 text-xs text-slate-800">
            {impactResult}
          </pre>
        )}
>>>>>>> origin/codex/production-readiness-upgrade
      </form>
    </div>
  );
}
