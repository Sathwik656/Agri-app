import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Briefcase, PiggyBank, Search } from 'lucide-react';
import { investorService } from '../../services/investorService';
import { useNavigate } from 'react-router-dom';

export const InvestorDashboard = () => {
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);
    const [stats, setStats] = useState({ totalInvested: '$0', activeProjects: 0, roi: '+0%' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Mocking data if the actual service is empty for now
                const [portfolioData] = await Promise.all([
                    investorService.getPortfolio()
                ]);

                // Default mock data aligned with design needs
                setPortfolio([
                    { id: 1, name: "Midwest Corn Syndicate", amount: "$50,000", status: "Active", expectedReturn: "12%" },
                    { id: 2, name: "Texas Winter Wheat", amount: "$25,000", status: "Pending", expectedReturn: "8%" },
                    { id: 3, name: "California Almond Export", amount: "$100,000", status: "Funded", expectedReturn: "15%" },
                ]);

                setPerformanceData([
                    { name: 'Jan', value: 10000 },
                    { name: 'Feb', value: 25000 },
                    { name: 'Mar', value: 45000 },
                    { name: 'Apr', value: 42000 },
                    { name: 'May', value: 85000 },
                    { name: 'Jun', value: 125000 },
                ]);

                setStats({
                    totalInvested: '$175,000',
                    activeProjects: 3,
                    roi: '+14.2%'
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
        { header: 'Project Name', accessorKey: 'name' },
        { header: 'Invested Amount', accessorKey: 'amount' },
        { header: 'Expected Return', accessorKey: 'expectedReturn' },
        {
            header: 'Status',
            cell: (item) => <StatusBadge status={item.status || 'Active'} />
        },
        {
            header: 'Actions',
            cell: () => <Button variant="ghost" size="sm">Details</Button>
        }
    ];

    if (isLoading) {
        return <div className="p-12 flex justify-center text-slate-500">Loading portfolio...</div>;
    }

    return (
        <div className="space-y-6 font-display">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Investor Portfolio</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Track your agricultural investments and yields.</p>
                </div>
                <Button className="gap-2" onClick={() => navigate('/investor/projects')}>
                    <Search className="w-5 h-5 text-white" /> Discover Projects
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Invested Stat */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">payments</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Invested</p>
                            <h4 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalInvested}</h4>
                        </div>
                    </div>
                </div>

                {/* Active Projects Stat */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-primary dark:text-green-400 group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">pie_chart</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Active Syndiates</p>
                            <h4 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.activeProjects}</h4>
                        </div>
                    </div>
                </div>

                {/* Estimated ROI Stat */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">monitoring</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Est. Annual ROI</p>
                            <h4 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.roi}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Portfolio Growth">
                    <div className="h-72 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dx={-10} tickFormatter={(value) => `$${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a2c1c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#00FFC2' }}
                                    formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                                />
                                <Line type="monotone" dataKey="value" stroke="#00FFC2" strokeWidth={3} dot={{ r: 4, fill: '#134216', stroke: '#00FFC2', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#00FFC2' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Current Investments" action={<Button variant="ghost" size="sm">View History</Button>}>
                    <DataTable data={portfolio} columns={columns} emptyMessage="No active investments. Explore the marketplace to start." />
                </Card>
            </div>
        </div>
    );
};
