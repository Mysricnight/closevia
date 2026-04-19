5.3.4 Partner Applications

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
