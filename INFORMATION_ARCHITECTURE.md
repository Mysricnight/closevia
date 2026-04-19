# 1.4.2 Information Architecture - CloviaPH

**Product:** CloviaPH - Multi-way Trading & Community Commerce Platform  
**Date:** April 2026  
**Version:** 1.0

---

## Overview

This document structures CloviaPH from a user's perspective, mapping the primary user journeys and information hierarchy. The application supports multiple user types: general users, traders, riders, and administrators.

---

## Main User Flows

### **Flow 1: New User Entrance → Registration → Platform Access**

```
Landing Page (Public)
├── About Section
├── How It Works Section
├── Features Section
├── Contact Section
└── Get Started
    ├─→ Login (existing user)
    │   └─→ Home Feed
    └─→ Register (new user)
        ├─→ Create Account
        ├─→ Verify Email
        └─→ Profile Setup
            └─→ Home Feed
```

**Key Actions:**
- View company information
- Create new account → Email verification → Profile setup
- Login with credentials

---

### **Flow 2: Core Trading Experience**

```
Home Feed (Dashboard Hub)
├── Main Navigation (Sidebar)
│   ├── Home
│   ├── Dashboard
│   ├── Add Product
│   ├── Trades
│   ├── Offers
│   ├── Profile
│   ├── Admin (if admin)
│   ├── Rider (if rider)
│   ├── Settings
│   ├── Notifications
│   └── Logout
│
├─→ Products Discovery
│   ├── Browse Products
│   ├── Search Products
│   ├── Filter & Sort
│   ├── View Product Details
│   │   ├── Images & Description
│   │   ├── Price & Trading Info
│   │   ├── Seller Profile
│   │   ├── Reviews & Ratings
│   │   └── Express Interest / Make Offer
│   └── Save to Wishlist
│
├─→ My Products (Dashboard)
│   ├── View Uploaded Products
│   ├── Edit Product
│   ├── Delete Product
│   └── View Product Stats
│
└─→ Transactions Hub
    ├── Active Trades
    │   ├── Initiate Trade
    │   ├── Message Counterparty
    │   ├── Confirm Trade Details
    │   ├── Select Delivery Method
    │   │   ├── Standard Delivery
    │   ├── Track Trade Progress
    │   └── Complete Trade
    │
    ├── Trades View
    │   ├── Sent Offers
    │   ├── Received Offers
    │   ├── Ongoing Trades
    │   ├── Trade History
    │   └── Multi-way Chains (if available)
    │
    └── Offers Management
        ├── Create Offer
        ├── View Incoming Offers
        ├── Accept / Reject Offers
        ├── Negotiate Terms
        └── Archive Offers
```

---

### **Flow 3: Product Addition & Management**

```
Add Product
├── Step 1: Upload Images
│   └── Add multiple product photos
│
├── Step 2: Product Details
│   ├── Title
│   ├── Description
│   ├── Category
│   ├── Condition (New, Used, Refurbished)
│   ├── Price
│   ├── Trading Preferences
│   │   ├── Allow Buying
│   │   ├── Barter Only
│   │   └── Wanted Categories
│   └── Location
│
├── Step 3: Listing Preferences
│   ├── Trading Rules
│   ├── Delivery Options
│   └── Visibility Settings
│
└── Publish Product
    └── Add to Dashboard / Catalog
```

---

### **Flow 4: User Profile & Account Management**

```
User Profile
├── Public Profile View (for other users)
│   ├── User Information
│   ├── Verified Badge (if applicable)
│   ├── Ratings & Reviews
│   ├── Active Listings
│   ├── Completed Trades
│   └── Contact / Message
│
├─→ My Profile (Personal)
│   ├── Edit Profile Information
│   ├── Upload/Change Profile Picture
│   ├── View Verification Status
│   ├── Settings
│   │   ├── Privacy Settings
│   │   ├── Notification Preferences
│   │   ├── Account Security
│   │   ├── Password Change
│   │   └── Password Recovery Setup
│   │
│   ├── Saved/Wishlist
│   │   └── View Saved Products
│   │
│   ├── Account Preferences
│   │   ├── Theme (Dark/Light)
│   │   ├── Language
│   │   └── Regional Settings
│   │
│   └── Premium Membership
│       ├── View Premium Benefits
│       ├── Upgrade to Premium
│       └── Manage Subscription
```

---

### **Flow 5: Delivery & Logistics**

```
Delivery Options
├── Standard Delivery
│   ├── Select Delivery Method
│   ├── Track Shipment
│   └── Confirm Delivery
│
└── Rider / Express Delivery (Optional)
    ├── Browse Rider Options
    ├── Schedule Pickup
    ├── Track Rider
    └── Confirm Handoff
```

---

### **Flow 6: Rider Role (Special User Type)**

```
User Upgrade Path
└─→ Apply as Rider
    ├── Submit Application
    ├── Verification Process
    └── Approval Status
        └── Rider Dashboard
            ├── View Available Tasks / Batches
            ├── Accept Tasks
            ├── Batch Preview
            ├── Task Stepper
            ├── Delivery Tracking
            ├── Remittance Ledger
            │   └── View Earnings & Payments
            └── Performance Metrics
```

---

### **Flow 7: Organization / Community Management**

```
Organizations
├── Browse Organizations
├── View Organization Profile
│   ├── Organization Details
│   ├── Members
│   ├── Listings
│   └── Reviews
│
└─→ Create Organization
    ├── Organization Setup
    │   ├── Name & Description
    │   ├── Logo / Banner
    │   ├── Contact Info
    │   └── Settings
    └── Manage Organization
        ├── Add Team Members
        ├── View Listings
        └── Organization Dashboard
```

---

### **Flow 8: Dispute Resolution & Trust & Safety**

```
Active Trade
├── Trade Proceeding Normally
│   └── Complete & Rate
│
└─→ Issue Reported
    ├── Dispute Assessment
    │   ├── Issue Type
    │   ├── Evidence Upload
    │   └── Description
    │
    ├── Dispute Status
    │   ├── Under Review
    │   ├── Communication Phase
    │   ├── Resolution Pending
    │   └── Resolved
    │
    └─→ Resolution Outcome
        ├── Resolved (Trade Completed)
        ├── Partial Refund
        ├── Full Refund
        └── Appeal Process
```

---

### **Flow 9: Notifications & Communications**

```
Notifications Hub
├── Real-time Alerts
│   ├── Offer Received
│   ├── Trade Status Update
│   ├── Message Received
│   ├── Review Posted
│   └── System Announcements
│
└─→ Notification Settings
    ├── Email Preferences
    ├── In-App Alerts
    ├── SMS Notifications
    └── Notification Categories
```

---

### **Flow 10: Admin Management Interface**

