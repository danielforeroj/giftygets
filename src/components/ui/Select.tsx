import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/classnames/cn';

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'w-full rounded-2xl border border-glassBorder bg-white/10 px-4 py-2 text-sm text-ink outline-none transition focus:border-blue',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
