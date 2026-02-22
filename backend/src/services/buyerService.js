const BuyerProfile = require('../models/BuyerProfile');
const Demand = require('../models/Demand');
const Crop = require('../models/Crop');
const FarmerProfile = require('../models/FarmerProfile');
const Deal = require('../models/Deal');

const User = require('../models/User');

// Profile
const getProfile = async (userId) => {
    let profile = await BuyerProfile.findOne({ user: userId }).populate('user', 'name email location');

    if (!profile) {
        // If no profile exists yet, return basic user info
        const user = await User.findById(userId).select('name email location');
        if (!user) {
            throw new Error('User not found');
        }
        return {
            name: user.name,
            email: user.email,
            state: user.location?.state || '',
            city: user.location?.city || '',
            businessName: '',
            businessType: '',
            phone: '',
            avatar: '',
            createdAt: user.createdAt
        };
    }

    const p = profile.toObject();
    return {
        ...p,
        name: p.user.name,
        email: p.user.email,
        state: p.address?.state || p.user.location?.state || '',
        city: p.address?.city || p.user.location?.city || '',
        businessName: p.companyName || '', // Map companyName to businessName
        businessType: p.buyerType || '',    // Map buyerType to businessType
        phone: '', // Phone not in schema yet
        avatar: '',
        createdAt: p.createdAt || p.user.createdAt
    };
};

const updateProfile = async (userId, data) => {
    // Map frontend fields back to schema fields
    const updateData = {
        companyName: data.businessName,
        buyerType: data.businessType,
        address: {
            state: data.state,
            city: data.city
        }
    };

    const profile = await BuyerProfile.findOneAndUpdate(
        { user: userId },
        { ...updateData, user: userId },
        { new: true, upsert: true }
    ).populate('user', 'name email location');

    const p = profile.toObject();
    return {
        ...p,
        name: p.user.name,
        email: p.user.email,
        state: p.address?.state || p.user.location?.state || '',
        city: p.address?.city || p.user.location?.city || '',
        businessName: p.companyName || '',
        businessType: p.buyerType || '',
        avatar: '',
        createdAt: p.createdAt
    };
};

// Demands
const addDemand = async (userId, demandData) => {
    return await Demand.create({ ...demandData, buyer: userId });
};

const getDemands = async (userId) => {
    return await Demand.find({ buyer: userId });
};

const updateDemand = async (userId, demandId, data) => {
    return await Demand.findOneAndUpdate(
        { _id: demandId, buyer: userId },
        data,
        { new: true }
    );
};

const deleteDemand = async (userId, demandId) => {
    return await Demand.findOneAndDelete({ _id: demandId, buyer: userId });
};

// Discovery
const getFarmerListings = async () => {
    return await Crop.find({ status: { $in: ['PLANTED', 'GROWING', 'HARVESTED'] } })
        .populate('farmer', 'name email')
        .populate('land', 'location');
};

const getQualityGrades = async (farmerId) => {
    // Mock logic based on farmer's past crops or reviews
    // In real app, aggregate review scores
    const profile = await FarmerProfile.findOne({ user: farmerId });
    return {
        farmerId,
        averageRating: profile ? profile.averageRating : 0,
        gradeHistory: ['A', 'A', 'B'] // Mock
    };
};

const negotiate = async (userId, dealData) => {
    // Initiate a deal or negotiation
    // Verify crop exists
    const crop = await Crop.findById(dealData.cropId);
    if (!crop) throw new Error('Crop not found');

    // Create a new Deal entry with status CREATED
    const deal = await Deal.create({
        crop: crop._id,
        buyer: userId,
        seller: crop.farmer,
        pricePerUnit: dealData.price,
        quantity: dealData.quantity,
        totalAmount: dealData.price * dealData.quantity,
        status: 'CREATED',
        negotiationHistory: [{
            sender: userId,
            price: dealData.price,
            message: dealData.message
        }]
    });

    return deal;
};

module.exports = {
    getProfile,
    updateProfile,
    addDemand,
    getDemands,
    updateDemand,
    deleteDemand,
    getFarmerListings,
    getQualityGrades,
    negotiate
};
