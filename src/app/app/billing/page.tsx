import { SectionHeader } from '@/components/ui/SectionHeader';
import { BillingClient } from './BillingClient';

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Billing" description="Manage your subscription and plan limits." />
      <BillingClient />
    </div>
  );
}
