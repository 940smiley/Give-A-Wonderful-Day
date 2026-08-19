import Link from 'next/link';
import { getPrisma } from '../../../lib/db';
import { requirePagePermission } from '../../../lib/auth/session';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  SUBMITTED: { label: 'Submitted', color: 'bg-slate-100 text-slate-800' },
  UNDER_REVIEW: { label: 'Under Review', color: 'bg-blue-100 text-blue-800' },
  ELIGIBILITY_VERIFIED: { label: 'Eligibility Verified', color: 'bg-emerald-100 text-emerald-800' },
  SELECTED: { label: 'Selected', color: 'bg-amber-100 text-amber-800' },
  EXPERIENCE_PLANNING: { label: 'Experience Planning', color: 'bg-violet-100 text-violet-800' },
  FUNDING: { label: 'Funding', color: 'bg-orange-100 text-orange-800' },
  SCHEDULED: { label: 'Scheduled', color: 'bg-cyan-100 text-cyan-800' },
  DELIVERED: { label: 'Delivered', color: 'bg-emerald-100 text-emerald-800' },
  COMPLETED: { label: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
  DECLINED: { label: 'Declined', color: 'bg-rose-100 text-rose-800' },
  WITHDRAWN: { label: 'Withdrawn', color: 'bg-slate-100 text-slate-800' },
};

const TIER_LABELS: Record<string, string> = {
  PRIORITY_EMERGENCY: 'Priority / Emergency',
  STANDARD_OPPORTUNITY: 'Standard Opportunity',
};

export default async function BirthdayApplicationsPage() {
  await requirePagePermission('nomination:review');

  const prisma = getPrisma();
  if (!prisma) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-950">Birthday Applications</h1>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            Database not configured. Set DATABASE_URL to view birthday applications.
          </p>
        </div>
      </div>
    );
  }

  const applications = await prisma.birthdayApplication.findMany({
    orderBy: { createdAt: 'desc' },
    include: { program: true },
  });

  const stats = {
    total: applications.length,
    submitted: applications.filter((a) => a.status === 'SUBMITTED').length,
    underReview: applications.filter((a) => a.status === 'UNDER_REVIEW').length,
    selected: applications.filter((a) => a.status === 'SELECTED').length,
    completed: applications.filter((a) => a.status === 'COMPLETED').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Birthday Applications</h1>
          <p className="mt-1 text-sm text-slate-600">
            Wonderful Birthday Project — application review and management.
          </p>
        </div>
        <Link
          href="/programs/wonderful-birthday"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          View Public Page →
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {[
          { label: 'Total', value: stats.total, color: 'text-slate-950' },
          { label: 'Submitted', value: stats.submitted, color: 'text-slate-700' },
          { label: 'Under Review', value: stats.underReview, color: 'text-blue-700' },
          { label: 'Selected', value: stats.selected, color: 'text-amber-700' },
          { label: 'Completed', value: stats.completed, color: 'text-emerald-700' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {stat.label}
            </p>
            <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Applications Table */}
      {applications.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm text-slate-600">
            No birthday applications have been submitted yet.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Child</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Location</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Track</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const status = STATUS_LABELS[app.status] ?? {
                  label: app.status,
                  color: 'bg-slate-100 text-slate-800',
                };
                return (
                  <tr key={app.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <span className="font-medium text-slate-950">{app.childName}</span>
                      <span className="ml-2 text-xs text-slate-500">({app.ageRange})</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {app.city}, {app.state}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {TIER_LABELS[app.tier] ?? app.tier}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {app.createdAt.toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Privacy Reminder */}
      <div className="rounded-lg bg-slate-100 p-4 text-xs text-slate-500">
        <strong>Privacy reminder:</strong> This page contains PII and is restricted to authorized
        staff with the nomination:review permission. Do not share, export, or screenshot this data
        outside of authorized systems.
      </div>
    </div>
  );
}
