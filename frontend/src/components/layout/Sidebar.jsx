import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
    Home, Sprout, TrendingUp, Handshake, Users, PieChart,
    ClipboardList, Search, MessageSquare, Briefcase
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Define navigation items per role
const roleLinks = {
    FARMER: [
        { name: 'Dashboard', path: '/farmer/dashboard', icon: Home },
        { name: 'My Farm', path: '/farmer/farm', icon: Sprout },
        { name: 'AI Pricing', path: '/farmer/pricing', icon: TrendingUp },
        { name: 'Buyer Demands', path: '/farmer/demands', icon: ClipboardList },
        { name: 'Investments', path: '/farmer/investments', icon: Briefcase },
        { name: 'My Deals', path: '/shared/deals', icon: Handshake },
    ],
    BUYER: [
        { name: 'Dashboard', path: '/buyer/dashboard', icon: Home },
        { name: 'Demands', path: '/buyer/demands', icon: ClipboardList },
        { name: 'Marketplace', path: '/buyer/marketplace', icon: Search },
        { name: 'Negotiation', path: '/buyer/negotiation', icon: MessageSquare },
        { name: 'My Deals', path: '/shared/deals', icon: Handshake },
    ],
    INVESTOR: [
        { name: 'Dashboard', path: '/investor/dashboard', icon: Home },
        { name: 'Projects', path: '/investor/projects', icon: Search },
    ],
    ADMIN: [
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Analytics', path: '/admin/analytics', icon: PieChart },
    ]
};

export const Sidebar = () => {
    const { user } = useAuthStore();
    const links = user ? roleLinks[user.role] : [];

    return (
        <aside className="w-64 bg-surface-light dark:bg-surface-dark border-r border-slate-100 dark:border-white/10 h-full flex flex-col">
            <div className="p-4 border-b border-slate-100 dark:border-white/10 h-16 flex items-center justify-center gap-2">
                <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-white">
                    <span className="material-symbols-outlined text-[20px]">agriculture</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">AgriLink<span className="text-primary dark:text-accent">AI</span></span>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) => twMerge(
                                clsx(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm",
                                    isActive
                                        ? "bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent"
                                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                                )
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {link.name}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};
