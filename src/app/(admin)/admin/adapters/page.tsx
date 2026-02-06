import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAdapterHealthRows, type AdapterHealthRow } from '@/server/queries/admin';

export default async function AdminAdaptersPage() {
  const rows = await getAdapterHealthRows();
  return (
    <div className="space-y-4">
      <SectionHeader title="Adapter health" description="Persisted adapter health snapshot." />
      <Card className="space-y-3">
        {rows.map((row: AdapterHealthRow) => (
          <p key={row.id} className="flex items-center justify-between"><span>{row.domain}</span> <Badge>{row.backoffUntil && row.backoffUntil > new Date() ? 'BACKOFF' : 'HEALTHY'}</Badge></p>
        ))}
      </Card>
    </div>
  );
}
