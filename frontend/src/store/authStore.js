import { create } from 'zustand';
import { api } from '../lib/api';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true, // initial state is loading while checking token

    login: (token, refreshToken, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        set({ user, isAuthenticated: true, isLoading: false });
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        set({ user: null, isAuthenticated: false, isLoading: false });
        // Note: React Router handles redirect based on this store
    },

    checkAuth: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                set({ isAuthenticated: false, isLoading: false });
                return;
            }

            const { data } = await api.get('/api/auth/me');
            set({ user: data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            console.error('Auth verification failed', error);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    }
}));
