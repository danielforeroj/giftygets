import { Card } from '@/components/ui/Card';
import { unsubscribeByToken } from '@/server/email/unsubscribe';

export default async function UnsubscribePage({ searchParams }: { searchParams: { token?: string } }) {
  const valid = searchParams.token ? await unsubscribeByToken(searchParams.token) : false;
  return (
    <div className="mx-auto max-w-xl py-20">
      <Card>
        <h1 className="text-2xl font-bold">Unsubscribe</h1>
        <p className="mt-3 text-sm text-ink/80">{valid ? 'You have been unsubscribed from future alerts.' : 'Invalid unsubscribe token.'}</p>
      </Card>
    </div>
  );
}
