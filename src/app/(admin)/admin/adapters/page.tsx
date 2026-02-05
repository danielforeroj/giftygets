import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function AdminAdaptersPage() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Adapter health" description="Mock availability and latency snapshot." />
      <Card className="space-y-3">
        <p className="flex items-center justify-between"><span>ShopifyGenericAdapter</span> <Badge>HEALTHY</Badge></p>
        <p className="flex items-center justify-between"><span>CustomExampleAdapter</span> <Badge>DEGRADED</Badge></p>
      </Card>
    </div>
  );
}
