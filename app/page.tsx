const roadmap = [
  ["Now", "Demo readiness", "A local-first mobile demo that makes the product boundary clear: no wallet, payment, token, or live blockchain record."],
  ["Next", "Design-partner pilot", "A tightly scoped partner cohort to test participant value, safeguarding, and consent-led measurement."],
  ["Then", "Operational launch", "Governance, fundraising controls, privacy practices, and program operations before wider availability."],
  ["Later", "Web3 utility assessment", "A go/no-go decision based on whether decentralized provenance delivers a meaningful, safer user benefit."],
] as const;

const fundingLanes = [
  ["Foundational grants", "Pilot design, safeguards, evaluation, and community-partner learning."],
  ["Mission-aligned partnerships", "Sponsored cohorts and practical support that preserve participant dignity."],
  ["Major gifts and recurring giving", "Mission delivery and capacity after the appropriate organizational controls are in place."],
  ["In-kind technology support", "Independent security review, product research, and responsible infrastructure."],
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fff9ef] text-[#1f2a33]">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-6 sm:px-10 sm:pt-10">
        <nav className="flex items-center justify-between" aria-label="Primary navigation">
          <a href="#top" className="flex items-center gap-3 font-extrabold tracking-tight" aria-label="Give A Wonderful Day home">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f6c453] text-xl" aria-hidden="true">☀</span>
            <span>Give A Wonderful Day</span>
          </a>
          <a href="#brief" className="rounded-full border border-[#d96849] px-4 py-2 text-sm font-bold text-[#b95139] transition hover:bg-[#fde9e2]">Partner brief</a>
        </nav>

        <div id="top" className="mt-14 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#a66313]">Mobile DApp demo · Mission-first</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.05em] sm:text-6xl">Make room for a wonderful day.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f574d]">Give A Wonderful Day is a local-first mobile demo for turning a small act of encouragement into a memorable kindness moment. It is designed to test care and clarity before any Web3 feature is asked to earn its place.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://github.com/940smiley/Give-A-Wonderful-Day" className="rounded-2xl bg-[#f6c453] px-5 py-3 text-sm font-extrabold transition hover:-translate-y-0.5 hover:bg-[#efb93a]">Explore the project</a>
              <a href="#roadmap" className="rounded-2xl border border-[#ddcfb8] bg-[#fffdf8] px-5 py-3 text-sm font-extrabold text-[#40392f] transition hover:-translate-y-0.5">Read the roadmap</a>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-[#7c705e]">The demo does not process donations, hold funds, connect wallets, issue tokens, or claim tax-deductibility.</p>
          </div>

          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-[#eadcc2] bg-[#fffdf8] p-5 shadow-[0_24px_70px_rgba(76,54,20,0.12)]">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#ffe9a4]" />
            <div className="relative flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#7a6e5a]">Today</span>
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#fff0c4] text-xl">☀</span>
            </div>
            <div className="relative mt-5 rounded-3xl bg-[#f6c453] p-5">
              <p className="inline-block rounded-full bg-[#fff0c4] px-3 py-1 text-xs font-extrabold text-[#725412]">Today’s gentle prompt</p>
              <p className="mt-4 text-2xl font-black leading-8 tracking-tight">Send someone a small reason to feel seen.</p>
              <div className="mt-5 rounded-2xl bg-[#1f2a33] px-4 py-3 text-center text-sm font-extrabold text-white">Send a wonder →</div>
            </div>
            <div className="relative mt-4 rounded-2xl border border-[#eadcc2] p-4">
              <div className="flex items-center justify-between"><span className="font-bold">A neighbor</span><span className="text-xs text-[#8a7d69]">Demo record</span></div>
              <p className="mt-2 text-sm leading-5 text-[#665e52]">Thinking of you today. Your presence makes this block warmer.</p>
              <p className="mt-3 text-xs font-bold text-[#4c8fb6]">Connection</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#eadcc2] bg-[#fffdf8]">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 sm:grid-cols-3 sm:px-10">
          <div><p className="text-sm font-extrabold uppercase tracking-[0.13em] text-[#a66313]">What it is</p><p className="mt-3 text-lg font-bold leading-7">A calm, one-handed mobile experience for recording small kindness moments.</p></div>
          <div><p className="text-sm font-extrabold uppercase tracking-[0.13em] text-[#a66313]">What it is not</p><p className="mt-3 text-lg font-bold leading-7">A wallet, donation portal, token sale, NFT marketplace, or on-chain claim.</p></div>
          <div><p className="text-sm font-extrabold uppercase tracking-[0.13em] text-[#a66313]">Why now</p><p className="mt-3 text-lg font-bold leading-7">The project can learn from people and partners before committing to permanent technical or financial mechanisms.</p></div>
        </div>
      </section>

      <section id="roadmap" className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="max-w-2xl"><p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#a66313]">Measured roadmap</p><h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">Trust before scale.</h2><p className="mt-4 text-lg leading-8 text-[#5f574d]">The roadmap prioritizes clear governance, participant safety, and evidence of usefulness. Web3 is a later design question, not a premise.</p></div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {roadmap.map(([stage, title, body], index) => (
            <article key={stage} className="rounded-3xl border border-[#eadcc2] bg-[#fffdf8] p-6">
              <div className="flex items-center justify-between"><span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#d96849]">{stage}</span><span className="grid h-9 w-9 place-items-center rounded-full bg-[#f8f0e2] text-sm font-black">0{index + 1}</span></div>
              <h3 className="mt-5 text-2xl font-black tracking-tight">{title}</h3>
              <p className="mt-3 leading-7 text-[#655e53]">{body}</p>
            </article>
          ))}
        </div>
        <a href="docs/LAUNCH_PLAN.md" className="mt-8 inline-flex rounded-2xl border border-[#1f2a33] px-5 py-3 text-sm font-extrabold transition hover:bg-[#1f2a33] hover:text-white">Read the full launch plan →</a>
      </section>

      <section id="brief" className="bg-[#1f2a33] px-6 py-20 text-[#fff9ef] sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div><p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#f6c453]">For funders and partners</p><h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">Fund learning, safeguards, and mission delivery.</h2><p className="mt-5 text-lg leading-8 text-[#d9d6cd]">The early funding posture is philanthropy and partnership-led. It does not depend on speculative token economics or participant data monetization.</p><a href="docs/FUNDING_AND_PARTNERSHIP_BRIEF.md" className="mt-7 inline-flex rounded-2xl bg-[#f6c453] px-5 py-3 text-sm font-extrabold text-[#1f2a33] transition hover:bg-[#efb93a]">Read the funding brief →</a></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {fundingLanes.map(([title, body]) => <article key={title} className="rounded-3xl border border-[#4a5558] bg-[#293235] p-5"><h3 className="text-lg font-extrabold text-[#fff9ef]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#cbd0c8]">{body}</p></article>)}
            </div>
          </div>
          <div className="mt-10 rounded-3xl border border-[#4a5558] bg-[#273034] p-6"><p className="text-sm font-extrabold text-[#f6c453]">Disclosure</p><p className="mt-2 max-w-4xl text-sm leading-6 text-[#d9d6cd]">This page is a project overview, not an offer to sell securities, a solicitation of investment, or a representation that contributions are tax-deductible. The repository describes a proposed nonprofit; organization, fundraising, privacy, and Web3 decisions must be independently validated before a public operational launch.</p></div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-[#716657] sm:flex-row sm:items-center sm:justify-between sm:px-10"><p>Give A Wonderful Day · Local-first mobile demo</p><div className="flex gap-4"><a className="font-bold hover:text-[#d96849]" href="https://github.com/940smiley/Give-A-Wonderful-Day">GitHub</a><a className="font-bold hover:text-[#d96849]" href="docs/entity_card.md">Project status</a></div></footer>
    </main>
  );
}