```
Admin Dashboard (Admin Only)
├── Overview Section
│   ├── KPIs & Metrics
│   ├── System Health
│   └── Quick Stats
│
├── Moderation Section
│   ├── Reported Content
│   ├── User Flagging
│   ├── Content Review
│   ├── Action & Ban Management
│   └── Appeals
│
├── Management Section
│   ├── User Management
│   │   ├── All Users
│   │   ├── Verify Users
│   │   └── Manage Accounts
│   │
│   ├── Rider Management
│   │   ├── Rider Applications
│   │   ├── Rider Profiles
│   │   ├── Verify Applications
│   │   └── Performance Tracking
│   │
│   ├── Product Management
│   │   ├── All Products
│   │   ├── Approve Products
│   │   └── Manage Listings
│   │
│   └── Organization Management
│       ├── Organizations List
│       ├── Verify Organizations
│       └── Manage Teams
│
└── System Section
    ├── Settings
    ├── Category Management
    ├── Premium Tiers
    └── Batch Configuration
```

---

## Information Hierarchy by User Role

### **1. Regular User (Guest/Basic)**
- **Primary Goal:** Discover & Trade Products
- **Key Sections:** Home → Browse → Product Detail → Offer → Trade Tracking
- **Data Access:** Public profiles, active listings, reviews

### **2. Registered User (Trader)**
- **Primary Goal:** Buy, Sell, Trade Products
- **Key Sections:** Dashboard → My Products → Trades & Offers → Profile → Orders
- **Data Access:** Personal dashboard, transaction history, saved items, offers

### **3. Premium User**
- **Primary Goal:** Enhanced Trading with Priority Features
- **Key Sections:** All Trader sections + Premium Dashboard + Priority Support
- **Data Access:** Expanded analytics, priority listings, increased visibility

### **4. Rider**
- **Primary Goal:** Provide Delivery Services & Earn
- **Key Sections:** Rider Dashboard → Available Tasks → Batch Management → Earnings
- **Data Access:** Task queue, deliveries, remittance ledger, performance metrics

### **5. Organization Member**
- **Primary Goal:** Manage Community Trading Activities
- **Key Sections:** Organization Profile → Team Management → Listings → Analytics
- **Data Access:** Organization inventory, team members, group transactions

### **6. Administrator**
- **Primary Goal:** Platform Management & Moderation
- **Key Sections:** Admin Dashboard → Moderation → User Management → System Control
- **Data Access:** Unrestricted access to all platform data, user reports, system health

---

## Key Information Architecture Principles

### **Discoverability**
- **Search & Filter:** Prominent search with advanced filters (category, price, condition, location)
- **Navigation:** Clear sidebar navigation always visible on desktop; collapsible on mobile
- **Breadcrumbs:** Contextual navigation showing user path (Home → Products → Category → Detail)

### **Efficiency**
- **Dashboard Hub:** Central dashboard centralizes all user activities (products, trades, offers)
- **Quick Actions:** Primary actions (Add Product, Make Offer) accessible from multiple locations
- **Shortcuts:** Keyboard shortcuts and mobile gestures for power users

### **Trust & Transparency**
- **Public Profiles:** User reputation, ratings, and transaction history visible
- **Verification Badges:** Clear visual indicators for verified users
- **Dispute Tracking:** Clear documentation of conflict resolution processes

### **Scalability**
- **Multi-Role Support:** Same information architecture adapted for different user types
- **Modular Components:** Reusable components for consistency across views
- **Flexible Organization:** Expandable sections for future features (premium categories, advanced analytics)

---

## Navigation Patterns

### **Primary Navigation (Desktop Sidebar)**
```
┌─────────────────────┐
│   BRAND LOGO        │
├─────────────────────┤
│ 🏠 Home             │
│ 📊 Dashboard        │
│ ➕ Add Product      │
│ 🤝 Trades           │
│ 💌 Offers           │
│ 👤 Profile          │
│ 🚨 Notifications    │
│ ⚙️  Settings        │
│ 🏭 Organizations    │
│ 🏃 Rider (if)       │
│ 👨‍💼 Admin (if)        │
│ 🔒 Logout           │
└─────────────────────┘
```

### **Mobile Navigation**
- **Bottom Tab Bar** (Optional): Home, Dashboard, Add, Trades, Profile
- **Hamburger Menu:** Sidebar drawer with full navigation
- **Header Actions:** Search, notifications, user menu

---

## Data Relationships

```
User
├── Profile Information
├── Products (one-to-many)
│   ├── Images
│   ├── Categories
│   └── Listings
├── Trades (many-to-many)
│   ├── Initiated By
│   └── Assigned To
├── Offers (many-to-many)
│   └── Sent / Received
├── Reviews (received)
├── Ratings (given)
├── Organizations (many-to-many)
└── Rider Profile (optional)
    ├── Tasks
    ├── Batches
    └── Remittance Records
```

---

## Summary

CloviaPH's Information Architecture supports a **multi-sided marketplace** with distinct user journeys:

1. **Casual Browsers** → Public landing → Home feed discovery
2. **Active Traders** → Dashboard hub → product management → offer/trade workflow
3. **Delivery Partners** → Rider portal → task assignment → earning tracking
4. **Community Leaders** → Organization management → team coordination
5. **Platform Stewards** → Admin controls → moderation → system management

The architecture prioritizes **discoverability**, **efficiency**, and **trust** while maintaining flexibility for role-based customization.

---

# 5.3.4 Partner Applications

CloviaPH integrates with the following third-party services to enhance functionality, security, and user experience. These are external platforms that are NOT part of the core product but are essential for platform operations.

## 1. **Xendit** - Payment Processing & Escrow

### Purpose
Handles all financial transactions on the CloviaPH platform, including trade payments, premium subscriptions, and rider remittances.

### Integration Points
- **Trade Payments:** Generates secure checkout URLs for trading transactions
- **Premium Upgrades:** Processes subscription payments for premium features
- **Rider Remittances:** Manages earnings withdrawal for delivery partners
- **Payment Verification:** Syncs payment status via webhooks and manual polling

### Key Features Used
- Invoice generation and management
- Multiple payment method support (e-wallets, credit cards, bank transfers)
- Webhook notifications for real-time payment updates
- Fallback payment sync for offline scenarios

### Configuration
```
XENDIT_SECRET_KEY=xnd_test_your_secret_key_here
XENDIT_WEBHOOK_TOKEN=your_webhook_verification_token_here
```

### Data Flow
```
User initiates payment
    ↓
CloviaPH creates invoice in Xendit
    ↓
User redirected to Xendit checkout page
    ↓
User completes payment on Xendit
    ↓
Webhook notification or manual sync updates CloviaPH
    ↓
Trade/Premium/Remittance status updated
```

### Supported Currencies
- **PHP (Philippine Peso)** - Primary currency

---

## 2. **Cloudinary** - Image Hosting & Optimization

