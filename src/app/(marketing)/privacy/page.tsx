import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Privacy" description="We collect the least data needed to run alerts." />
      <Card>
        <p className="text-sm text-ink/85">We store your account info, tracker settings, and alert history. We do not sell your personal data.</p>
      </Card>
    </div>
  );
}
