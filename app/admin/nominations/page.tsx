import { getPrisma } from '../../../lib/db';
import { updateNominationStatus } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AdminNominationsPage() {
  const nominations = process.env.DATABASE_URL
    ? await getPrisma().nomination.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 50,
      })
    : [];

  return (
    <section>
      <h1 className="text-3xl font-semibold">Nominations</h1>
      {nominations.length === 0 ? (
        <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900 p-6 text-slate-300">
          No nominations are available. Configure `DATABASE_URL` and submit a nomination to review
          the workflow.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-900 text-slate-300">
              <tr>
                <th className="px-4 py-3">Nominee</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {nominations.map((nomination) => (
                <tr key={nomination.id} className="border-t border-slate-800 bg-slate-950">
                  <td className="px-4 py-3">{nomination.nomineeName}</td>
                  <td className="px-4 py-3">
                    {nomination.city}, {nomination.state}
                  </td>
                  <td className="px-4 py-3">{nomination.status}</td>
                  <td className="px-4 py-3">{nomination.createdAt.toISOString().slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    <form action={updateNominationStatus} className="flex gap-2">
                      <input type="hidden" name="id" value={nomination.id} />
                      <select
                        name="status"
                        defaultValue={nomination.status}
                        className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1"
                      >
                        <option value="UNDER_REVIEW">Under review</option>
                        <option value="APPROVED">Approve</option>
                        <option value="REJECTED">Reject</option>
                        <option value="RECIPIENT_CREATED">Recipient created</option>
                      </select>
                      <button
                        className="rounded-md bg-emerald-700 px-3 py-1 font-medium"
                        type="submit"
                      >
                        Save
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
