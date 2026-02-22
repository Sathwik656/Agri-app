import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Search, MapPin, TrendingUp, Users } from 'lucide-react';
import { InputField } from '../../components/ui/InputField';
import { SelectDropdown } from '../../components/ui/SelectDropdown';

export const InvestorProjects = () => {
    // Mock implementation of discovery portal
    const [projects] = useState([
        {
            id: 1,
            name: "Sustainable Corn Cooperative",
            location: "Iowa, USA",
            target: "$500,000",
            funded: "65%",
            roi: "14%",
            type: "Equity",
            investors: 12,
            image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=400",
            status: "Funding"
        },
        {
            id: 2,
            name: "Smart Irrigation Expansion",
            location: "Central Valley, CA",
            target: "$1.2M",
            funded: "89%",
            roi: "11%",
            type: "Debt",
            investors: 45,
            image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=400",
            status: "Closing Soon"
        },
        {
            id: 3,
            name: "Organic Soy Export Hub",
            location: "Paraná, Brazil",
            target: "$750,000",
            funded: "30%",
            roi: "18%",
            type: "Revenue Share",
            investors: 8,
            image: "https://images.unsplash.com/photo-1629853909139-44585cb15be2?auto=format&fit=crop&q=80&w=400",
            status: "New"
        }
    ]);

    return (
        <div className="space-y-6 font-display">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search projects, regions, or return profiles..."
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:border-accent dark:focus:ring-accent/20 transition-colors"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <select className="flex-1 md:flex-none border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors">
                        <option>All Risk Profiles</option>
                        <option>Conservative (Debt)</option>
                        <option>Moderate (Revenue)</option>
                        <option>Aggressive (Equity)</option>
                    </select>
                    <Button variant="secondary" className="whitespace-nowrap">More Filters</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md hover:border-primary/50 dark:hover:border-accent/50 transition-all flex flex-col group cursor-pointer overflow-hidden pb-5">
                        <div className="h-48 bg-slate-200 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                            <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-3 right-3 z-20"><StatusBadge status={project.status} /></div>
                            <div className="absolute top-3 left-3 z-20">
                                <span className="inline-flex items-center px-2.5 py-1 rounded bg-black/50 backdrop-blur-md text-white border border-white/20 text-xs font-bold">
                                    {project.type}
                                </span>
                            </div>
                            <h3 className="absolute bottom-4 left-5 text-xl font-bold text-white z-20 drop-shadow-md">{project.name}</h3>
                        </div>

                        <div className="p-5 flex-1 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Target Raise</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{project.target}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Est. ROI</p>
                                    <p className="text-lg font-bold text-primary dark:text-accent mt-0.5">{project.roi}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Funded</span>
                                    <span className="text-slate-900 dark:text-white font-bold">{project.funded}</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary dark:bg-accent rounded-full transition-all duration-1000"
                                        style={{ width: project.funded }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <MapPin className="w-4 h-4 text-slate-400" /> {project.location}
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-white/5 px-2 py-1 rounded-md">
                                    <Users className="w-3.5 h-3.5" /> {project.investors}
                                </div>
                            </div>
                        </div>

                        <div className="px-5 pt-2 mt-auto">
                            <Button className="w-full">Review Prospectus</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
