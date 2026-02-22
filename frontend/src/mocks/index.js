export const mockMarketTrends = [
    { name: 'Jan', Wheat: 4000, Rice: 2400, Corn: 2400 },
    { name: 'Feb', Wheat: 3000, Rice: 1398, Corn: 2210 },
    { name: 'Mar', Wheat: 2000, Rice: 9800, Corn: 2290 },
    { name: 'Apr', Wheat: 2780, Rice: 3908, Corn: 2000 },
    { name: 'May', Wheat: 1890, Rice: 4800, Corn: 2181 },
    { name: 'Jun', Wheat: 2390, Rice: 3800, Corn: 2500 },
];

export const mockFarmerCrops = [
    { id: 1, name: 'Premium Wheat', weight: '500 kg', price: '$200/ton', status: 'Active' },
    { id: 2, name: 'Organic Corn', weight: '1000 kg', price: '$150/ton', status: 'Pending' },
    { id: 3, name: 'Basmati Rice', weight: '200 kg', price: '$800/ton', status: 'Confirmed' },
];

export const mockBuyerDemands = [
    { id: 101, crop: 'Soybeans', quantity: '2 Tons', priceOffer: '$400/ton', urgency: 'High' },
    { id: 102, crop: 'Wheat', quantity: '5 Tons', priceOffer: '$190/ton', urgency: 'Medium' },
];

export const mockProjects = [
    { id: 1, title: 'Smart Irrigation Setup', farmer: 'John Doe', goal: '$10,000', funded: '$4,500', roi: '12%', status: 'Active' },
    { id: 2, title: 'Organic Fertilizer Mill', farmer: 'Alice Smith', goal: '$25,000', funded: '$25,000', roi: '15%', status: 'Funded' },
];
