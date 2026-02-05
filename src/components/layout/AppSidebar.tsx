import Link from 'next/link';

const links = [
  { href: '/app/dashboard', label: 'Dashboard' },
  { href: '/app/trackers', label: 'Trackers' },
  { href: '/app/billing', label: 'Billing' },
  { href: '/app/settings', label: 'Settings' }
];

export function AppSidebar() {
  return (
    <aside className="card-glass hidden h-full w-60 rounded-3xl p-4 lg:block">
      <p className="mb-4 px-2 text-sm font-semibold text-ink/80">Workspace</p>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link className="block rounded-2xl px-3 py-2 text-sm text-cyan hover:bg-white/10" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
