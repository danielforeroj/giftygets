import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Table, TableWrap } from '@/components/ui/Table';
import { requireUser } from '@/lib/auth/requireUser';
import { listTrackers } from '@/server/trackers/trackerService';

function formatDate(value: Date | null) {
  return value ? value.toLocaleString() : '—';
}

export default async function TrackersPage() {
  const user = await requireUser();
  const trackers = await listTrackers(user.id);

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <SectionHeader title="Trackers" description="Manage URL rules and monitoring cadence." />
        <Link href="/app/trackers/new">
          <Button>New tracker</Button>
        </Link>
      </div>
      <TableWrap>
        <Table>
          <thead className="bg-white/10 text-xs uppercase text-ink/70">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Store</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last check</th>
              <th className="px-4 py-3">Next</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trackers.map((tracker) => (
              <tr key={tracker.id} className="border-t border-glassBorder/40">
                <td className="px-4 py-3">{tracker.name}</td>
                <td className="px-4 py-3">{tracker.normalizedDomain}</td>
                <td className="px-4 py-3">{tracker.status}</td>
                <td className="px-4 py-3">{formatDate(tracker.lastRunAt)}</td>
                <td className="px-4 py-3">{formatDate(tracker.nextRunAt)}</td>
                <td className="px-4 py-3">
                  <Link className="text-cyan" href={`/app/trackers/${tracker.id}`}>
                    Open
                  </Link>
                </td>
              </tr>
            ))}
            {trackers.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-sm text-ink/70" colSpan={6}>
                  No trackers yet. Create your first tracker.
                </td>
              </tr>
            ) : null}
          </tbody>
        </Table>
      </TableWrap>
    </div>
  );
}
