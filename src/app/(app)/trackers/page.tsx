import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Table, TableWrap } from '@/components/ui/Table';
import { mockTrackers } from '@/lib/mock/mockData';

export default function TrackersPage() {
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
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockTrackers.map((tracker) => (
              <tr key={tracker.id} className="border-t border-glassBorder/40">
                <td className="px-4 py-3">{tracker.name}</td>
                <td className="px-4 py-3">{tracker.store}</td>
                <td className="px-4 py-3">{tracker.price}</td>
                <td className="px-4 py-3">
                  <Link className="text-cyan" href={`/app/trackers/${tracker.id}`}>
                    Open
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
