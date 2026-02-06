'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export function SettingsForm({ initialTimezone, initialNotificationEmail }: { initialTimezone: string; initialNotificationEmail: string }) {
  const [timezone, setTimezone] = useState(initialTimezone);
  const [notificationEmail, setNotificationEmail] = useState(initialNotificationEmail);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    const res = await fetch('/api/user/settings', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ timezone, notificationEmail })
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(body.error ?? 'Unable to save settings');
      setSaving(false);
      return;
    }

    setSaving(false);
    setMessage('Settings saved.');
  }

  return (
    <Card className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <Input value={notificationEmail} onChange={(event) => setNotificationEmail(event.target.value)} placeholder="Notification email" />
        <Select value={timezone} onChange={(event) => setTimezone(event.target.value)}>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option>
          <option value="America/Los_Angeles">America/Los_Angeles</option>
        </Select>
        <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save settings'}</Button>
      </form>
      {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
      {error ? <p className="text-sm text-pink">{error}</p> : null}
    </Card>
  );
}
