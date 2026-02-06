'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export function NewTrackerForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const priceCapDollars = String(formData.get('priceCapDollars') || '').trim();
    const priceCapCents = priceCapDollars ? Math.round(Number(priceCapDollars) * 100) : undefined;

    const payload = {
      url: String(formData.get('url') || ''),
      name: String(formData.get('name') || ''),
      frequencyTier: String(formData.get('frequencyTier') || 'hourly'),
      variantSize: String(formData.get('variantSize') || '') || undefined,
      variantColor: String(formData.get('variantColor') || '') || undefined,
      priceCapCents: Number.isFinite(priceCapCents) ? priceCapCents : undefined
    };

    const res = await fetch('/api/trackers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: 'Unable to create tracker' }));
      setError(body.error ?? 'Unable to create tracker');
      setLoading(false);
      return;
    }

    router.push('/app/trackers');
    router.refresh();
  }

  return (
    <Card className="space-y-4">
      <form className="space-y-4" onSubmit={onSubmit}>
        <Input name="url" placeholder="Product URL" required />
        <Input name="name" placeholder="Friendly tracker name" required />
        <div className="grid gap-3 sm:grid-cols-2">
          <Select name="frequencyTier" defaultValue="hourly">
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
          </Select>
          <Input name="priceCapDollars" placeholder="Price cap ($)" type="number" step="0.01" min="0" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input name="variantSize" placeholder="Variant size (optional)" />
          <Input name="variantColor" placeholder="Variant color (optional)" />
        </div>
        <Button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create tracker'}</Button>
      </form>
      {error ? <p className="text-sm text-pink">{error}</p> : null}
    </Card>
  );
}
