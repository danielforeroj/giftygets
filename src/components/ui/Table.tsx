import type { HTMLAttributes, TableHTMLAttributes } from 'react';
import { cn } from '@/lib/classnames/cn';

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn('w-full text-left text-sm', className)} {...props} />;
}

export function TableWrap({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('card-glass overflow-hidden rounded-3xl', className)} {...props} />;
}
