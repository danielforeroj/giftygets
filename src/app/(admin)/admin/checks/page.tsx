import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Table, TableWrap } from '@/components/ui/Table';
import { mockAgentTraces } from '@/lib/mock/mockData';

export default function AdminChecksPage() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Recent checks" description="Mocked agent trace status overview." />
      <TableWrap>
        <Table>
          <thead className="bg-white/10 text-xs uppercase text-ink/70">
            <tr>
              <th className="px-4 py-3">Tracker</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Trace</th>
            </tr>
          </thead>
          <tbody>
            {mockAgentTraces.map((trace) => (
              <tr key={trace.id} className="border-t border-glassBorder/40">
                <td className="px-4 py-3">{trace.tracker}</td>
                <td className="px-4 py-3">
                  <Badge>{trace.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Link className="text-cyan" href={`/admin/checks/${trace.id}`}>
                    View trace
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>
    </div>
  );
}
