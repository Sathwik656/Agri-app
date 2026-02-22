# Frontend Architecture & UI/UX Prompt Documentation: Agri-App

## 1. Project Overview
This document outlines the frontend architecture and UI/UX design requirements for an Agricultural Trading & Investment platform. The application connects **Farmers**, **Buyers**, **Investors**, and system **Admins**. It incorporates AI-driven insights (yield prediction, price recommendations) and facilitates secure deals, negotiation, and agricultural project funding.

**Primary Goal:** Provide a clear blueprint for the UI/UX design, mapping all visual interfaces to the backend REST APIs.

---

## 2. User Roles & Authentication Flow
The app uses a Role-Based Access Control (RBAC) system. 
**APIs Used:** `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`

*   **Farmer (`FARMER`)**: Can list crops, request AI price recommendations, view buyer demands, negotiate deals, and seek project investments.
*   **Buyer (`BUYER`)**: Can post crop demands, browse farmer listings, negotiate deals, and confirm contracts.
*   **Investor (`INVESTOR`)**: Can browse farmer projects and invest capital.
*   **Admin (`ADMIN`)**: Can manage users and view platform analytics.

---

## 3. Sitemap & Page Structure

### 3.1 Public & Onboarding Pages
*   **Landing Page**: Hero section, features, market trends snapshot, call-to-action (Register).
*   **Auth Pages**: 
    *   Login Screen
    *   Registration Screen (Role selector: Farmer/Buyer/Investor)
    *   Forgot/Change Password (`PATCH /api/auth/change-password`)

### 3.2 Farmer Dashboard & Portal
*   **Overview Dashboard**: Summary of active crops, pending deals, and trust score. (`GET /api/farmers/profile`, `GET /api/reviews/trust-score/:farmerId`)
*   **My Farm/Inventory**:
    *   Add/Edit Land Data (`POST /api/farmers/land`)
    *   List New Crop/Harvest (`POST /api/farmers/crop`)
    *   View My Crops (`GET /api/farmers/crops`)
*   **Market & Pricing (AI Hub)**:
    *   Fetch AI Recommended Price for Crop (`GET /api/farmers/recommended-price/:cropId`)
    *   Market Yield Predictions (`POST /api/predictions/yield`)
*   **Buyer Demands View**: See what buyers are looking for in the area. (`GET /api/farmers/buyer-demands`)
*   **Investments Hub**: Create project proposals for investors to fund. (`POST /api/investments/project`)

### 3.3 Buyer Dashboard & Portal
*   **Overview Dashboard**: Summary of active demands, active negotiations, and confirmed deals. (`GET /api/buyers/profile`)
*   **Demand Manager**:
    *   Create new demand for crops (`POST /api/buyers/demand`)
    *   View all my demands (`GET /api/buyers/demands`)
*   **Marketplace / Farmer Listings**: Browse what farmers are selling. (`GET /api/buyers/farmer-listings`)
*   **Negotiation & Deals Desk**: 
    *   Initiate negotiation with a farmer (`POST /api/buyers/negotiate`)
    *   Accept and confirm deals (`POST /api/deals/confirm/:dealId`)

### 3.4 Shared Market & Deals Features (Both Farmer & Buyer)
*   **Live Market Insights**: Charts and graphs displaying live demand-supply curves and price trends. (`GET /api/market/live-demand-supply`, `GET /api/market/price-trends`, `GET /api/market/market-snapshots`)
*   **Matching Desk**: AI/Algorithm-based matching between Farmer listings and Buyer demands. (`POST /api/matching/match`)
*   **My Deals**: Kanban or list view of ongoing and completed deals. (`GET /api/deals/my-deals`)
*   **Review System**: Post-deal review and rating interface. (`POST /api/reviews`)

### 3.5 Investor Portal
*   **Investor Dashboard**: Portfolio overview and ROI.
*   **Project Discovery**: Browse agricultural projects seeking funding. 
*   **Investment Gateway**: View project details and commit funds. (`POST /api/investments/invest/:projectId`)

### 3.6 Admin Panel
*   **User Management**: Data table of all registered users, roles, and statuses. (`GET /api/admin/users`)
*   **Platform Analytics**: System-wide dashboard showing trade volume, investment volume, and active users. (`GET /api/admin/analytics/overview`)

---

## 4. UI/UX Component Design Prompt

*Use this section directly as a prompt for your UI/UX designer or AI design tool (like v0, Midjourney, Figma AI, or Cursor/Claude prompts).*

**"Design a modern, mobile-responsive web application for an Agricultural Trading & Investment platform. The aesthetic should be trustworthy, earthy yet high-tech (utilizing greens, warm earth tones, and clean white/gray backgrounds). The app has four main unique dashboard views:**

1.  **Global UI Elements:**
    *   Sidebar navigation that dynamically changes based on user role (Farmer, Buyer, Investor, Admin).
    *   Top navigation bar with notifications (deal updates, matches), user profile, and quick 'Post a Request/Listing' button.
    *   Data visualizations: Modern, clean charts (line, bar, scatter) for Market Insights & AI Pricing.

2.  **Farmer Interface Requirements:**
    *   A clean form wizard for 'Add Land' and 'Add Crop'.
    *   An 'AI Price Recommender' component that looks smart (perhaps with a glowing accent color) showing estimated versus market price.
    *   A 'Project Proposal' template UI for requesting investments.

3.  **Buyer Interface Requirements:**
    *   A 'Marketplace' view with robust filtering (by crop, location, price, farmer trust score).
    *   A 'Negotiation Messaging' interface – a chat-like split screen showing the deal terms on one side and chat on the other.

4.  **Investor Interface Requirements:**
    *   A sleek 'Project Feed' showing cards of farms seeking investment, with progress bars for funding goals, expected ROI, and risk metrics.

5.  **State Management & Data Architecture Considerations:**
    *   Use highly responsive tables/grids for listings.
    *   UI states should clearly reflect loading, empty states (e.g., 'No deals currently active'), and error boundaries.
    *   Use optimistic UI updates when users click 'Confirm Deal' or 'Send Negotiation Offer'."

---

## 5. API Integration Mapping

| UI View / Component | Relevant API Endpoint(s) | Expected Behavior / State Management |
| :--- | :--- | :--- |
| **Login / Signup** | `POST /api/auth/login`, `/register`| Store JWT/Session, redirect user based on returned `role`. |
| **Farmer: Demands Feed** | `GET /api/farmers/buyer-demands` | Display list of buyer needs. Empty state if no current demands. |
| **Farmer: Add Crop** | `POST /api/farmers/crop` | Form with crop details. On success, auto-refresh `GET /api/farmers/crops`. |
| **AI Pricing Insights** | `GET /api/market/price-trends`, `GET /api/farmers/recommended-price/:cropId` | Show historical chart + AI projection overlay for specific crop. |
| **Buyer: Marketplace**| `GET /api/buyers/farmer-listings`, `GET /api/reviews/trust-score/:farmerId` | Filterable card grid. Fetch trust score to show star ratings on farmer cards. |
| **Negotiation Flow** | `POST /api/buyers/negotiate`, `POST /api/deals/create` | Interactive quoting interface linking Buyer and Farmer. |
| **Deal Action**| `POST /api/deals/confirm/:dealId` | Status change from 'Pending' to 'Confirmed'. Trigger confetti/success state. |
| **Investor Funding**| `POST /api/investments/invest/:projectId` | Process investment amount, update funding progress bar globally. |
