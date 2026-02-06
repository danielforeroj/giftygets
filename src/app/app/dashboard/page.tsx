import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Table, TableWrap } from '@/components/ui/Table';
import { requireUser } from '@/lib/auth/requireUser';
import { getDashboardStats, getRecentAlerts, getRecentTrackers } from '@/server/queries/dashboard';

export default async function DashboardPage() {
  const user = await requireUser();
  const [stats, recentAlerts, recentTrackers] = await Promise.all([
    getDashboardStats(user.id),
    getRecentAlerts(user.id),
    getRecentTrackers(user.id)
  ]);

  return (
    <div className="space-y-6">
      <SectionHeader title="Dashboard" description="Your active trackers and recent alert activity." />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-ink/75">Active trackers</p>
          <p className="mt-2 text-3xl font-black">{stats.activeTrackers}</p>
        </Card>
        <Card>
          <p className="text-sm text-ink/75">Alerts sent today</p>
          <p className="mt-2 text-3xl font-black">{stats.alertsSentToday}</p>
        </Card>
        <Card>
          <p className="text-sm text-ink/75">Average confidence</p>
          <p className="mt-2 text-3xl font-black">{stats.avgConfidence ? stats.avgConfidence.toFixed(2) : 'N/A'}</p>
        </Card>
      </div>

      <TableWrap>
        <Table>
          <thead className="bg-white/10 text-xs uppercase text-ink/70">
            <tr>
              <th className="px-4 py-3">Tracker</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last</th>
              <th className="px-4 py-3">Next</th>
            </tr>
          </thead>
          <tbody>
            {recentTrackers.map((tracker) => (
              <tr key={tracker.id} className="border-t border-glassBorder/40 hover:bg-white/10">
                <td className="px-4 py-3">
                  <Link className="text-cyan" href={`/app/trackers/${tracker.id}`}>
                    {tracker.name}
                  </Link>
                </td>
                <td className="px-4 py-3"><Badge>{tracker.status}</Badge></td>
                <td className="px-4 py-3">{tracker.lastRunAt ? tracker.lastRunAt.toLocaleString() : '—'}</td>
                <td className="px-4 py-3">{tracker.nextRunAt ? tracker.nextRunAt.toLocaleString() : '—'}</td>
              </tr>
            ))}
            {recentTrackers.length === 0 ? (
              <tr><td className="px-4 py-6 text-sm text-ink/70" colSpan={4}>No trackers yet.</td></tr>
            ) : null}
          </tbody>
        </Table>
      </TableWrap>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold">Alert history</h3>
          <ul className="mt-3 space-y-3 text-sm">
            {recentAlerts.map((alert) => (
              <li key={alert.id}>
                <p>{alert.tracker.name}</p>
                <p className="text-ink/70">{alert.createdAt.toLocaleString()} · {alert.status} · {alert.whySent ?? alert.whyNotSent ?? 'No reason recorded'}</p>
              </li>
            ))}
            {recentAlerts.length === 0 ? <li className="text-ink/70">No alerts yet.</li> : null}
          </ul>
        </Card>
        <Card>
          <h3 className="font-semibold">Alternatives while you wait</h3>
          <p className="mt-3 text-sm text-ink/70">Coming soon. We will suggest alternatives based on your intent profile.</p>
        </Card>
      </div>
    </div>
  );
}
