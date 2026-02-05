import { log } from '@/server/logging/logger';

export type TraceEvent = { stepId: string; tool: string; ok: boolean; data?: unknown; error?: string };

export class TraceRecorder {
  public events: TraceEvent[] = [];

  push(event: TraceEvent) {
    this.events.push(event);
    log(event.ok ? 'info' : 'warn', 'tool_event', event);
  }
}
