import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Select } from '@/components/ui/Select';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Settings" description="Profile and notification preferences." />
      <Card className="space-y-4">
        <Input defaultValue="dev@example.com" />
        <Select defaultValue="America/New_York">
          <option>America/New_York</option>
          <option>America/Los_Angeles</option>
          <option>UTC</option>
        </Select>
        <Button>Save settings</Button>
      </Card>
    </div>
  );
}
