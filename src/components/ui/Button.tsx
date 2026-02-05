import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/classnames/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-pink to-orange text-white shadow-glow hover:brightness-110 focus-visible:outline-pink',
  secondary: 'bg-gradient-to-r from-blue to-cyan text-white hover:brightness-110 focus-visible:outline-cyan',
  ghost: 'border border-glassBorder bg-white/10 text-paper hover:bg-white/20 focus-visible:outline-white'
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
