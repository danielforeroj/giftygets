import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/classnames/cn';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('card-glass rounded-3xl p-6', className)} {...props} />;
}
