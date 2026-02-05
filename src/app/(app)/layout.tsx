import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppTopbar } from '@/components/layout/AppTopbar';
import { requireUser } from '@/lib/auth/requireUser';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireUser();

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
