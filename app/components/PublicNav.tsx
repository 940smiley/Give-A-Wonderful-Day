import Link from 'next/link';

const links = [
  ['Birthday Project', '/programs/wonderful-birthday'],
  ['Apply for Assistance', '/assistance'],
  ['Invest & Donate', '/donate'],
  ['Nonprofit Partners', '/partners'],
  ['Programs', '/programs'],
  ['Mission', '/mission'],
  ['Transparency', '/transparency'],
] as const;

export default function PublicNav() {
  return (
    <header className="border-b border-slate-200 bg-white/95 sticky top-0 z-50 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-950"
        >
          <span
            className="grid h-8 w-8 place-items-center rounded-xl bg-amber-400 text-lg"
            aria-hidden="true"
          >
            ☀
          </span>
          <span>Give-A-Wonderful-Day</span>
        </Link>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-700">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-emerald-800 transition">
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
