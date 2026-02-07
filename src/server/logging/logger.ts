import { redact } from '@/server/logging/redact';

export type LogLevel = 'info' | 'warn' | 'error';

export function log(level: LogLevel, message: string, context: Record<string, unknown> = {}) {
  const redactedContext = redact(context) as Record<string, unknown>;
  const payload = {
    ts: new Date().toISOString(),
    level,
    message,
    ...redactedContext
  };

  if (level === 'error') console.error(JSON.stringify(payload));
  else if (level === 'warn') console.warn(JSON.stringify(payload));
  else console.log(JSON.stringify(payload));
}
