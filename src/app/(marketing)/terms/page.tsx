import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function TermsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Terms" description="Fair-use rules for using Gifty Gets." />
      <Card>
        <p className="text-sm text-ink/85">Use the service lawfully, avoid abuse, and respect store policies. Billing plans can change with notice.</p>
      </Card>
    </div>
  );
}
