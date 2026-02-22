import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Login } from './pages/Auth/Login';
import { RoleLayout } from './components/layout/RoleLayout';
import { DashboardPlaceholder } from './pages/Placeholders';
import { FarmerDashboard } from './pages/Farmer/Dashboard';
import { BuyerMarketplace } from './pages/Buyer/Marketplace';
import { InvestorDashboard } from './pages/Investor/Dashboard';
import { InvestorProjects } from './pages/Investor/Projects';
import { AdminUserManagement } from './pages/Admin/UserManagement';
import { AdminAnalytics } from './pages/Admin/Analytics';

function App() {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Farmer Routes */}
        <Route path="/farmer" element={<RoleLayout allowedRole="FARMER" />}>
          <Route path="dashboard" element={<FarmerDashboard />} />
          <Route path="farm" element={<DashboardPlaceholder title="My Farm / Inventory" />} />
          <Route path="pricing" element={<DashboardPlaceholder title="AI Pricing Hub" />} />
          <Route path="demands" element={<DashboardPlaceholder title="Buyer Demands" />} />
          <Route path="investments" element={<DashboardPlaceholder title="Investments Hub" />} />
        </Route>

        {/* Buyer Routes */}
        <Route path="/buyer" element={<RoleLayout allowedRole="BUYER" />}>
          <Route path="dashboard" element={<DashboardPlaceholder title="Buyer Dashboard" />} />
          <Route path="demands" element={<DashboardPlaceholder title="Demand Manager" />} />
          <Route path="marketplace" element={<BuyerMarketplace />} />
          <Route path="negotiation" element={<DashboardPlaceholder title="Negotiation Desk" />} />
        </Route>

        {/* Investor Routes */}
        <Route path="/investor" element={<RoleLayout allowedRole="INVESTOR" />}>
          <Route path="dashboard" element={<InvestorDashboard />} />
          <Route path="projects" element={<InvestorProjects />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<RoleLayout allowedRole="ADMIN" />}>
          <Route path="users" element={<AdminUserManagement />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
