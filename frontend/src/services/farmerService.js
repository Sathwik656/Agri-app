import { api } from '../lib/api';

export const farmerService = {
    getProfile: async () => {
        const response = await api.get('/api/farmers/profile');
        return response.data;
    },

    getCrops: async () => {
        const response = await api.get('/api/farmers/crops');
        return response.data;
    },

    addCrop: async (data) => {
        const response = await api.post('/api/farmers/crop', data);
        return response.data;
    },

    getBuyerDemands: async () => {
        const response = await api.get('/api/farmers/buyer-demands');
        return response.data;
    },

    getRecommendedPrice: async (cropId) => {
        const response = await api.get(`/api/farmers/recommended-price/${cropId}`);
        return response.data;
    }
};
