import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const StatusBadge = ({ status, className }) => {
    const getStyles = () => {
        switch (status.toLowerCase()) {
            case 'active':
            case 'confirmed':
            case 'success':
            case 'funded':
                return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
            case 'pending':
            case 'negotiating':
                return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
            case 'cancelled':
            case 'rejected':
            case 'failed':
                return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
            default:
                return 'bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-400';
        }
    };

    return (
        <span className={twMerge(clsx("inline-flex items-center px-2 py-1 rounded text-xs font-bold capitalize", getStyles(), className))}>
            {status}
        </span>
    );
};
