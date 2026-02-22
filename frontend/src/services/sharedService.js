import { api } from '../lib/api';

export const sharedService = {
    getLiveDemandSupply: async () => {
        const response = await api.get('/api/market/live-demand-supply');
        return response.data;
    },

    getPriceTrends: async () => {
        const response = await api.get('/api/market/price-trends');
        return response.data;
    },

    match: async (data) => {
        const response = await api.post('/api/matching/match', data);
        return response.data;
    },

    getMyDeals: async () => {
        const response = await api.get('/api/deals/my-deals');
        return response.data;
    },

    confirmDeal: async (dealId) => {
        const response = await api.post(`/api/deals/confirm/${dealId}`);
        return response.data;
    },

    postReview: async (data) => {
        const response = await api.post('/api/reviews', data);
        return response.data;
    },

    getTrustScore: async (farmerId) => {
        const response = await api.get(`/api/reviews/trust-score/${farmerId}`);
        return response.data;
    }
};
