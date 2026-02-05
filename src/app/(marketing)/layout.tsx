import { MarketingFooter } from '@/components/layout/MarketingFooter';
import { MarketingNav } from '@/components/layout/MarketingNav';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="canvas min-h-screen">
      <MarketingNav />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      <MarketingFooter />
    </div>
  );
}
