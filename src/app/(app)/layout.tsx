import { requireUser } from '@/lib/auth/requireUser';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white px-6 py-4">
        <p className="text-sm text-slate-600">Signed in as {user.email ?? 'unknown user'}</p>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
