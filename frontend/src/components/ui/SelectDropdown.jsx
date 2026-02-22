import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

export const SelectDropdown = React.forwardRef(({
    label,
    options,
    error,
    className,
    containerClassName,
    id,
    ...props
}, ref) => {
    const selectId = id || `select-${label?.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className={twMerge("space-y-1", containerClassName)}>
            {label && (
                <label htmlFor={selectId} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    id={selectId}
                    ref={ref}
                    className={twMerge(
                        clsx(
                            "block w-full appearance-none rounded-lg border border-slate-300 dark:border-white/10",
                            "bg-white dark:bg-surface-dark text-slate-900 dark:text-white",
                            "px-4 py-3 pr-10",
                            "focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:border-accent dark:focus:ring-accent/20",
                            "transition-colors shadow-sm cursor-pointer",
                            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                            className
                        )
                    )}
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <ChevronDown className="h-4 w-4" />
                </div>
            </div>
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
            )}
        </div>
    );
});
SelectDropdown.displayName = 'SelectDropdown';
