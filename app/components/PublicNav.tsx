import Link from 'next/link';

const links = [
  ['Mission', '/mission'],
  ['Programs', '/programs'],
  ['Nominate', '/nominate'],
  ['Donate', '/donate'],
  ['Transparency', '/transparency'],
  ['Contact', '/contact'],
] as const;

export default function PublicNav() {
  return (
    <header className="border-b border-slate-200 bg-white/95">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-lg font-semibold tracking-normal text-slate-950">
          Give-A-Wonderful-Day
        </Link>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-700">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-emerald-800">
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
