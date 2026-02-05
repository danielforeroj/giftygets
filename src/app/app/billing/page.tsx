import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Billing" description="Manage your subscription and plan limits." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-xl font-semibold">Current plan: Plus</h3>
          <p className="mt-2 text-sm text-ink/80">15 trackers · hourly checks · 300 checks/day</p>
          <Button className="mt-4">Upgrade to Pro</Button>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold">Usage</h3>
          <p className="mt-2 text-sm text-ink/80">Trackers used: 8/15</p>
        </Card>
      </div>
    </div>
  );
}
