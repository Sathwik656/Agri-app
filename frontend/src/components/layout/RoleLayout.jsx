import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

export const RoleLayout = ({ allowedRole }) => {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== allowedRole) {
        return <Navigate to={`/${user.role.toLowerCase()}/dashboard`} replace />;
    }

    return (
        <div className="flex h-screen bg-background-light dark:bg-background-dark overflow-hidden font-display text-slate-900 dark:text-slate-100">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <TopNavbar />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
