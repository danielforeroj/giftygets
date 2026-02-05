import Link from 'next/link';

export function MarketingFooter() {
  return (
    <footer className="mt-16 border-t border-glassBorder/70 py-8 text-sm text-ink/80">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6">
        <p>© {new Date().getFullYear()} Gifty Gets</p>
        <div className="flex items-center gap-4">
          <Link className="text-cyan" href="/privacy">
            Privacy
          </Link>
          <Link className="text-cyan" href="/terms">
            Terms
          </Link>
          <a className="text-cyan" href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@giftygets.com'}`}>
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
