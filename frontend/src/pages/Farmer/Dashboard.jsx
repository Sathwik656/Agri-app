import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, TrendingUp, Handshake, Sprout } from 'lucide-react';
import { farmerService } from '../../services/farmerService';
import { marketService } from '../../services/marketService';

export const FarmerDashboard = () => {
    const [crops, setCrops] = useState([]);
    const [marketTrends, setMarketTrends] = useState([]);
    const [stats, setStats] = useState({ activeCrops: 0, pendingDeals: 0, yieldPredict: '+0%' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [cropsData, trendsData, profileData] = await Promise.all([
                    farmerService.getCrops(),
                    marketService.getPriceTrends(),
                    farmerService.getProfile()
                ]);

                setCrops(cropsData.crops || []);
                setMarketTrends(trendsData.trends || []);

                setStats({
                    activeCrops: cropsData.crops?.length || 0,
                    pendingDeals: profileData.pendingDeals || 0,
                    yieldPredict: profileData.yieldPrediction || '+0%'
                });
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const columns = [
        { header: 'Crop', accessorKey: 'name' },
        { header: 'Volume', accessorKey: 'weight' },
        { header: 'Offer Price', accessorKey: 'price' },
        {
            header: 'Status',
            cell: (item) => <StatusBadge status={item.status || 'Active'} />
        },
        {
            header: 'Actions',
            cell: () => <Button variant="ghost" size="sm">Edit</Button>
        }
    ];

    if (isLoading) {
        return <div className="p-12 flex justify-center">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-6 font-display">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Farmer Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back to your farm overview.</p>
                </div>
                <Button className="gap-2"><Plus className="w-5 h-5 text-white" /> List New Crop</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Active Crops Stat */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-primary dark:text-green-400 group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">grass</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Active Crops</p>
                            <h4 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.activeCrops}</h4>
                        </div>
                    </div>
                </div>

                {/* Pending Deals Stat */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">handshake</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Pending Deals</p>
                            <h4 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.pendingDeals}</h4>
                        </div>
                    </div>
                </div>

                {/* Yield Predict Stat */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">trending_up</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Avg Yield Predict</p>
                            <h4 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.yieldPredict}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Market Price Trends (AI Driven)">
                    <div className="h-72 mt-4">
                        {marketTrends.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={marketTrends}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dx={-10} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a2c1c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                                        itemStyle={{ color: '#00FFC2' }}
                                    />
                                    <Line type="monotone" dataKey="price" stroke="#00FFC2" strokeWidth={3} dot={{ r: 4, fill: '#134216', stroke: '#00FFC2', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#00FFC2' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">No trend data available</div>
                        )}
                    </div>
                </Card>

                <Card title="Recent Inventory" action={<Button variant="ghost" size="sm">View All</Button>}>
                    <DataTable data={crops} columns={columns} emptyMessage="No crops listed yet. Click 'List New Crop' to start." />
                </Card>
            </div>
        </div>
    );
};
