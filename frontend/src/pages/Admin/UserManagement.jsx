import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Search, ShieldAlert, UserCheck, UserX } from 'lucide-react';

export const AdminUserManagement = () => {
    // Mock user data for the admin panel
    const [users] = useState([
        { id: 'USR-001', name: 'John Doe', email: 'john@midwestfarms.com', role: 'FARMER', status: 'Active', joined: '2023-01-15' },
        { id: 'USR-002', name: 'AgriCorp Global', email: 'procurement@agricorp.com', role: 'BUYER', status: 'Active', joined: '2023-02-20' },
        { id: 'USR-003', name: 'Sarah Jenkins', email: 's.jenkins@capital.io', role: 'INVESTOR', status: 'Pending', joined: '2023-05-10' },
        { id: 'USR-004', name: 'Mike Smith', email: 'mike@smithfarms.net', role: 'FARMER', status: 'Suspended', joined: '2023-01-18' },
        { id: 'USR-005', name: 'FreshFoods Inc', email: 'buyer@freshfoods.com', role: 'BUYER', status: 'Active', joined: '2023-06-05' },
    ]);

    const stats = {
        totalUsers: 12450,
        pendingVerifications: 84,
        flaggedAccounts: 12
    };

    const columns = [
        {
            header: 'User Info', cell: (row) => (
                <div>
                    <p className="font-bold text-slate-900 dark:text-white">{row.name}</p>
                    <p className="text-xs text-slate-500">{row.email}</p>
                </div>
            )
        },
        {
            header: 'Role', cell: (row) => (
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${row.role === 'FARMER' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        row.role === 'BUYER' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                            'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                    }`}>
                    {row.role}
                </span>
            )
        },
        { header: 'Joined', accessorKey: 'joined' },
        { header: 'Status', cell: (row) => <StatusBadge status={row.status} /> },
        {
            header: 'Actions', cell: () => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2">Edit</Button>
                    <Button variant="danger" size="sm" className="h-8 px-2">Suspend</Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 font-display">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">User Management</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage platform access, roles, and verifications.</p>
                </div>
                <Button className="gap-2">
                    <UserCheck className="w-5 h-5 text-white" /> Invite User
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">group</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Active Users</p>
                            <h4 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalUsers.toLocaleString()}</h4>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">pending_actions</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Pending Verification</p>
                            <h4 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.pendingVerifications}</h4>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">warning</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Flagged Accounts</p>
                            <h4 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.flaggedAccounts}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <Card className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search users by name, email, or ID..."
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:border-accent dark:focus:ring-accent/20 transition-colors"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <select className="flex-1 md:flex-none border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors">
                        <option>All Roles</option>
                        <option>Farmer</option>
                        <option>Buyer</option>
                        <option>Investor</option>
                    </select>
                    <select className="flex-1 md:flex-none border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors">
                        <option>All Statuses</option>
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Suspended</option>
                    </select>
                </div>
            </Card>

            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-100 dark:border-white/5 overflow-hidden">
                <DataTable data={users} columns={columns} emptyMessage="No users found matching your criteria." />
            </div>
        </div>
    );
};
