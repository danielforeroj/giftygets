import { Card } from '@/components/ui/Card';
import { getCheckTrace } from '@/server/queries/admin';

type PageProps = { params: { id: string } };

export default async function AdminCheckDetailPage({ params }: PageProps) {
  const trace = await getCheckTrace(params.id);
  if (!trace) return <div className="text-sm text-ink/70">No trace found.</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Trace {params.id}</h2>
      <Card>
        <ol className="space-y-2 text-sm">
          {trace.toolCalls.map((step, index) => {
            const result = trace.toolResults.find((r) => r.stepId === step.stepId);
            return <li key={step.id}><span className="text-cyan">{index + 1}.</span> {step.tool} - {result?.ok ? 'ok' : 'failed'}</li>;
          })}
        </ol>
      </Card>
    </div>
  );
}
