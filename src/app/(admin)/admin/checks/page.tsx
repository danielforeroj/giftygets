import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Table, TableWrap } from '@/components/ui/Table';
import { getRecentCheckRuns, type RecentCheckRunRow } from '@/server/queries/admin';

export const dynamic = 'force-dynamic';

export default async function AdminChecksPage() {
  const runs = await getRecentCheckRuns();
  return (
    <div className="space-y-4">
      <SectionHeader title="Recent checks" description="Recent check runs with trace status." />
      <TableWrap>
        <Table>
          <thead className="bg-white/10 text-xs uppercase text-ink/70">
            <tr><th className="px-4 py-3">Tracker</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Trace</th></tr>
          </thead>
          <tbody>
            {runs.map((run: RecentCheckRunRow) => (
              <tr key={run.id} className="border-t border-glassBorder/40">
                <td className="px-4 py-3">{run.tracker.name}</td>
                <td className="px-4 py-3"><Badge>{run.status}</Badge></td>
                <td className="px-4 py-3"><Link className="text-cyan" href={`/admin/checks/${run.id}`}>View trace</Link></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>
    </div>
  );
}
