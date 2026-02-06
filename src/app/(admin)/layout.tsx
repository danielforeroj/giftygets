import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    await requireAdmin();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    if (message === 'Unauthenticated') redirect('/auth/signin?callbackUrl=/admin/checks');
    if (message === 'Forbidden') redirect('/app/dashboard');
    throw error;
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-6 py-6">
      <header className="card-glass mb-6 flex items-center justify-between rounded-3xl px-4 py-3">
        <h1 className="font-bold">Admin Console</h1>
        <nav className="flex gap-4 text-sm text-cyan">
          <Link href="/admin/checks">Checks</Link>
          <Link href="/admin/adapters">Adapters</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
