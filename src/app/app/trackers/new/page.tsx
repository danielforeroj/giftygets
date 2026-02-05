import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Select } from '@/components/ui/Select';

export default function NewTrackerPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Create tracker" description="Mock form for MVP UI." />
      <Card className="space-y-4">
        <Input placeholder="Product URL" />
        <Input placeholder="Friendly tracker name" />
        <div className="grid gap-3 sm:grid-cols-2">
          <Select defaultValue="hourly">
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
          </Select>
          <Input placeholder="Price cap ($)" />
        </div>
        <Button>Create tracker</Button>
      </Card>
    </div>
  );
}
