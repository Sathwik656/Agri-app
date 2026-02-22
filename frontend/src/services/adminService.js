import { api } from '../lib/api';

export const adminService = {
    getUsers: async () => {
        const response = await api.get('/api/admin/users');
        return response.data;
    },

    getAnalyticsOverview: async () => {
        const response = await api.get('/api/admin/analytics/overview');
        return response.data;
    }
};
