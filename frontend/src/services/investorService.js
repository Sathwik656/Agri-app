import { api } from '../lib/api';

export const investorService = {
    getProjects: async () => {
        // Wait for endpoint to exist, but mock struct for now
        const response = await api.get('/api/investments/projects');
        return response.data;
    },

    invest: async (projectId, amount) => {
        const response = await api.post(`/api/investments/invest/${projectId}`, { amount });
        return response.data;
    },

    // Actually a Farmer API but related to investment
    createProject: async (data) => {
        const response = await api.post('/api/investments/project', data);
        return response.data;
    }
};
