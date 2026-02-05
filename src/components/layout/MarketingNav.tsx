import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-10 border-b border-glassBorder/70 bg-white/10 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link className="text-lg font-black tracking-tight" href="/">
          Gifty Gets
        </Link>
        <div className="hidden items-center gap-6 text-sm sm:flex">
          <Link className="text-cyan" href="/pricing">
            Pricing
          </Link>
          <Link className="text-cyan" href="/privacy">
            Privacy
          </Link>
          <Link className="text-cyan" href="/terms">
            Terms
          </Link>
          <Link href="/app/dashboard">
            <Button>Open App</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
