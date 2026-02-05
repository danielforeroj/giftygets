import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