### Purpose
Provides cloud-based image storage, optimization, and delivery for all product images uploaded to the platform.

### Integration Points
- **Product Images:** Stores and serves product photos
- **Profile Pictures:** Hosts user profile avatars
- **Organization Assets:** Manages logos and banners
- **Automatic Optimization:** Compresses and formats images for web delivery

### Key Features Used
- Image upload preset configurations
- Automatic format conversion (WebP for supported browsers)
- Responsive image delivery based on device
- Folder organization by prefix

### Configuration
```
CLOUDINARY_URL=cloudinary://your-cloudinary-url
CLOUDINARY_UPLOAD_PRESET=your-upload-preset
CLOUDINARY_FOLDER_PREFIX=your-folder-prefix
```

### Benefits
- Reduced server storage costs
- Faster image delivery via CDN
- Automatic image optimization
- Version history and backup

---

## 3. **Google Maps API** - Location & Geolocation

### Purpose
Provides mapping, geolocation, and location-based services for product discovery and delivery tracking.

### Integration Points
- **Product Location:** Display where products are located
- **User Location:** Enable location-based search and discovery
- **Delivery Tracking:** Show rider/delivery routes on map
- **Distance Calculation:** Calculate delivery zones and fees
- **Geocoding:** Convert addresses to coordinates

### Key Features Used
- Maps embedding
- Geocoding and reverse geocoding
- Distance matrix calculations
- Place search and autocomplete

### Configuration
```
GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

### Use Cases
- Browse products near user location
- Show delivery coverage areas
- Track rider in real-time
- Suggest delivery zones based on distance

---

## 4. **Google Gemini AI** - Intelligent Product Analysis & Fraud Detection

### Purpose
Provides advanced AI capabilities for product analysis, pricing suggestions, and fraud detection to protect the platform and users.

### Integration Points
- **Product Analysis:** Analyze product images to extract details and verify authenticity
- **Pricing Intelligence:** Suggest competitive pricing based on product condition and category
- **Fraud Detection:** Identify suspicious product listings and user behavior patterns
- **Image Content Verification:** Ensure product images match listings
- **Risk Scoring:** Calculate fraud risk scores for transactions

### Key Features Used
- Image content analysis using vision models
- Natural language processing for enriched product data extraction
- Predictive analytics for fraud risk assessment
- Gemini 1.5 Flash model for fast inference

### Configuration
```
GEMINI_API_KEY=your-gemini-api-key
```

### Use Cases
```
Product Upload:
  - User uploads product images
  - Gemini analyzes image content and metadata
  - System extracts features and verifies legitimacy
  - Fraud risk score calculated
  - Pricing suggestions generated

Fraud Monitoring:
  - Analyze user behavior patterns
  - Flag high-risk transactions
  - Monitor product image authenticity
  - Detect market manipulation
```

### Benefits
- Automated product verification
- Reduced fraudulent listings
- Smarter pricing recommendations
- Enhanced user safety

---

## 5. **Firebase** - Authentication & Identity

### Purpose
Provides secure user authentication, identity verification, and social login capabilities.

### Integration Points
- **Google Sign-In:** Enable users to log in with Google accounts
- **Authentication State Management:** Securely manage user sessions
- **Token Generation:** Generate ID tokens for backend verification
- **User Session Persistence:** Maintain login state across sessions

### Key Features Used
- Google OAuth 2.0 authentication
- Firebase ID token generation
- Client-side auth state management
- Secure credential handling

### Configuration
```
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
```

### Authentication Flow
```
1. User clicks "Google Sign-In"
           ↓
2. Firebase shows Google authentication popup
           ↓
3. User authenticates with Google account
           ↓
4. Firebase returns authentication result
           ↓
5. ID token extracted and sent to CloviaPH backend
           ↓
6. Backend verifies token and creates session
           ↓
