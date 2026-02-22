import { api } from '../lib/api';

export const buyerService = {
    getProfile: async () => {
        const response = await api.get('/api/buyers/profile');
        return response.data;
    },

    createDemand: async (data) => {
        const response = await api.post('/api/buyers/demand', data);
        return response.data;
    },

    getDemands: async () => {
        const response = await api.get('/api/buyers/demands');
        return response.data;
    },

    getFarmerListings: async () => {
        const response = await api.get('/api/buyers/farmer-listings');
        return response.data;
    },

    negotiate: async (data) => {
        const response = await api.post('/api/buyers/negotiate', data);
        return response.data;
    }
};
