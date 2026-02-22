import React from 'react';

export const DashboardPlaceholder = ({ title }) => {
    return (
        <div className="p-6 font-display h-full flex flex-col">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">{title}</h1>
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-slate-100 dark:border-white/5 flex-1 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/5 dark:bg-accent/5 text-primary/50 dark:text-accent/50 mb-4">
                    <span className="material-symbols-outlined text-[32px]">construction</span>
                </div>
                <p className="font-medium text-lg text-slate-900 dark:text-white">Coming Soon</p>
                <p className="text-sm mt-1">Dashboard content for {title} is under construction.</p>
            </div>
        </div>
    );
};
