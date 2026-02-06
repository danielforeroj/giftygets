import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Table, TableWrap } from '@/components/ui/Table';
import { mockAlerts, mockTrackers } from '@/lib/mock/mockData';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Dashboard" description="Your active trackers and recent alert activity." />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ['Active trackers', '12'],
          ['Alerts sent today', '3'],
          ['Average confidence', '0.91']
        ].map(([label, value]) => (
          <Card key={label}>
            <p className="text-sm text-ink/75">{label}</p>
            <p className="mt-2 text-3xl font-black">{value}</p>
          </Card>
        ))}
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
            {mockTrackers.map((tracker) => (
              <tr key={tracker.id} className="border-t border-glassBorder/40 hover:bg-white/10">
                <td className="px-4 py-3">{tracker.name}</td>
                <td className="px-4 py-3">
                  <Badge>{tracker.status}</Badge>
                </td>
                <td className="px-4 py-3">{tracker.last}</td>
                <td className="px-4 py-3">{tracker.next}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold">Alert history</h3>
          <ul className="mt-3 space-y-3 text-sm">
            {mockAlerts.map((alert) => (
              <li key={alert.id}>
                <p>{alert.title}</p>
                <p className="text-ink/70">{alert.when} · {alert.reason}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="font-semibold">Alternatives while you wait</h3>
          <div className="mt-4 space-y-2 text-sm">
            <p>• Botanical Bonsai Set</p>
            <p>• Puzzle Flower Bouquet</p>
            <p>• Succulent Light Kit</p>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="secondary">Like</Button>
            <Button variant="ghost">Not for me</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
