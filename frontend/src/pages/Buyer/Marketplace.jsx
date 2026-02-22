import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Search, MapPin, Star } from 'lucide-react';
import { buyerService } from '../../services/buyerService';

export const BuyerMarketplace = () => {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const data = await buyerService.getFarmerListings();
                setListings(data.listings || []);
            } catch (error) {
                console.error('Failed to fetch farmer listings', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchListings();
    }, []);

    const handleNegotiate = async (listingId) => {
        // Optimistic UI implementation
        try {
            await buyerService.negotiate({ listingId, offerAmount: 0 }); // Prompt for amount realistically
            alert(`Negotiation started for listing ${listingId}`);
        } catch (error) {
            console.error('Negotiation failed', error);
        }
    };

    if (isLoading) {
        return <div className="p-12 flex justify-center">Loading marketplace...</div>;
    }

    return (
        <div className="space-y-6 font-display">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search crops, farmers, or locations..."
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:border-accent dark:focus:ring-accent/20 transition-colors"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <select className="flex-1 md:flex-none border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors">
                        <option>All Categories</option>
                        <option>Grains</option>
                        <option>Vegetables</option>
                    </select>
                    <Button variant="secondary" className="whitespace-nowrap">Filters</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.length === 0 ? (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 py-12 text-center text-slate-500 bg-surface-light dark:bg-surface-dark rounded-xl border border-dashed border-slate-200 dark:border-white/10">
                        No active crop listings found right now.
                    </div>
                ) : (
                    listings.map((crop) => (
                        <div key={crop.id} className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-100 dark:border-white/5 hover:shadow-md hover:border-primary/50 dark:hover:border-accent/50 transition-all flex flex-col group cursor-pointer overflow-hidden">
                            <div className="h-48 bg-slate-200 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                <img src={crop.image || `https://images.unsplash.com/photo-1574323347407-2cb25a07e857?q=80&w=400&auto=format&fit=crop`} alt={crop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 z-20"><StatusBadge status={crop.status || 'Available'} /></div>
                                <h3 className="absolute bottom-4 left-5 text-xl font-bold text-white z-20 drop-shadow-md">{crop.name}</h3>
                            </div>
                            <div className="p-5 flex-1 space-y-4">
                                <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 dark:bg-accent/10 px-3 py-1 text-xs font-bold text-primary dark:text-accent border border-primary/20 dark:border-accent/20">
                                    {crop.weight || 'N/A'} • {crop.price || 'N/A'}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <MapPin className="w-4 h-4 text-slate-400" /> {crop.location || 'Midwest Region'}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <Star className="w-4 h-4 text-accent fill-current" /> {crop.trustScore || '4.9'} <span className="opacity-70">({crop.reviewsCount || 0} reviews)</span>
                                </div>
                            </div>
                            <div className="p-5 pt-0 mt-auto flex justify-end gap-3">
                                <Button variant="ghost" className="flex-1 h-10 px-0">Details</Button>
                                <Button className="flex-1 h-10 text-sm" onClick={() => handleNegotiate(crop.id)}>Negotiate</Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
