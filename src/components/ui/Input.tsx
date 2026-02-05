import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/classnames/cn';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-2xl border border-glassBorder bg-white/10 px-4 py-2 text-sm text-ink placeholder:text-ink/70 outline-none ring-0 transition focus:border-cyan',
        className
      )}
      {...props}
    />
  );
}
