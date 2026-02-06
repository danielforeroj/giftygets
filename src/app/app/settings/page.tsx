import { SectionHeader } from '@/components/ui/SectionHeader';
import { requireUser } from '@/lib/auth/requireUser';
import { prisma } from '@/server/db/prisma';
import { SettingsForm } from './SettingsForm';

export default async function SettingsPage() {
  const user = await requireUser();
  const current = await prisma.user.findUnique({
    where: { id: user.id },
    select: { timezone: true, notificationEmail: true, email: true }
  });

  return (
    <div className="space-y-6">
      <SectionHeader title="Settings" description="Profile and notification preferences." />
      <SettingsForm
        initialTimezone={current?.timezone ?? 'UTC'}
        initialNotificationEmail={current?.notificationEmail ?? current?.email ?? ''}
      />
    </div>
  );
}
