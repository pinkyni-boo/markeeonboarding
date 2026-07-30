import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SelectableCardProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  type?: 'checkbox' | 'radio';
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
  label,
  description,
  selected,
  onClick,
  type = 'checkbox'
}) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        clsx(
          'relative flex cursor-pointer rounded-xl md:rounded-[14px] border p-3 md:p-4 shadow-sm transition-all duration-200 focus:outline-none',
          selected
            ? 'border-primary bg-primary-light ring-1 ring-primary'
            : 'border-border-color bg-card hover:bg-slate-50 hover:border-slate-300'
        )
      )}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center">
          <div className="text-xs md:text-sm">
            <p
              className={twMerge(
                clsx(
                  'font-medium leading-tight md:leading-normal',
                  selected ? 'text-primary' : 'text-foreground'
                )
              )}
            >
              {label}
            </p>
            {description && (
              <span className={clsx('block mt-1', selected ? 'text-primary/80' : 'text-text-muted')}>
                {description}
              </span>
            )}
            {selected && (
              <span className="inline-block mt-2 text-[10px] font-semibold bg-primary text-white uppercase tracking-wider px-2 py-0.5 rounded-full">
                Đã chọn
              </span>
            )}
          </div>
        </div>
        <div
          className={twMerge(
            clsx(
              'ml-4 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors',
              type === 'radio' ? 'rounded-full' : 'rounded-md',
              selected
                ? 'border-primary bg-primary text-white'
                : 'border-slate-300 bg-white'
            )
          )}
        >
          {selected && (
            type === 'checkbox' ? (
              <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
            ) : (
              <div className="h-2 w-2 rounded-full bg-white" />
            )
          )}
        </div>
      </div>
    </div>
  );
};
