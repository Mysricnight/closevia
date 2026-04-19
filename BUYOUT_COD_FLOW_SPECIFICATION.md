# Buyout COD (Cash On Delivery) Flow Specification

**Last Updated:** April 12, 2026  
**Status:** Complete Specification

---

## Table of Contents
1. [Overview](#overview)
2. [Cash Handling & Responsibilities](#cash-handling--responsibilities)
3. [Payment Refusal Scenarios](#payment-refusal-scenarios)
4. [Cancel & Return Handling](#cancel--return-handling)
5. [Trade Lifecycle States](#trade-lifecycle-states)
6. [System Implementation Details](#system-implementation-details)

---

## Overview

### What is Buyout COD?
Buyout COD is a **Cash On Delivery payment method** for direct cash purchases where:
- **Buyer:** Offers only cash (no items in trade)
- **Fulfillment:** Delivery via platform-assigned rider
- **Payment Timing:** Collected at delivery point
- **Payment Confirmation:** Auto-confirmed when delivery is initiated

### Key Constraint
When a buyer selects **Delivery** as fulfillment option → **Payment Method MUST be COD** (automatic, non-overridable)

---

## Cash Handling & Responsibilities

### Role: Buyer
**General Responsibilities:**
- Confirms delivery address before accepting buyout offer
- Ensures they are present at delivery location during delivery window
- Has cash ready at delivery time in exact or appropriate denominations
- Receives item from rider and inspects condition
- Confirms receipt in-app after receiving item

**Cash Handling:**
- Holds cash until rider confirms delivery
- Physically hands cash to rider
- Keeps receipt/transaction record for personal records
- Reports issues within 24 hours if payment problems occur

### Role: Rider (Delivery Partner)
**Primary Responsibilities:**
- Collects exact COD amount from buyer at delivery point
- Counts cash and confirms amount matches trade amount
- Issues receipt/handoff confirmation to buyer
- Accepts proof of delivery (photo/signature)
- Immediately deposits cash with platform or remittances system
- Reports collection status in mobile app (success/refusal/issues)

**Cash Handling:**
- **Carries:** Physical cash up to daily/trip limit set by platform
- **Collects:** From buyer with receipt handoff
- **Verification:** Counts cash in front of buyer
- **Storage:** Securely stores collected cash
- **Remittance:** Deposits daily with accounting team via remittance process
- **Reconciliation:** Matches app-logged collections with physical cash

**Cash Security:**
- Rider holds cash in secure bag/wallet while in transit
- Platform provides insurance/protection for collected amounts
- Rider trained on cash handling best practices

### Role: Seller
**Passive Role:**
- Does not handle cash for COD transactions
- Receives payment confirmation via platform notification
- Cash amount goes directly to rider for buyer-collection (NOT seller pocket)
- Seller receives payment to wallet/account AFTER rider remits to platform

**Seller Receives Payment When:**
1. Delivery completed (buyer confirms receipt)
2. Rider remits cash to accounting team
3. Platform clears remittance (typically 1-2 business days)
4. Payment transferred to seller wallet/account

### Role: Admin/Accounting Team
**Responsibilities:**
- Receives daily/weekly cash remittances from riders
- Verifies cash amounts match app-recorded collections
- Records cash in accounting system
- Transfers verified payment amounts to seller wallets
- Investigates discrepancies (missing cash, overage, etc.)

---

## Payment Refusal Scenarios

### Scenario 1: Buyer Refuses to Pay

**Trigger:** Rider arrives at delivery location, buyer refuses to give cash

**Immediate Actions (Rider):**
1. Documents refusal in mobile app with timestamp
2. Takes photo/screenshot of reason if safe
3. Does NOT leave item with buyer
4. Retains item for return to seller
5. Contacts platform support immediately

**System Actions (Backend):**
```
Trade State Transitions:
- Current: 'active' (delivery in progress)
- Transition: 'active' → 'pending_dispute'
- Payment Status: 'not_confirmed'
- Flag: 'payment_refused_at_delivery'
- Timestamp: Recorded
```

**Notification Flow:**
```
Buyer: "Delivery failed: Payment refused"
        → Options: Retry delivery, Initiate refund/cancellation
        
Seller: "Delivery failed: Buyer refused payment"
        → Status: Item in return-to-seller process
        → Payment: NOT released (held in escrow)
        
Rider: "Delivery failed: Payment refused"
       → Compensation: None (failed delivery)
       → Instructions: Return item to seller
```

**Resolution Options:**

#### Option A: Retry Delivery
- **Buyer initiates** within 24 hours
- Same rider or alternate rider attempts redelivery
- New delivery window scheduled
- Retries limited to 2 attempts max
- After 2 failures → auto-cancel

**Code Implementation:**
Location: [handlers/trade_handler.go](handlers/trade_handler.go) - New logic needed
```go
// DeliveryAttempt tracking needed in database
type Trade struct {
  // ... existing fields
  DeliveryAttempts int        // Count of failed attempts
  LastRefusalReason string   // "buyer_refused", "not_home", etc
  LastRefusalTime *time.Time
  NextRetryScheduled *time.Time
  MaxRetries int  // Default 2 for COD
}
```

#### Option B: Immediate Cancellation
- **Buyer requests** cancellation instead of retry
- Trade status → `cancelled`
- Seller notified immediately
- Item returns to seller inventory
- NO cash changes hands
- Analytics tracked: "COD_PAYMENT_REFUSAL_CANCEL"

### Scenario 2: Partial Payment (Underpayment)

**Trigger:** Rider receives less cash than trade amount

**Immediate Actions (Rider):**
1. Documents exact amount received
2. Calculates shortfall
3. Asks buyer to provide balance
4. If buyer refuses → treat as full refusal (Scenario 1)
5. If buyer agrees → proceed with payment after receiving balance

**System Response:**
```
Case: Buyer pays shortfall
- Payment amount recorded: Partial + Additional
- Payment status: 'confirmed'
- Trade continues to completion

Case: Buyer refuses to pay shortfall
- Treat as payment refusal
- Triggers Scenario 1 flow
```

### Scenario 3: Over-Payment (Overpayment)

**Trigger:** Rider receives more cash than trade amount

**Immediate Actions (Rider):**
1. Documents exact amount received
2. Calculates overage
3. Returns overage to buyer immediately
4. Records in app: "Overpayment managed: ₱X returned to buyer"

**System Actions:**
```
Payment recorded: Exact trade amount only (overage rejected)
Extra cash returned to buyer (documented)
Trade proceeds normally
```

---

## Cancel & Return Handling

### Types of Cancellations

#### Type A: Buyer-Initiated Cancellation (Pre-Delivery)

**Timeline:** Before rider starts pickup or is in transit

**Status Flow:**
```
pending → accepted → active (payment_confirmed=true)
                           ↓
                    active_cancellation_requested
                           ↓
                    cancelled
```

**Actions Required:**
1. **Buyer Request:** Submits cancellation in modal
2. **Seller Notified:** "Buyer requested cancellation"
3. **Grace Period:** Seller has max 2 hours to accept/reject
   - If seller doesn't respond → auto-accept after 2 hours
4. **Rider Notification:** 
   - If rider not yet picked up → cancel pickup
   - If rider in transit with item → continue to seller for return
5. **Cash Handling:**
   - No cash collected yet (payment pre-confirmed but not yet collected)
   - NO payment to seller
   - Cash remains with buyer (never left possession)

**Refund Process:**
```
No refund needed - cash never left buyer's hands
Seller status: 'cancelled'
Analytics: COD_BUYER_CANCEL_PRE_DELIVERY
```

#### Type B: Buyer-Initiated Return (Post-Delivery)

**Timeline:** After buyer receives item but within 24-hour return window

**Preconditions:**
- Trade must be in 'completed' state
- Buyer must initiate within 24 hours of delivery confirmation
- Reason documented: defective, not as described, changed mind, etc.

**Status Flow:**
```
completed → return_requested → return_in_transit → refunded
```

**Actions Required:**
1. **Buyer Request:** Submits return request with reason
2. **Reason Categories:**
   - "Item defective"
   - "Item not as described"
   - "Changed mind" (non-refundable in some cases)
   - "Wrong item sent"
   - "Other"
3. **Seller Review:** Must accept or reject return within 4 hours
   - Auto-accept after 4 hours if no response
4. **Item Pickup:** New delivery assigned for return pickup
5. **Inspection:** Seller inspects returned item
6. **Approval/Rejection:**
   - If approved → Process refund
   - If rejected → Return to buyer, explain reason

**Cash Refund Process (If Approved):**
```
Step 1: Item inspected by seller
Step 2: Seller approves return via app
Step 3: Rider collects item from buyer (reverse delivery)
Step 4: Item delivered to seller
Step 5: Seller confirms receipt of return
Step 6: Refund processed to buyer payment method:
        
        - Original payment method: COD (collected by rider)
          → Refund issued as in-app wallet credit OR
          → Rider delivers refund cash back to buyer on next route
          
        - If neither possible:
          → Manual refund via bank transfer
          → Processed by admin team within 3-5 business days
```

**Cost Allocation:**
```
Original Trade: ₱5,000 (COD, buyer paid rider)
Delivery Fee: ₱50 (already charged)

Return Approved:
- Refund to Buyer: ₱5,000 (full item price)
- Deduct Return Logistics: ₱50 (return delivery fee)
- Final Refund: ₱4,950
- Deduction Reason: "Return delivery logistics"

Alternative (No Refund Fee):
- Platform absorbs ₱50 return fee
- Refund: ₱5,000 (full)
- Cost: Platform -₱50 (policy decision)
```

**Seller Impact:**
- Seller does NOT lose money on return
- Item returned to inventory
- Original cash payment from buyer kept... OR
- Refund amount deducted from seller wallet if cash already transferred

Recommended Implementation:
```sql
-- Add to Trade table
ALTER TABLE trades ADD COLUMN return_refund_processed_at TIMESTAMP NULL;
ALTER TABLE trades ADD COLUMN return_reason VARCHAR(255);
ALTER TABLE trades ADD COLUMN return_approved_at TIMESTAMP NULL;
ALTER TABLE trades ADD COLUMN return_refund_amount DECIMAL(10, 2);
ALTER TABLE trades ADD COLUMN return_refund_method ENUM('wallet', 'cash', 'bank_transfer');

-- Add to Transactions table
INSERT INTO transactions (
  seller_id, 
  amount, 
  type='return_refund',
  trade_id,
  status='pending'
) VALUES (...);
```

#### Type C: Seller-Initiated Cancellation (Pre-Payment)

**Timeline:** Seller declines/cancels trade before payment is confirmed

**Status Flow:**
```
pending → seller_rejected → cancelled
```

**Actions Required:**
1. **Seller Action:** Declines trade in modal
   - Optional reason: "Item sold", "Buyer suspicious", etc.
2. **Buyer Notified:** "Seller declined"
3. **Rider:** Never assigned (trade cancelled before shipment)
4. **Cash Handling:**
   - NO cash involved (payment never confirmed)
   - Buyer keeps cash
5. **Trade Record:** Marked as `cancelled`, archived

**Analytics:** COD_SELLER_DECLINE

#### Type D: Dispute/Admin Cancellation

**Timeline:** Any time during trade lifecycle if dispute occurs

**Triggers:**
- Buyer reports item not delivered
- Rider reports delivery impossible (address invalid, buyer unavailable)
- System detects fraud/suspicious activity
- Admin manually intervenes

**Process:**
1. **Report Filed:** Issue documented with evidence (photos, timestamps)
2. **Investigation:** Admin team reviews:
   - Delivery location
   - Rider tracking data
   - Buyer/seller messages
   - Previous dispute history
3. **Resolution Options:**
   - **Return to Buyer:** Refund full payment
   - **Return to Seller:** Keep payment (risky, not recommended)
   - **Split Resolution:** Partial refund (rare, only for partial delivery)
4. **Implementation:**
   ```
   trade.status = 'disputed'
   trade.dispute_reason = 'delivery_failed' | 'fraud_suspected' | 'other'
   dispute_ticket.created_at = NOW()
   dispute_ticket.assigned_to = admin_user_id
   ```

---

## Trade Lifecycle States

### State Diagram (COD Delivery Flow)

```
┌─────────────────────────────┐
│  pending                    │  Buyer: Waiting for seller
│ (offer created)             │  Seller: Can accept/reject
└──────────────┬──────────────┘
               │ seller.accept()
               ▼
┌──────────────────────────┐
│  accepted                │  Buyer: Ready to pay
│ (waiting for payment)    │  Seller: Item ready
└──────┬───────────────────┘
       │ Payment auto-confirmed (COD) + Rider assigned
       │ PUT /api/trades/{id} with action: 'update_delivery_state'
       ▼
┌──────────────────────────┐
│  active                  │  Buyer: Waiting for delivery
│ (delivery scheduled)     │  Seller: Item with rider
│ (payment_confirmed=true) │  Rider: In transit or arriving
└──────┬──────────────────┘
       │
       ├─ buyer_refuses_payment → pending_dispute ──┐
       │                                              │
       ├─ delivery_successful ──────────────┐        │
       │                                    │        │
       ├─ delivery_failed ─────┐            │        │
       │  (not found, etc)      │            │        │
       │                        │            │        │
       ▼                        ▼            ▼        │
    active_cancellation        active_at_      completed
    requested                  risk/retry         │
       │                          │                │
       ├──► buyer_confirms_receipt by buyer         │
       │    (marks user_received_item=true)         │
       │                                            │
       ▼                                            ▼
    cancelled                            completed
                                         (earned review eligibility)
                                         │
  From completed:                        │
  ├─ Return requested ──► return_requested
  │                           │
  │                           ├─ Approved ──► return_in_transit ──► refunded
  │                           │
  │                           └─ Rejected ──► completed (no change)
  │
  └─ Dispute filed ──► disputed ──► disputed_resolved

From any active state (if admin intervention):
└─► disputed ──► disputed_resolved
```

### COD-Critical States

| State | Payment Status | Rider Has Cash | Seller Gets Paid | Refund Possible |
|-------|---|---|---|---|
| pending | not_confirmed | No | No | N/A |
| accepted | not_confirmed | No | No | N/A |
| **active** | **confirmed** (auto) | **Not yet** | **No (held)** | **Yes, until delivered** |
| completed | confirmed | No (remitted) | Yes (after verification) | Yes (24hr window) |
| cancelled | not_confirmed | N/A | No | N/A - no refund needed |
| return_requested | confirmed | No (remitted) | Held pending decision | Yes if approved |
| disputed | verification_pending | Unclear | Held pending ruling | Decision-based |

---

## System Implementation Details

### Database Schema Updates Needed

#### Trades Table - COD-Specific Columns
```sql
ALTER TABLE trades ADD COLUMN IF NOT EXISTS (
  -- Payment Refusal Tracking
  payment_refusal_at TIMESTAMP NULL,
  payment_refusal_reason VARCHAR(255),  -- "buyer_refused", "underpayment", etc
  payment_refusal_rider_note TEXT,
  payment_attempts INT DEFAULT 0,
  max_payment_attempts INT DEFAULT 2,
  
  -- COD-Specific Payment
  cod_amount_expected DECIMAL(10, 2),
  cod_amount_received DECIMAL(10, 2) NULL,
  overpayment_amount DECIMAL(10, 2) NULL,
  overpayment_returned_at TIMESTAMP NULL,
  
  -- Cancellation Fields
  cancellation_initiated_by ENUM('buyer', 'seller', 'rider', 'admin'),
  cancellation_requested_at TIMESTAMP NULL,
  cancellation_grace_period_expires_at TIMESTAMP NULL,
  cancellation_approved_at TIMESTAMP NULL,
  
  -- Return Fields
  return_initiated_at TIMESTAMP NULL,
  return_reason VARCHAR(255),
  return_inspection_passed BOOLEAN NULL,
  return_approved_at TIMESTAMP NULL,
  return_refund_processed_at TIMESTAMP NULL,
  return_refund_amount DECIMAL(10, 2),
  return_refund_method ENUM('wallet', 'cash', 'bank_transfer'),
  
  -- Dispute Fields
  dispute_status ENUM('none', 'filed', 'under_review', 'resolved'),
  dispute_created_at TIMESTAMP NULL,
  dispute_resolution_type ENUM('refund_buyer', 'refund_none', 'partial_refund'),
  dispute_resolution_amount DECIMAL(10, 2),
  dispute_resolved_at TIMESTAMP NULL
);

CREATE TABLE delivery_attempts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  trade_id INT NOT NULL REFERENCES trades(id),
  rider_id INT REFERENCES users(id),
  attempt_number INT,
  scheduled_at TIMESTAMP,
  status ENUM('pending', 'in_transit', 'delivered', 'failed', 'cancelled'),
  failure_reason VARCHAR(255),
  payment_status ENUM('pending', 'refused', 'received', 'unknown'),
  cash_collected_amount DECIMAL(10, 2) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payment_refunds (
  id INT PRIMARY KEY AUTO_INCREMENT,
  trade_id INT NOT NULL REFERENCES trades(id),
  refund_reason ENUM('payment_refused', 'return_approved', 'dispute_resolved', 'admin_manual'),
  refund_amount DECIMAL(10, 2),
  refund_method ENUM('wallet', 'cash', 'bank_transfer'),
  refund_status ENUM('pending', 'processing', 'completed', 'failed'),
  processed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### API Endpoints to Implement/Update

#### 1. Handle Payment Refusal
```
PUT /api/trades/{id}/payment-refused
Request Body:
{
  rider_id: number,
  amount_received: number (null if refused entirely),
  reason: string,
  photo_proof: string (base64, optional)
}

Response:
{
  status: 'payment_refused',
  trade_id: number,
  next_retry_scheduled?: timestamp,
  cancellation_options: ['retry', 'cancel']
}
```

#### 2. Retry COD Payment
```
POST /api/trades/{id}/retry-delivery
Request Body:
{
  buyer_confirmed: boolean,
  scheduled_time: timestamp (optional)
}

Response:
{
  delivery_attempt_id: number,
  rider_id: number,
  estimated_arrival: timestamp
}
```

#### 3. Cancel Trade (Post-Acceptance)
```
POST /api/trades/{id}/cancel
Request Body:
{
  reason: string,
  bypass_grace_period: boolean (admin only)
}

Response:
{
  status: 'cancelled' | 'cancellation_requested',
  grace_period_expires_at?: timestamp,
  refund_amount?: number (if already paid)
}
```

#### 4. Initiate Return
```
POST /api/trades/{id}/return
Request Body:
{
  reason: string,
  condition_photos: string[] (base64 array)
}

Response:
{
  return_id: number,
  pickup_rider_id: number,
  estimated_pickup: timestamp
}
```

#### 5. Approve/Reject Return
```
PUT /api/trades/{id}/return/{return_id}
Request Body (Seller only):
{
  action: 'approve' | 'reject',
  inspection_notes: string,
  reason_if_rejected: string
}

Response:
{
  return_status: 'approved' | 'rejected',
  refund_amount?: number,
  refund_method?: string
}
```

#### 6. Resolve Dispute
```
PUT /api/trades/{id}/dispute/resolve
Request Body (Admin only):
{
  resolution_type: 'refund_buyer' | 'refund_none' | 'partial_refund',
  refund_amount?: number,
  notes: string
}

Response:
{
  dispute_status: 'resolved',
  resolution_type: string,
  refund_processed: boolean
}
```

### Frontend Components to Update/Create

#### 1. Payment Refusal Modal
**Location:** `client/src/components/CODPaymentRefusalModal.tsx` (NEW)
```
- Shows refusal details from rider
- Displays "Retry" button (with new delivery window picker)
- Displays "Cancel Trade" button with confirmation
- Shows estimated timeline for each option
```

#### 2. Cancel Trade Modal Enhancement
**Location:** `client/src/components/CancelTradeModal.tsx` (UPDATE)
```
- If COD and pre-delivery: "Cancel immediately - no refund needed (cash still yours)"
- If COD and payment_confirmed: "Grace period {hours} for seller response"
- If post-delivery: "Initiate return instead (exchanges/refunds within 24hr)"
```

#### 3. Return Initiation Modal
**Location:** `client/src/components/InitiateReturnModal.tsx` (NEW)
```
- Reason dropdown with "Defective", "Not Described", "Changed Mind", "Wrong Item"
- Photo upload for condition proof
- Message to seller (optional)
- Return timeline estimate
- Refund method explanation (wallet vs cash)
```

#### 4. Dispute Resolution Interface
**Location:** `client/src/admin/DisputeResolutionPanel.tsx` (NEW)
```
- Show all dispute details (delivery logs, messages, photos)
- Resolution buttons: "Refund Buyer", "Reject Refund", "Partial Refund"
- Auto-process refund after resolution selection
- Generate audit log entry
```

### Notification Templates

#### Payment Refusal Notification to Buyer
```
Subject: Delivery Payment Issue - Action Required

Your delivery from [Seller] couldn't be completed because you 
refused payment.

Options:
1. Retry Delivery (1 more attempt available)
   → New rider, new time: [proposed time]
   → Expires: [24 hour deadline]
   
2. Cancel & Keep Cash
   → Trade cancelled, no payment due
   → Item returned to seller
   → Cash remains with you

Action Required By: [deadline timestamp]
Support: [contact info]
```

#### Payment Refusion Notification to Seller
```
Subject: Delivery Failed - Buyer Refused Payment

Rider [name] attempted delivery of "[product]" but buyer 
refused to pay [amount].

Status: Awaiting buyer decision
- If buyer retries: You'll be notified
- If buyer cancels: Item returned to inventory

Expected Resolution: Within 24 hours
```

---

## Implementation Phases

### Phase 1: Core Payment Refusal (Priority: HIGH)
- [ ] Implement payment_refused_at, reason, attempt tracking in DB
- [ ] Rider app: "Payment Refused" button with photo proof
- [ ] Buyer notification + Retry/Cancel options
- [ ] API endpoint: retry delivery or cancel
- [ ] Test: Full flow with mock rider

### Phase 2: Cancellation (Priority: HIGH)
- [ ] Implement grace period (2 hours for seller response)
- [ ] Auto-accept cancellation if seller doesn't respond
- [ ] Buyer-initiated cancellation modal
- [ ] Seller-initiated rejection (pre-payment)
- [ ] Test: All cancellation paths

### Phase 3: Returns & Refunds (Priority: MEDIUM)
- [ ] Return initiation modal (post-delivery, 24hr window)
- [ ] Seller return approval/rejection (4hr window)
- [ ] Return logistics (reverse pickup)
- [ ] Refund processing (wallet, cash, bank)
- [ ] Test: Full return lifecycle with payment verification

### Phase 4: Dispute Resolution (Priority: MEDIUM)
- [ ] Dispute filing modal
- [ ] Admin investigation tools (logs, photos, chat)
- [ ] Resolution interface (refund options)
- [ ] Auto-refund processing
- [ ] Test: Edge cases (fraud, missing cash, etc)

### Phase 5: Analytics & Reporting (Priority: LOW)
- [ ] Track COD_PAYMENT_REFUSAL events
- [ ] Track COD_BUYER_CANCEL_PRE_DELIVERY
- [ ] Track COD_RETURN_APPROVED / COD_RETURN_REJECTED
- [ ] Dashboard: Payment success rate by rider
- [ ] Dashboard: Cancellation reasons breakdown

---

## Success Metrics

### COD Payment Flow Health
- **Payment Collection Rate:** Target 98%+ (should capture cash at delivery)
- **Payment Refusal Rate:** Track <2% (indicates buyer issues)
- **Retry Success Rate:** Target 75%+ on second attempt
- **Return Rate (Post-Delivery):** Target <3%
- **Dispute Rate:** Target <1%

### Cash Handling Audits
- **Cash Remittance Accuracy:** 100% match between app and physical
- **Rider Cash Handling Score:** Monthly ratings (0-100)
- **Payment Refund Processing Time:** <2 business days average
- **Unclaimed Refunds:** <0.5% (customer neglect)

---

## Security & Compliance Considerations

### Cash Security
- Riders trained on secure carry and handoff
- Platform insurance for collected amounts
- Daily settlement (cash doesn't wait >24hr)
- Audit logs for all cash movements

### Fraud Prevention
- Velocity checks on high-value COD trades per buyer
- Address verification (geolocation match)
- Buyer account age minimum for COD (e.g., 7 days)
- Automatic dispute for overly frequent cancellations

### Data Privacy
- Payment amounts encrypted in logs
- No cash-specific data in public API responses
- Cash details visible only to: Buyer, Seller, Rider, Admin
- Audit trail: Who viewed cash-related data and when

---

## FAQ

**Q: Can buyer refuse payment partially?**  
A: No. Underpayment = payment refusal. Rider either collects full amount or marks as refused.

**Q: Can seller initiate cancellation after accepting?**  
A: Can't unilaterally cancel. Seller can only change item/price before accepting.

**Q: If buyer refuses payment, does seller get paid?**  
A: No. Payment held in escrow. If retried and succeeds, paid after rider remits. If cancelled, seller gets nothing.

**Q: What if rider loses/misuses collected cash?**  
A: Platform insurance covers. Dispute initiated. Refund processed to buyer. Rider may face penalties/termination.

**Q: Can buyer return after 24 hours?**  
A: No automatic returns after 24hr window. Must file dispute. Admin reviews on case-by-case basis.

**Q: What method can cash refunds be issued by if payment was COD?**  
A: Three options (in order of preference):  
1. In-app wallet credit (instant)
2. Rider delivers cash on next delivery (logistics dependent)
3. Bank transfer (3-5 business days, verified account required)

---

**Document End**
