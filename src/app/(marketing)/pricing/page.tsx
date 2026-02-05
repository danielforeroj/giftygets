import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';

const plans = [
  { name: 'Starter', price: '$0', points: ['3 trackers', 'Daily checks', 'Community support'] },
  { name: 'Plus', price: '$3', points: ['15 trackers', 'Hourly checks', 'Email alerts'] },
  { name: 'Pro', price: '$5', points: ['Unlimited trackers', 'Priority checks', 'Admin insights'] }
];

export default function PricingPage() {
  return (
    <div className="space-y-10">
      <SectionHeader title="Simple pricing" description="Start free, then scale your gifting game." />
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="space-y-4">
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="text-3xl font-black">{plan.price}/mo</p>
            <ul className="space-y-2 text-sm text-ink/85">
              {plan.points.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="text-lg font-semibold">FAQ</h3>
        <p className="mt-2 text-sm text-ink/80">Can I cancel anytime? Yes. Do you send false alerts? We gate every alert through deterministic verifiers.</p>
      </Card>
    </div>
  );
}
