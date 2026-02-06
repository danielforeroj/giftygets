'use client';

import { FormEvent, Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/app/dashboard';
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await signIn('email', { email, callbackUrl, redirect: false });
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-md py-20">
      <Card className="space-y-4">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-sm text-ink/80">Use your email to receive a magic link.</p>
        <form onSubmit={onSubmit} className="space-y-3">
          <Input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Sending…' : 'Send magic link'}
          </Button>
        </form>
        {sent ? <p className="text-sm text-emerald-300">Check your email for the sign-in link.</p> : null}
      </Card>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}
