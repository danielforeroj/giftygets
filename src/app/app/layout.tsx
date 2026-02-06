import { redirect } from 'next/navigation';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppTopbar } from '@/components/layout/AppTopbar';
import { getSession } from '@/lib/auth/getSession';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session?.user?.email) {
    redirect('/auth/signin?callbackUrl=/app/dashboard');
  }

  return (
    <div className="mx-auto grid min-h-screen max-w-7xl gap-4 px-4 py-6 lg:grid-cols-[240px_1fr]">
      <AppSidebar />
      <div>
        <AppTopbar />
        {children}
      </div>
    </div>
  );
}
