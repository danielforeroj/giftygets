import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

type PageProps = { params: { id: string } };

export default function TrackerDetailPage({ params }: PageProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tracker {params.id}</h1>
      <Card>
        <p className="text-sm text-ink/80">Store: shop.example.com</p>
        <p className="mt-2 text-sm text-ink/80">Rule: Variant "Pink", max price $45</p>
        <div className="mt-3">
          <Badge>WATCHING</Badge>
        </div>
      </Card>
    </div>
  );
}
