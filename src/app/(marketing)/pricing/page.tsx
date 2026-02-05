const plans = [
  { name: 'Starter', price: '$0', detail: 'Track up to 10 gift ideas.' },
  { name: 'Pro', price: '$12', detail: 'Unlimited trackers and reminders.' }
];

export default function PricingPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Pricing</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {plans.map((plan) => (
          <article className="rounded-lg border bg-white p-6 shadow-sm" key={plan.name}>
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mt-1 text-2xl">{plan.price}/mo</p>
            <p className="mt-2 text-slate-600">{plan.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
