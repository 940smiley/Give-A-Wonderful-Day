export default function UnauthorizedPage() {
  return (
    <section className="rounded-lg border border-red-900 bg-red-950/40 p-6">
      <h1 className="text-2xl font-semibold">Unauthorized</h1>
      <p className="mt-2 text-sm text-red-100">Your staff role does not allow this action.</p>
    </section>
  );
}
