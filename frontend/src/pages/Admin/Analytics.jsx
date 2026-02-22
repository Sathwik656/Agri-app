import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Activity, DollarSign } from 'lucide-react';

export const AdminAnalytics = () => {
    // Mock Analytics Data
    const [revenueData] = useState([
        { name: 'Jan', revenue: 125000 },
        { name: 'Feb', revenue: 156000 },
        { name: 'Mar', revenue: 142000 },
        { name: 'Apr', revenue: 198000 },
        { name: 'May', revenue: 245000 },
        { name: 'Jun', revenue: 310000 },
    ]);

    const [userGrowth] = useState([
        { name: 'Jan', buyers: 400, farmers: 1200, investors: 50 },
        { name: 'Feb', buyers: 450, farmers: 1350, investors: 65 },
        { name: 'Mar', buyers: 520, farmers: 1480, investors: 85 },
        { name: 'Apr', buyers: 610, farmers: 1650, investors: 120 },
        { name: 'May', buyers: 720, farmers: 1820, investors: 145 },
        { name: 'Jun', buyers: 850, farmers: 2100, investors: 190 },
    ]);

    const stats = {
        mrr: '$310,000',
        activeTransactions: '1,432',
        platformUptime: '99.99%',
        totalVolume: '$42.5M'
    };

    return (
        <div className="space-y-6 font-display">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Platform Analytics</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Global ecosystem overview and financial performance.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-primary dark:text-green-400 group-hover:bg-primary group-hover:text-white transition-colors">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Monthly Revenue</p>
                            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.mrr}</h4>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Trading Volume</p>
                            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalVolume}</h4>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Active Deals</p>
                            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.activeTransactions}</h4>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-accent/10 flex items-center justify-center text-primary-dark dark:text-accent group-hover:bg-accent group-hover:text-primary-dark transition-colors">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">System Uptime</p>
                            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.platformUptime}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Revenue Growth">
                    <div className="h-80 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dx={-10} tickFormatter={(value) => `$${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a2c1c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#00FFC2' }}
                                    formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                                />
                                <Line type="monotone" dataKey="revenue" stroke="#00FFC2" strokeWidth={3} dot={{ r: 4, fill: '#134216', stroke: '#00FFC2', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#00FFC2' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="User Acquisition">
                    <div className="h-80 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={userGrowth}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dx={-10} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a2c1c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                                />
                                <Bar dataKey="farmers" stackId="a" fill="#22c55e" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="buyers" stackId="a" fill="#3b82f6" />
                                <Bar dataKey="investors" stackId="a" fill="#00FFC2" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};
