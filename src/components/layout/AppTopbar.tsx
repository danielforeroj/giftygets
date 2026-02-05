import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function AppTopbar() {
  return (
    <header className="card-glass mb-6 flex items-center justify-between rounded-3xl px-5 py-3">
      <div>
        <p className="text-xs uppercase tracking-wide text-ink/70">Gifty Dashboard</p>
        <p className="font-semibold">Wanted → Won → Wow</p>
      </div>
      <div className="flex gap-2">
        <Link href="/app/trackers/new">
          <Button variant="secondary">New tracker</Button>
        </Link>
      </div>
    </header>
  );
}
