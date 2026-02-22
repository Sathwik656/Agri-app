import { api } from '../lib/api';

export const marketService = {
    getLiveDemandSupply: async () => {
        const response = await api.get('/api/market/live-demand-supply');
        return response.data;
    },

    getPriceTrends: async () => {
        const response = await api.get('/api/market/price-trends');
        return response.data;
    },

    getMarketSnapshots: async () => {
        const response = await api.get('/api/market/market-snapshots');
        return response.data;
    },

    predictYield: async (data) => {
        const response = await api.post('/api/predictions/yield', data);
        return response.data;
    }
};
