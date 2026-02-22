import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = React.forwardRef(({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    disabled,
    ...props
}, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none transform";

    const variants = {
        primary: "bg-primary hover:bg-primary-light text-white shadow-lg shadow-primary/20 hover:scale-105",
        secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
        accent: "bg-accent text-primary-dark font-bold hover:bg-white shadow-[0_0_20px_rgba(0,255,194,0.3)]",
        ghost: "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-primary dark:hover:text-accent",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm hover:scale-105",
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-8 text-base",
        lg: "h-14 px-8 text-lg font-bold",
    };

    return (
        <button ref={ref} className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))} disabled={isLoading || disabled} {...props}>
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {children}
        </button>
    );
});
Button.displayName = 'Button';
