import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { SectionHeader } from '@/components/ui/SectionHeader';

const stores = ['Shopify', 'Etsy', 'Target', 'Best Buy', 'Macy\'s', 'Nike'];

export default function MarketingHomePage() {
  return (
    <div className="space-y-16">
      <section className="grid items-center gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="sticker-badge">Gifty MVP</p>
          <h1 className="text-4xl font-black leading-tight sm:text-6xl">
            Wanted <span className="text-cyan">→</span> Won <span className="text-cyan">→</span> Wow
          </h1>
          <p className="text-lg text-ink/85">Track gifts, verify real stock signals, and send paid alerts with confidence.</p>
          <div className="flex flex-wrap gap-3">
            <Input placeholder="you@example.com" className="max-w-xs" />
            <Button>Join waitlist</Button>
          </div>
        </div>
        <Card className="space-y-4">
          <p className="text-sm text-ink/75">Trusted verification flow</p>
          <ul className="space-y-2 text-sm">
            <li>✓ Adapter checks buyable state</li>
            <li>✓ Rule matching + confidence threshold</li>
            <li>✓ Dedupe + rate limits before send</li>
          </ul>
          <div className="doodle-divider" />
          <p className="text-sm text-ink/80">Playful by design, deterministic by policy.</p>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeader title="How Gifty works" description="Simple setup, powerful checks, better gifting moments." />
        <div className="grid gap-4 sm:grid-cols-3">
          {['Create tracker', 'Run checks', 'Send helpful alerts'].map((item, index) => (
            <Card key={item}>
              <p className="sticker-badge">Step {index + 1}</p>
              <h3 className="mt-3 font-semibold">{item}</h3>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Supported stores" description="We start with common storefronts and expand safely." />
        <div className="mt-5 flex flex-wrap gap-2">
          {stores.map((store) => (
            <span key={store} className="sticker-badge">
              {store}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
