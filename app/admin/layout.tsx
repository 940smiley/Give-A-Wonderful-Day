import Link from 'next/link';
import type { ReactNode } from 'react';
import { requirePagePermission } from '../../lib/auth/session';

const adminLinks = [
  ['Overview', '/admin'],
  ['Birthday Apps', '/admin/birthday-applications'],
  ['Nominations', '/admin/nominations'],
  ['Recipients', '/admin/recipients'],
  ['Donations', '/admin/donations'],
  ['Events', '/admin/events'],
  ['Automation', '/admin/automation'],
  ['Reports', '/admin/reports'],
  ['Users', '/admin/users'],
  ['Audit Log', '/admin/audit-log'],
] as const;

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await requirePagePermission('admin:view');

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link href="/admin" className="text-lg font-semibold">
                Give-A-Wonderful-Day Admin
              </Link>
              <p className="text-sm text-slate-400">
                Signed in as {user.email ?? user.id} with role {user.role}
              </p>
            </div>
            <nav className="flex flex-wrap gap-3 text-sm text-slate-300">
              {adminLinks.map(([label, href]) => (
                <Link key={href} href={href} className="hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
    </main>
  );
}
