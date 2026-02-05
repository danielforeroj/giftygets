import { Card } from '@/components/ui/Card';

type PageProps = { params: { id: string } };

const timeline = ['FETCH_PAGE', 'EXTRACT_PRODUCT_JSON', 'VERIFY_BUYABLE', 'ALERT_GATE'];

export default function AdminCheckDetailPage({ params }: PageProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Trace {params.id}</h2>
      <Card>
        <ol className="space-y-2 text-sm">
          {timeline.map((step, index) => (
            <li key={step}>
              <span className="text-cyan">{index + 1}.</span> {step}
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