7. User logged in to CloviaPH
```

### Benefits
- Secure OAuth 2.0 authentication
- Reduced password fatigue for users
- Social sign-on convenience
- Enterprise-grade security

---

## Partner Application Integration Summary

| Partner | Service | Purpose | Status |
|---------|---------|---------|--------|
| **Xendit** | Payment Processing | Handle all financial transactions | ✅ Active |
| **Cloudinary** | Image Hosting | Store and optimize product images | ✅ Active |
| **Google Maps** | Location Services | Enable location-based features | ✅ Configured |
| **Google Gemini** | AI Analysis | Fraud detection & product intelligence | ✅ Active |
| **Firebase** | Authentication | Secure user identity management | ✅ Active |

---

## Security & Data Privacy Considerations

### API Key Management
- All third-party API keys stored in `.env` files (not in version control)
- Separate keys for development, staging, and production
- Regular key rotation recommended
- Keys never exposed in client-side code (except public Firebase config)

### Data Sharing Policies
- **User Data:** Only essential user information sent to partners (payment data to Xendit, images to Cloudinary)
- **Privacy Compliance:** All partners comply with GDPR, CCPA, and local data protection laws
- **Webhook Security:** Webhook tokens verified before processing
- **Encryption:** All data transmitted via HTTPS/TLS

### Partner Service Level Agreements (SLAs)
- **Xendit:** 99.9% uptime guarantee
- **Cloudinary:** 99.95% uptime guarantee
- **Google Services:** 99.9%+ uptime guarantee
- **Firebase:** 99.95% uptime guarantee

### Fallback & Contingency
- Payment verification via manual sync if webhooks fail
- Local image caching during Cloudinary outages
- Offline transaction processing with later reconciliation
- Alternative authentication flow preparation

---

## Integration Lifecycle

### Setup Phase
1. Configure API credentials in `.env` files
2. Set up webhooks for payment notifications
3. Test integrations in development environment
4. Validate security and data privacy

### Operation Phase
1. Monitor API usage and quotas
2. Handle API errors gracefully
3. Log integration activities
4. Track performance metrics

### Maintenance Phase
1. Update API credentials periodically
2. Monitor service status and incidents
3. Keep library versions updated
4. Review security advisories

---

## Future Partner Considerations

Potential third-party integrations for future phases:
- **SMS Gateway:** For order notifications and OTP (GCash integration)
- **Email Service:** Transactional email delivery (SendGrid, Mailgun)
- **Analytics Platform:** Usage tracking and insights
- **Dispute Resolution API:** Automated dispute handling
- **Compliance Tools:** KYC/AML verification services

---

# 5.3.5 Off-the-Shelf Software

CloviaPH is built on industry-standard, open-source software and commercial platforms. This section documents all third-party libraries, frameworks, hosting services, and commercial software used in the product implementation.

## Backend Services & Infrastructure

### **Aiven MySQL** - Managed Database Hosting ⭐
**Type:** Commercial cloud database service  
**Purpose:** Production and development database hosting  
**Why Used:** Enterprise-grade MySQL hosting with automatic backups, SSL/TLS encryption, and high availability

**Features:**
- Managed MySQL on Aiven infrastructure
- TLS encryption for secure connections
- Automatic backup and disaster recovery
- Connection pooling support
- Performance monitoring and alerting
- Compliance-ready infrastructure

**Configuration:**
```
DB_HOST: mysql-XXXXX.aivencloud.com
DB_PORT: 27138 (standard Aiven port)
DB_CA_CERT: ca.pem (for SSL/TLS verification)
DB_CONNECTION: SSL/TLS encrypted via custom certificate
```

---

## Backend Stack (Go)

### **Go 1.24+** - Programming Language
**Type:** Open-source compiled language  
**Purpose:** High-performance backend server  
**Why Used:** Fast execution, built-in concurrency, standard library, excellent for APIs

---

### **Fiber v2** - Web Framework
**Import:** `github.com/gofiber/fiber/v2`  
**Type:** Open-source web framework  
**Purpose:** HTTP routing, middleware, request/response handling  
**Why Used:** Lightweight, fast, Express-like API, excellent performance at scale

**Key Uses:**
- Route handlers for REST API endpoints
- Middleware for authentication and validation
- Error handling and CORS support
- Built-in request parsing and validation

---

### **Go-SQL-Driver for MySQL** - Database Driver
**Import:** `github.com/go-sql-driver/mysql`  
**Type:** Open-source database driver  
**Purpose:** Native MySQL protocol implementation  
**Why Used:** Standard Go MySQL driver, well-maintained, production-tested

**Features:**
- Native MySQL protocol support
- SSL/TLS connection support
- Connection pooling
- Prepared statements for security

---

### **JWT v5** - JSON Web Tokens
**Import:** `github.com/golang-jwt/jwt/v5`  
**Type:** Open-source authentication library  
**Purpose:** Secure token generation and validation  
**Why Used:** Industry standard for stateless authentication

**Uses:**
- User session tokens
- API authorization
- Secure credential exchange
- Role-based access control (RBAC)

---

### **Go Crypto** - Cryptography
**Import:** `golang.org/x/crypto`  
**Type:** Open-source cryptography library  
**Purpose:** Password hashing and encryption  
**Why Used:** Part of Go's standard tooling, cryptographically secure

**Uses:**
- Password hashing (bcrypt)
- Secure random token generation
- Encryption for sensitive data

---

### **Google UUID** - Unique Identifiers
**Import:** `github.com/google/uuid`  
**Type:** Open-source UUID generator  
**Purpose:** Generate globally unique identifiers  
**Why Used:** Industry standard for distributed unique IDs

---

### **Xendit Go SDK** - Payment Processing
**Import:** `github.com/xendit/xendit-go/v3`  
**Type:** Open-source official SDK  
**Purpose:** Integration with Xendit payment API  
**Why Used:** Official client library, fully typed, well-maintained

---

### **Cloudinary Go SDK** - Image Management
**Import:** `github.com/cloudinary/cloudinary-go/v2`  
**Type:** Open-source official SDK  
**Purpose:** Upload, transform, and deliver images  
**Why Used:** Official library, comprehensive feature set, production-ready

---

### **GoDotenv** - Environment Configuration
**Import:** `github.com/joho/godotenv`  
**Type:** Open-source configuration loader  
**Purpose:** Load `.env` environment variables  
**Why Used:** Standard solution for 12-factor app configuration

---

## Frontend Stack (React/TypeScript)

### **React 18.3+** - UI Framework
**Package:** `react`, `react-dom`  
**Type:** Open-source library  
**Purpose:** Component-based UI rendering and state management  
**Why Used:** Industry standard, large ecosystem, excellent performance

---

### **React Router v6** - Navigation
**Package:** `react-router-dom`  
**Type:** Open-source routing library  
**Purpose:** Client-side routing and navigation  
**Why Used:** Standard React routing solution, declarative routing

---

### **Chakra UI** - Component Library
**Package:** `@chakra-ui/react`, `@chakra-ui/icons`  
**Type:** Open-source component library  
**Purpose:** Pre-built accessible UI components  
**Why Used:** 
- Accessible by default
- Built-in dark mode support
- Consistent design system
- Excellent TypeScript support

**Components Used:**
- Buttons, Forms, Modals
- Navigation components (Sidebar, Tabs)
- Layout utilities (Box, Flex, Grid)
- Toast notifications
- Color mode (dark/light theme)

---

### **Emotion** - CSS-in-JS
**Package:** `@emotion/react`, `@emotion/styled`  
**Type:** Open-source styling library  
**Purpose:** Component-scoped CSS styling  
**Why Used:** Powers Chakra UI, enables dynamic styling

---

### **Framer Motion** - Animation Library
**Package:** `framer-motion`  
**Type:** Open-source animation tool  
**Purpose:** Smooth transitions and animations  
**Why Used:** 
- Page transitions
- Modal animations
- Scroll effects
- Gesture-based animations

---

### **React Query (TanStack Query)** - Data Fetching
**Package:** `@tanstack/react-query`  
**Type:** Open-source data management library  
**Purpose:** Caching, synchronization, and server state management  
**Why Used:**
- Automatic request caching
- Real-time synchronization
- Background refetching
- Reduces network requests

**Uses:**
- Dashboard data fetching
- Product listing caching
- Offer management
- Trade history

---

### **Axios** - HTTP Client
**Package:** `axios`  
**Type:** Open-source HTTP library  
**Purpose:** Make API requests to backend  
**Why Used:** Request/response interceptors, timeout handling, consistent API

---

### **React Icons** - Icon Library
**Package:** `react-icons`  
**Type:** Open-source icon set  
**Purpose:** Consistent icons throughout UI  
**Why Used:** FontAwesome, Feather icons built-in, easy to use

---

### **Leaflet & React Leaflet** - Mapping
**Package:** `leaflet`, `react-leaflet`  
**Type:** Open-source mapping library  
**Purpose:** Interactive maps for location-based features  
**Why Used:**
- Lightweight
- OpenStreetMap integration
- React component wrapper
- Location search and display

---

### **Recharts** - Data Visualization
**Package:** `recharts`  
**Type:** Open-source charting library  
**Purpose:** Display analytics and statistics  
**Why Used:**
- React component-based
- Responsive by default
- Multiple chart types
- Accessible

**Uses:**
- Dashboard analytics
- Trade statistics
- Performance metrics

---

### **JSPDF & jsPDF AutoTable** - PDF Generation
**Package:** `jspdf`, `jspdf-autotable`  
**Type:** Open-source PDF library  
**Purpose:** Generate PDF documents client-side  
**Why Used:** No server-side PDF generation needed, export data to PDF

**Uses:**
- Invoice generation
- Trade receipt export
- Report generation

---

### **Docx** - Word Document Generation
**Package:** `docx`  
**Type:** Open-source document library  
**Purpose:** Generate DOCX files programmatically  
**Why Used:** Export trade details to Word documents

---

### **XLSX** - Spreadsheet Handling
**Package:** `xlsx`  
**Type:** Open-source spreadsheet library  
**Purpose:** Parse, generate, and manipulate Excel files  
**Why Used:** Bulk data import/export, financial records

---

### **File Saver** - Local File Export
**Package:** `file-saver`  
**Type:** Open-source utility  
**Purpose:** Save files to user's computer from browser  
**Why Used:** Download exports (PDF, Excel, Word documents)

---

### **Vite** - Build Tool
**Package:** `vite`, `@vitejs/plugin-react`  
**Type:** Open-source build tool  
**Purpose:** Fast development server and production bundler  
**Why Used:**
- Blazing fast development experience
- Optimized production builds
- Native ES modules support
- Hot module replacement (HMR)

---

### **Vite PWA Plugin** - Progressive Web App
**Package:** `vite-plugin-pwa`  
**Type:** Open-source PWA plugin  
**Purpose:** Convert web app to installable PWA  
**Why Used:**
- Offline support
- Installable on mobile
- Push notifications support
- App-like experience

---

### **Embla Carousel** - Image Carousel
**Package:** `embla-carousel-react`  
**Type:** Open-source carousel library  
**Purpose:** Swipeable image galleries  
**Why Used:**
- Lightweight
- Touch gestures
- Responsive
- Mobile-first

---

### **TypeScript** - Type System
**Package:** `typescript`  
**Type:** Open-source language superset  
**Purpose:** Static type checking for JavaScript  
**Why Used:**
- Catches errors at compile time
- Better IDE support
- Self-documenting code
- Easier refactoring

---

### **Expo** (for Mobile) - React Native Framework
**Package:** `expo`  
**Type:** Commercial open-source platform  
**Purpose:** Build iOS/Android apps from React code  
**Why Used:**
- Write once, run on iOS/Android/Web
- Managed backend compilation
- Over-the-air updates
- Large component ecosystem

---

### **React Native** - Mobile Framework
**Package:** `react-native`, `react-native-web`  
**Type:** Open-source framework  
**Purpose:** Native mobile app development  
**Why Used:** Code sharing between web and mobile

---

### **React Native Paper** - Mobile Components
**Package:** `react-native-paper`  
**Type:** Open-source Material Design components  
**Purpose:** Consistent UI components for mobile  
**Why Used:** Material Design implementation, accessible

---

### **React Navigation** - Mobile Navigation
**Package:** `@react-navigation/native`  
**Type:** Open-source navigation library  
**Purpose:** Tab and stack navigation for mobile  
**Why Used:** Standard React Native navigation solution

---

### **Reanimated** - Mobile Animations
**Package:** `react-native-reanimated`  
**Type:** Open-source animation library  
**Purpose:** Smooth animations on mobile  
**Why Used:** High-performance, gesture-driven animations

---

### **Async Storage** - Mobile Data Persistence
**Package:** `@react-native-async-storage/async-storage`  
**Type:** Open-source local storage  
**Purpose:** Store user data on device  
**Why Used:** Simple key-value storage for mobile

---

### **Expo Image Picker** - Mobile Camera
**Package:** `expo-image-picker`  
**Type:** Open-source camera integration  
**Purpose:** Take photos and select from gallery  
**Why Used:** Unified camera API across iOS/Android

---

### **Expo Notifications** - Push Notifications
**Package:** `expo-notifications`  
**Type:** Open-source notification library  
**Purpose:** Send and receive push notifications  
**Why Used:** Unified push notification API

---

### **Expo Router** - File-Based Routing
**Package:** `expo-router`  
**Type:** Open-source routing library  
**Purpose:** Native file-based routing for mobile  
**Why Used:** Similar to Next.js, folder-based routing

---

### **ESLint** - Code Linting
**Package:** `eslint`  
**Type:** Open-source linter  
**Purpose:** Enforce code quality standards  
**Why Used:** Find bugs and style issues before runtime

---

### **LightningCSS** - CSS Processing
**Package:** `lightningcss`  
**Type:** Open-source CSS tool  
**Purpose:** High-performance CSS processing  
**Why Used:** Faster CSS compilation than PostCSS

---

### **Sharp** - Image Optimization
**Package:** `sharp`  
**Type:** Open-source image library  
**Purpose:** Resize, compress, optimize images  
**Why Used:** Build-time image optimization for production

---

## Development & DevOps Tools

### **Netlify** - Hosting & Deployment
**Type:** Commercial platform  
**Purpose:** Front-end hosting with CI/CD  
**Why Used:**
- Automatic deployments from Git
- Global CDN
- Built-in SSL/TLS
- Form handling
- Serverless functions support

---

### **Render** - Backend Hosting (Alternative)
**Type:** Commercial platform  
**Purpose:** Host Go backend server  
**Why Used:**
- Easy Go deployment
- Auto-scaling
- Built-in SSL
- Environment variables management
- Web hooks support

---

## Deployment & Monitoring

### **EAS Build** (Expo Application Services)
**Type:** Commercial service  
**Purpose:** Cloud building for iOS/Android apps  
**Why Used:**
- No need for local build machines
- Automatic signing
- Distributed builds
- Version management

---

## Software Stack Summary Table

| Layer | Technology | Type | Purpose |
|-------|-----------|------|---------|
| **Infrastructure** | Aiven MySQL | Commercial | Managed Database |
| **Backend** | Go 1.24+ | Open-source | Server Language |
| **Backend** | Fiber v2 | Open-source | Web Framework |
| **Backend** | JWT v5 | Open-source | Authentication |
| **Database** | MySQL Driver | Open-source | DB Connection |
| **Frontend** | React 18 | Open-source | UI Framework |
| **Frontend** | TypeScript | Open-source | Type Safety |
| **Frontend** | Chakra UI | Open-source | Components |
| **Frontend** | React Query | Open-source | Data Fetching |
| **Frontend** | Vite | Open-source | Build Tool |
| **Frontend** | Leaflet | Open-source | Mapping |
| **Mobile** | React Native | Open-source | Mobile Framework |
| **Mobile** | Expo | Commercial | Build Platform |
| **Deployment** | Netlify | Commercial | Frontend Hosting |
| **Deployment** | EAS Build | Commercial | Mobile Build |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (React)                      │
│  ┌──────────────────┬──────────────────┬─────────────────┐  │
│  │   React 18       │   Chakra UI      │   React Query   │  │
│  │   TypeScript     │   Framer Motion  │   Axios         │  │
│  │   React Router   │   Leaflet Maps   │   Vite          │  │
│  └──────────────────┴──────────────────┴─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕
                         (Axios HTTP)
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                  API LAYER (Go + Fiber)                      │
│  ┌──────────────────┬──────────────────┬─────────────────┐  │
│  │   Go 1.24+       │   Fiber v2       │   JWT Auth      │  │
│  │   Cloudinary SDK │   Xendit SDK     │   Go Crypto     │  │
│  └──────────────────┴──────────────────┴─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕
                        (MySQL Protocol)
                              ↕
┌─────────────────────────────────────────────────────────────┐
│              DATABASE LAYER (Aiven MySQL)                    │
│  ┌──────────────────┬──────────────────┬─────────────────┐  │
│  │   MySQL 8.0+     │   TLS/SSL        │   Connection    │  │
│  │   Automatic      │   Encryption     │   Pooling       │  │
│  │   Backups        │   SSL Certs      │   Monitoring    │  │
│  └──────────────────┴──────────────────┴─────────────────┘  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              MOBILE LAYER (React Native)                     │
│  ┌──────────────────┬──────────────────┬─────────────────┐  │
│  │   React Native   │   Expo Platform  │   Expo Router   │  │
│  │   React Nav      │   EAS Build      │   Reanimated    │  │
│  │   Paper UI       │   Async Storage  │   Notifications │  │
│  └──────────────────┴──────────────────┴─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Rationale

### Why Go for Backend?
- **Performance:** Compiled language, fast execution
- **Concurrency:** Built-in goroutines for handling 50+ concurrent users
- **Simplicity:** Single binary deployment, no runtime dependencies
- **Standards:** Strong typing, clear error handling

### Why React for Frontend?
- **Component Reusability:** Build once, use across web
- **Large Ecosystem:** Vast library selection (Query, Router, UI)
- **Developer Experience:** Hot reload, excellent tooling
- **Performance:** Virtual DOM, efficient rendering

### Why TypeScript?
- **Type Safety:** Catch errors at compile time
- **Self-Documenting:** Types serve as inline documentation
- **Better IDE Support:** Autocomplete and refactoring
- **Scalability:** Easier to maintain large codebases

### Why Aiven MySQL?
- **Managed Service:** No operations overhead
- **Security:** Built-in SSL/TLS, automatic backups
- **Compliance:** SOC2, GDPR compliant
- **Reliability:** 99.95% uptime SLA

### Why Chakra UI?
- **Accessibility:** WCAG 2.1 AA compliant by default
- **Dark Mode:** Built-in theme switching
- **Responsive:** Mobile-first design system
- **Composable:** Easy to build custom components

---

## Open Source Licensing

All open-source dependencies used in CloviaPH comply with permissive licenses:
- **MIT:** React, Vite, Fiber, JWT, UUID, and most utilities
- **Apache 2.0:** Chakra UI, Leaflet, ECharts
- **BSD:** Framer Motion, React Navigation, GraphQL-tools
- **ISC:** Various CLI tools

The application itself is available under its own license agreement.

---

## Future Software Considerations

Potential future additions:
- **GraphQL:** For more efficient data fetching
- **Redis:** For caching and real-time features
- **Kubernetes:** For advanced deployment orchestration
- **Prometheus Grafana:** For enhanced monitoring
- **ElasticSearch:** For advanced search capabilities
- **Stripe:** As alternative payment processor
- **SendGrid:** For transactional emails

---

# 5.4 Naming Conventions and Terminologies

This section provides a comprehensive glossary of all key terms, acronyms, roles, features, and domain-specific language used by stakeholders throughout the CloviaPH platform. Consistent terminology ensures clear communication among users, developers, administrators, and support teams.

## User Roles & Account Types

### **Trader**
A registered user who actively participates in buying, selling, or exchanging products on the platform. Traders can send and receive trade offers, manage listings, and complete transactions.

### **Buyer**
A trader initiating a transaction to acquire a product. In trade terminology, the buyer offers something (cash, items, or both) to receive the seller's **target product**.

### **Seller**
A trader who owns the **target product** being offered for trade. The seller reviews and accepts/rejects offers from buyers.

### **Verified User / Verified Badge ✓**
A user whose identity has been confirmed by CloviaPH. Verification involves email confirmation, phone verification, or admin review. Verified users display a checkmark badge on their profile.

### **Premium User / Premium Member**
A user with an active paid subscription (Premium Plus or Pro tier) unlocking advanced features like multi-way trading, express delivery, enhanced analytics, and priority support.

### **Rider**
A verified user who provides delivery services as an independent contractor. Riders transport items between buyers and sellers, collect cash (COD), claim batches, and earn commissions.

### **Rider State**
The current status of a rider's account, with values:
- **NOT_APPLIED:** User has not applied to become a rider
- **PENDING_APPROVAL:** Application submitted, awaiting admin review
- **REJECTED:** Application denied (may reapply after 30 days)
- **READY:** Approved and can claim deliveries
- **WORKING:** Currently executing a delivery/batch
- **LOCKED:** Account locked due to unpaid remittance ≥ threshold

### **Administrator / Admin**
A staff member with elevated privileges to manage users, moderate disputes, review rider applications, and configure platform settings.

### **Moderator**
A user with limited admin privileges focused on content moderation, dispute escalation, and safety checks.

### **Organization**
A collective entity (business, community group, charity) that can post products and coordinate trades among members. Organizations have an **organization handle** (unique URL identifier).

### **Organization Member**
A registered user enrolled in an organization who can post products to the org's trade feed and participate in organizational trading.

## Product & Listing Terminology

### **Product / Listing**
An item uploaded by a seller describing something available for trade or purchase. Each product has title, description, images, condition, category, and price.

### **Product Condition**
The state of a product, with standard classifications:
- **New:** Unopened, sealed, never used
- **Like-New:** Used minimally, no visible defects
- **Good:** Used, minor wear/scratches
- **Fair:** Used with noticeable wear
- **Poor:** Heavily used but functional

### **Active Listing**
A product currently visible on the marketplace with status "available."

### **Premium Listing / Featured**
A product promoted by paying a boost fee, appearing higher in search results and designated with a "Premium" badge. Premium listings get increased visibility for 3 hours.

### **Barter-Only**
A product listed exclusively for trade exchanges (no cash purchase allowed).

### **Allow Buying**
A product setting permitting direct cash purchase in addition to trade offers.

### **Wants / Wanted Categories**
Specific product types or categories a seller is seeking in exchange. Used for smart matching recommendations.

### **Target Product**
The specific product a buyer is interested in acquiring through a trade proposal.

## Trading & Transaction Terminology

### **Trade / Trade Proposal**
A formal offer from a buyer to a seller, proposing exchange of items, cash, or both. Trades progress through status stages: **pending** → **accepted** → **active** → **completed**.

### **Trade Status**
The current state of a trade:
- **Pending:** Newly created, awaiting seller response
- **Accepted:** Seller agreed to the trade terms
- **Declined:** Seller rejected the offer
- **Countered:** Seller proposed modified terms
- **Active:** Both parties confirmed and ready to execute
- **Awaiting Confirmation:** Awaiting final meetup/delivery confirmation
- **Completed:** Trade successfully finished
- **Auto_Completed:** System automatically marked complete
- **Cancelled:** Trade was cancelled by either party
- **Expired:** Offer expired without response

### **Direct Proposal / Single Trade**
A straightforward two-party trade where Buyer wants Seller's product and offers items/cash in return. No intermediaries involved.

### **Multi-Way Trade / 3-Way Trading**
An extended chain of trades involving 3+ participants where items flow in sequence: A → B → C → (back to A). Solves deadlock situations when direct proposals are declined.

**Example:**
- User A wants User B's headphones but B declines
- System finds User C who wants A's phone and has a blender
- System finds User A's desired headphones available from B
- Result: A → phones to B, B → headphones to A, C → blender to someone who wants it

### **Trade Loop / Loop**
The complete chain structure of a multi-way trade showing all participants and item flows. Represented graphically as connected nodes.

### **Convert to Multi-Way**
When a buyer's direct proposal is declined, they can request the system automatically search for a multi-way trading solution.

### **Trade Edge**
A single directional connection in a trade loop showing one participant trading to another (e.g., "A trades to B").

### **Hop Into a Loop**
An action where a trader sees an existing multi-way trade opportunity and accepts to participate, accepting their assigned position in the loop.

### **Trade Option**
The delivery/meeting method for executing the trade:
- **Meetup (📍):** Both parties meet in person to exchange items
- **Delivery (🚚):** Items shipped via rider/delivery service

### **Meetup Location**
The physical address where both parties meet to execute a **meetup** trade. Agreed upon during trade negotiation.

### **Delivery Address**
The physical address where items should be delivered for a **delivery** trade. Provided by the receiving party.

### **Trade Item**
An individual product offered within a trade. A single trade can include multiple items from each party.

### **Trade Completion**
The final stage where both buyer and seller confirm items received in satisfactory condition. Each party marks themselves as "completed" triggering automatic trade finalization.

### **Meetup Confirmed**
Both parties have agreed on time, location, and confirmed they will attend the meetup to exchange.

### **Met / Buyer Met / Seller Met**
Boolean flags confirming each party physically appeared at the agreed meetup location.

### **No-Show**
A party who committed to a meetup but did not appear at the scheduled time/location. Results in a strike against their account.

## Payment & Delivery Terminology

### **Cash on Delivery / COD**
Payment method where the buyer/recipient pays the rider in cash upon delivery. The rider then remits the cash to the platform.

### **Upfront Payment**
Payment method where the buyer completes payment before trade execution (typically for meetups).

### **Online Payment**
Payment processed through Xendit using credit cards, e-wallets, or bank transfer. Available for trades, premium subscriptions, and remittances.

### **Escrow / Payment Escrow**
A secured payment system where funds are held by the platform until trade completion, protecting both parties.

### **Standard Delivery**
Budget delivery option with standard transit time. Charged at ₱50 per delivery.

### **Express Delivery**
Premium delivery option with faster transit time, guaranteed delivery within specified window. Premium feature costing ₱150. Only available to Premium members.

### **Delivery Type / Delivery Option**
The class of delivery service selected (Standard, Express, or Meetup).

### **Delivery Status**
The current state of a delivery:
- **Pending:** Delivery created, awaiting rider assignment
- **Claimed:** Rider has claimed the delivery
- **Picked Up:** Rider collected items from sender
- **In Transit:** items actively being transported
- **Delivered:** Items received by recipient
- **Cancelled:** Delivery cancelled

### **Rider / Delivery Partner**
See **Rider** definition above.

### **Batch / Delivery Batch**
A collection of multiple deliveries grouped and optimized together by a rider for efficiency (geographic proximity, sequential routing).

### **Anchor Delivery**
The primary/initial delivery in a batch that defines the batch's geographic area. Other add-on deliveries must be nearby to be included.

### **Add-On Delivery / Addon**
Additional deliveries bundled with an anchor delivery in the same batch, traveling similar routes for efficiency.

### **Batch Slot**
A capacity unit. Each rider gets 3 free slots per cycle. 1 slot = 1 delivery pair (can be anchor or add-on).

### **Slot Ledger / Rider Ledger**
A tracking record of rider's available slots, collected cash, and remittance owed.

### **Remittance**
Payment owed by a rider to the platform consisting of:
- 15% commission charged to each delivery
- Cash collected (COD) minus rider commission

### **Remittance Lock / Remittance Threshold**
When a rider's remittance owed reaches ₱50 or higher, their account is locked and they cannot claim new deliveries until remittance is verified/paid.

### **Remittance Owed / Cash to Remit**
Total amount of money a rider must pay to the platform before unlocking their account.

### **Remittance Verification**
Admin review and approval of a rider's remittance payment before crediting account as paid and unlocking slots.

### **Commission**
Fee charged per transaction:
- **Clovia Commission:** 15% of delivery fee
- **Rider Commission:** The remainder after Clovia's 15%
- **Customer Pair Split:** Additional split between buyer/seller pairs for add-on deliveries

### **Take-Home Pay / Net Earnings**
Amount a rider receives after all commissions and fees: Rider Commission - System Fees.

## Premium Features & Subscriptions

### **Free Tier**
No-cost account with base features:
- Up to 10 active listings
- Standard delivery only
- Basic profile visibility
- Community support

### **Premium Plus / Plus Tier**
Mid-level subscription (₱79/month or ₱699/year):
- Unlimited listings
- Multi-way trading access
- Trade dispute priority
- Enhanced analytics (popularity data)
- Data-backed AI pricing confidence
- Personalized Plus badge

### **Premium Pro / Pro Tier**
High-level subscription (₱120/month or ₱1,099/year):
- All Plus features
- Personal Alegre Store page
- Express delivery access
- Full trade analytics
- Market data integration
- Verified Pro badge
- Homepage feature

### **Alegre Store / Store Page**
Personalized branded storefront for Pro members showcasing all their listings with custom branding and URL.

### **Premium Badge**
Visual indicator on user profile showing subscription tier (Plus badge, Pro badge).

### **Boost / Listing Boost**
Feature allowing sellers to temporarily promote a listing (appears at top of feed for 3 hours). Premium-only feature costing credits or subscription.

### **Multi-Way Trading**
Advanced feature enabling 3+ participant trade chains. Now available to all users, with enhanced features for Premium members.

### **Trade Dispute Priority**
Premium members receive faster resolution for disputed trades (48-hour response vs standard SLA).

## Dispute & Trust & Safety Terminology

### **Dispute / Trade Dispute**
A formal complaint raised by one party about a trade execution, item condition, or non-delivery. Managed through Trust & Safety system.

### **Dispute Type**
Category of complaint:
- **Item Condition:** Received item doesn't match description/photos
- **No Show:** Party didn't appear at meetup
- **Non-Delivery:** Items never arrived
- **Wrong Items:** Received different items than agreed
- **Fraud / Counterfeit:** Items are fake/stolen
- **No Response:** Counterparty unresponsive for 48+ hours
- **Other:** Miscellaneous issues

### **Strike / Account Strike**
Penalty system tracking user violations:
- 1 strike: Warning shown on profile (30 days)
- 2 strikes: Cannot post new trades (30 days duration)
- 3 strikes: Auto-account suspension pending admin review

### **Strike Duration**
How long a strike remains on a user's record (typically 30 days from incident date).

### **Strike History**
Complete log of all strikes issued to a user with dates, reasons, and resolution.

### **Suspension**
Temporary or permanent account lock preventing user from trading, posting, or messaging. Typically triggered at 3+ strikes.

### **Account Suspension**
Temporary lock (typically 7-30 days) following serious violations, pending admin review.

### **Permanent Ban**
Permanent account termination from platform following repeated violations or severe misconduct.

### **Escalation**
Promotion of a low-level dispute to higher admin tier for specialized review (e.g., from moderator to dispute admin).

### **Escalation Queue**
Queue of disputes awaiting higher-level admin review and resolution.

### **Reporting / Flag**
User action submitting a dispute or safety concern about a trade, user, or product.

### **Trust Score / Response Rating**
Aggregate of a user's reliability:
- **Excellent:** 90-100% successful trades
- **Good:** 75-89% successful trades
- **Average:** 60-74% successful trades
- **Poor:** <60% successful trades

### **Verified Badge ✓**
Visual indicator showing user has passed identity verification, signaling trustworthiness.

### **Appeal / Dispute Appeal**
User's formal request to contest an admin decision on a strike, suspension, or dispute resolution.

## AI & Fraud Detection Features

### **Auto Appraisal / AI Price Appraisal**
Automated AI system (Gemini) analyzing product images and metadata to suggest fair market price ranges.

### **AI Price Confidence**
Confidence level (%), in suggested pricing:
- **Range only (Free):** General price range with low confidence
- **Data-backed (Plus):** AI-backed pricing with historical data
- **Market data (Pro):** Advanced pricing with market-wide data integration

### **Product Analysis / Image Analysis**
Gemini AI examining product photos to extract details, verify authenticity, and identify potential counterfeits.

### **Fraud Detection / Fraud Risk Score**
Automated system calculating fraud risk (0-100%) based on:
- Product authenticity analysis
- Seller history and patterns
- Unusual pricing indicators
- Image metadata anomalies

### **Counterfeit Flag / Counterfeit Report**
System or user flagging suspected fake/fraudulent items for admin review.

### **Authenticity Verification**
Admin process confirming whether flagged items are genuine or fraudulent.

## Analytics & Performance Terminology

### **Profile Views / Visitor Tracking**
- **Free:** Total view count only
- **Plus:** View count with visitor usernames
- **Pro:** Complete history with timestamps and repeat visitor tracking

### **Trade Analytics**
Performance metrics showing:
- Number of completed trades
- Average trade value
- Trade success rate
- Popular product categories
- Response time to offers

### **Popularity Data**
Metrics on listing popularity:
- View count
- Saves/wishlists
- Offer count
- Days to first offer

### **Response Score / Response Metrics**
How quickly a user responds to messages/offers (0-100 score).

### **Response Rating**
See **Trust Score** above.

## Abbreviations & Acronyms

| Acronym | Full Term | Meaning |
|---------|-----------|---------|
| **COD** | Cash on Delivery | Payment collected by rider upon item delivery |
| **PWA** | Progressive Web App | Web app installable on devices like native app |
| **API** | Application Programming Interface | Standardized protocol for backend/frontend communication |
| **JWT** | JSON Web Token | Secure authentication token format |
| **TLS/SSL** | Transport Layer Security | Encryption protocol for secure data transmission |
| **RBAC** | Role-Based Access Control | Permission system based on user roles (admin, moderator, etc.) |
| **SLA** | Service Level Agreement | Promised response/resolution time commitment (e.g., 48 hours) |
| **GDPR** | General Data Protection Regulation | EU data protection requirement |
| **CCPA** | California Consumer Privacy Act | US state privacy law |
| **KYC** | Know Your Customer | Identity verification for users |
| **AML** | Anti-Money Laundering | Compliance checks for suspicious transactions |

## Database & Technical Terminology

### **Database Schema / Database Tables**
The underlying structure defining how user data, products, trades, and deliveries are organized and related.

### **Relationship / Foreign Key**
Link between database tables (e.g., products linked to users via seller_id).

### **Migration**
SQL script applying schema changes (adding columns, creating tables, indexes).

### **Index / Database Index**
Optimization structure enabling fast queries on frequently searched fields (e.g., email, status).

## Geographic & Location Terminology

### **Location**
Address or GPS coordinates where a user is based or where an item is located.

### **Proximity / Distance**
Measurement of how far apart two locations are (in km or miles).

### **Geolocation / Location-Based Search**
Finding products/users near the current user's location.

### **Route Optimization / Geographic Optimization**
Algorithm determining most efficient delivery order for batch, minimizing detours.

### **Haversine Formula**
Mathematical formula calculating accurate distance between two GPS coordinates.

### **Delivery Zone / Service Area**
Geographic region where delivery services are available.

## Search & Filter Terminology

### **Smart Search / Intelligent Search**
Advanced search using AI to understand intent and context beyond exact keywords.

### **Search Filters**
Criteria narrowing search results:
- Category
- Price range
- Condition
- Premium items only
- Verified sellers only
- Active offers

### **Product Category**
Classification grouping similar products (Electronics, Fashion, Home, Sports, etc.).

### **Search Relevance / Ranking**
Sorting results by relevance:
- Most relevant
- Newest
- Most offers
- Trending

## Quality Assurance Terminology

### **Bug / Issue**
Unintended system behavior or error requiring fixing.

### **Feature**
New functionality added to the platform.

### **Patch / Hotfix**
Quick fix for critical production issues.

### **Build / Release**
Complete compiled application version ready for deployment.

### **Staging Environment**
Test environment mirroring production for QA testing before release.

### **Production / Live**
Live environment serving real users.

## Summary

This glossary ensures stakeholders share common terminology when discussing:
- Trading mechanics (multi-way trading, trade loops, conversions)
- Roles and permissions (traders, riders, admins, organizations)
- Payment and delivery (COD, remittance, batches, slots)
- Trust systems (strikes, disputes, escalations, verification)
- Premium features (Plus/Pro tiers, analytics, express delivery)
- Technical aspects (APIs, migrations, optimization)

Consistent use of these terms improves clarity, reduces misunderstandings, and strengthens communication across product teams, user communities, and support staff.
