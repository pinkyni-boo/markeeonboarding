import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  as?: 'input' | 'textarea';
}

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, error, as = 'input', className, required, ...props }, ref) => {
    const Component = as;
    const baseClasses = "block w-full rounded-xl border bg-white px-4 py-3 text-foreground shadow-sm transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 sm:text-sm";
    
    return (
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-foreground">
          {label} {required && <span className="text-primary">*</span>}
        </label>
        <Component
          ref={ref as any}
          className={twMerge(
            clsx(
              baseClasses,
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-300',
              className
            )
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
FormField.displayName = 'FormField';
