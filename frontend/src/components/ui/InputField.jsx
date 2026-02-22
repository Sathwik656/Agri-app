import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const InputField = React.forwardRef(({
    label,
    error,
    className,
    containerClassName,
    id,
    ...props
}, ref) => {
    const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className={twMerge("space-y-1", containerClassName)}>
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                ref={ref}
                className={twMerge(
                    clsx(
                        "block w-full rounded-lg border border-slate-300 dark:border-white/10",
                        "bg-white dark:bg-surface-dark text-slate-900 dark:text-white",
                        "px-4 py-3 placeholder:text-slate-400 dark:placeholder:text-slate-500",
                        "focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:border-accent dark:focus:ring-accent/20",
                        "transition-colors shadow-sm",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        className
                    )
                )}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
            )}
        </div>
    );
});
InputField.displayName = 'InputField';
