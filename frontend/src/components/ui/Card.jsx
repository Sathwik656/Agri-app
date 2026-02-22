import React from 'react';

export const Card = ({ title, children, className = '', action }) => {
    return (
        <div className={`bg-surface-light dark:bg-surface-dark shadow-sm border border-slate-100 dark:border-white/5 rounded-xl hover:shadow-md transition-shadow group ${className}`}>
            {(title || action) && (
                <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                    {title && <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className="p-6">{children}</div>
        </div>
    );
};
