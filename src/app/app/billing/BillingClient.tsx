'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const plans = [
  { key: 'BASIC', title: 'Basic', price: '$9/mo' },
  { key: 'PRO', title: 'Pro', price: '$29/mo' }
] as const;

export function BillingClient() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(planKey: 'BASIC' | 'PRO') {
    setLoading(planKey);
    setError(null);

    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ planKey })
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok || !body.url) {
      setError(body.error ?? 'Unable to create checkout session');
      setLoading(null);
      return;
    }

    window.location.href = body.url;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.key}>
            <h3 className="text-xl font-semibold">{plan.title}</h3>
            <p className="mt-1 text-sm text-ink/80">{plan.price}</p>
            <Button className="mt-4" onClick={() => startCheckout(plan.key)} disabled={loading === plan.key}>
              {loading === plan.key ? 'Redirecting…' : `Choose ${plan.title}`}
            </Button>
          </Card>
        ))}
      </div>
      {error ? <p className="text-sm text-pink">{error}</p> : null}
    </div>
  );
}
