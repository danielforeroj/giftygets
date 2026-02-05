import Link from 'next/link';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
          <Link className="font-semibold" href="/">
            GiftyGets
          </Link>
          <div className="space-x-4">
            <Link href="/pricing">Pricing</Link>
            <Link href="/app/dashboard">Dashboard</Link>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl p-6">{children}</main>
    </div>
  );
}
