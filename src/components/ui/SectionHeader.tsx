import { Badge } from '@/components/ui/Badge';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
      {description ? <p className="text-ink/80">{description}</p> : null}
    </div>
  );
}
