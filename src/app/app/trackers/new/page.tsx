import { SectionHeader } from '@/components/ui/SectionHeader';
import { NewTrackerForm } from './NewTrackerForm';

export default function NewTrackerPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Create tracker" description="Track one product URL with deterministic checks." />
      <NewTrackerForm />
    </div>
  );
}
