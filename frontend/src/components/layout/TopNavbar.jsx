import { useAuthStore } from '../../store/authStore';
import { Bell, UserCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TopNavbar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="h-16 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-100 dark:border-white/10 flex items-center justify-between px-6 sticky top-0 z-50">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                {user?.role.toLowerCase()} Portal
            </h2>
            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full relative transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="flex items-center gap-3 border-l border-slate-200 dark:border-white/10 pl-4">
                    <div className="text-right">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-primary dark:text-accent font-medium">{user?.role}</p>
                    </div>
                    <UserCircle className="w-8 h-8 text-slate-400" />
                </div>

                <button
                    onClick={handleLogout}
                    className="ml-2 p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 rounded-lg transition-colors"
                    title="Logout"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};
