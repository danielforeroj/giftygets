'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export function DeleteTrackerButton({ trackerId }: { trackerId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onDelete() {
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/trackers/${trackerId}`, { method: 'DELETE' });
    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: 'Delete failed' }));
      setError(body.error ?? 'Delete failed');
      setLoading(false);
      return;
    }

    router.push('/app/trackers');
    router.refresh();
  }

  return (
    <div className="space-y-2">
      <Button variant="ghost" onClick={onDelete} disabled={loading}>
        {loading ? 'Deleting…' : 'Delete tracker'}
      </Button>
      {error ? <p className="text-sm text-pink">{error}</p> : null}
    </div>
  );
}
