import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { requireUser } from '@/lib/auth/requireUser';
import { getTracker } from '@/server/trackers/trackerService';
import { DeleteTrackerButton } from './DeleteTrackerButton';

type PageProps = { params: { id: string } };

export default async function TrackerDetailPage({ params }: PageProps) {
  const user = await requireUser();
  const tracker = await getTracker(params.id, user.id);

  if (!tracker) {
    return (
      <Card>
        <p className="text-sm text-ink/80">Not found.</p>
      </Card>
    );
  }

  const rule = tracker.rules[0];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{tracker.name}</h1>
      <Card className="space-y-2">
        <p className="text-sm text-ink/80">Store: {tracker.normalizedDomain}</p>
        <p className="text-sm text-ink/80">URL: {tracker.url}</p>
        <p className="text-sm text-ink/80">Variant size: {rule?.variantSize ?? 'Any'}</p>
        <p className="text-sm text-ink/80">Variant color: {rule?.variantColor ?? 'Any'}</p>
        <p className="text-sm text-ink/80">Price cap: {rule?.priceCapCents ? `$${(rule.priceCapCents / 100).toFixed(2)}` : 'None'}</p>
        <div className="pt-2">
          <Badge>{tracker.status}</Badge>
        </div>
      </Card>
      <DeleteTrackerButton trackerId={tracker.id} />
    </div>
  );
}
