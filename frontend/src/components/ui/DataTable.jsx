import React from 'react';

export function DataTable({ data, columns, emptyMessage = "No data available" }) {
    if (data.length === 0) {
        return (
            <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-slate-100 dark:border-white/5 bg-white dark:bg-surface-dark">
            <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-background-dark border-b border-slate-100 dark:border-white/5">
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} scope="col" className="px-6 py-3 font-medium text-nowrap">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className="bg-white dark:bg-surface-dark border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            {columns.map((col, j) => (
                                <td key={j} className="px-6 py-4">
                                    {col.cell ? col.cell(row) : (col.accessorKey ? String(row[col.accessorKey]) : null)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
