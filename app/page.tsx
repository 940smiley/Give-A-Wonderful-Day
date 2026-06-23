import Link from 'next/link';
import Image from 'next/image';
import PublicNav from './components/PublicNav';

const steps = [
  'A community member submits a private nomination.',
  'Authorized staff review eligibility, urgency, consent, and privacy needs.',
  'Approved recipients receive a carefully planned day funded by verified donations.',
  'Public transparency shows process and stewardship without exposing private stories.',
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <PublicNav />
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl">
              Give-A-Wonderful-Day
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              A nonprofit software foundation for delivering one carefully planned day of joy and
              respite to people facing significant life challenges.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/nominate"
                className="rounded-md bg-emerald-700 px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Nominate someone
              </Link>
              <Link
                href="/donate"
                className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-800"
              >
                Donate
              </Link>
            </div>
          </div>
          <Image
            className="aspect-[4/3] w-full rounded-lg object-cover shadow-sm"
            src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=80"
            alt="Community members gathered together at a table"
            width={1200}
            height={900}
            priority
          />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step} className="border-l-2 border-emerald-700 pl-4">
              <p className="font-mono text-sm text-emerald-800">0{index + 1}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold">Recipient privacy</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Stories, images, and outcomes require explicit consent before any public use.
              Placeholder stories are not published as real impact.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Transparent giving</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Web3 donations remain available for public transaction verification while traditional
              donations are prepared through a provider abstraction.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Human approval</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              AI tools can draft grant, email, and impact-report content, but staff must review and
              approve every external action.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
