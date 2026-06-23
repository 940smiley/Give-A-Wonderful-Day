import PublicNav from './PublicNav';

type PublicPageProps = {
  title: string;
  intro: string;
  children: React.ReactNode;
};

export default function PublicPage({ title, intro, children }: PublicPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <PublicNav />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{intro}</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </main>
  );
}
