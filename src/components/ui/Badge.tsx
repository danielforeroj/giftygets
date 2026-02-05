import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/classnames/cn';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('sticker-badge', className)} {...props} />;
}
