# Task Management - Restaurant Booking App

## Priority Levels
- P0: Critical - Must have
- P1: High - Should have
- P2: Medium - Nice to have
- P3: Low - Can be deferred

## Complexity Levels
- C1: Simple (1-2 days)
- C2: Moderate (3-5 days)
- C3: Complex (1-2 weeks)
- C4: Very Complex (2+ weeks)

## Task Tracking

### 1. Menu & Cart System (PHASE 1 - IN PROGRESS)

| Task | Priority | Complexity | Dependencies | Status | Notes |
|------|----------|------------|--------------|--------|-------|
| **Menu UI & Integration** | P0 | C2 | - | DONE | Core feature |
| ├─ Menu List UI | P0 | C1 | - | DONE | Basic layout, styling |
| ├─ Food Context Integration | P0 | C1 | - | DONE | Real data display |
| ├─ Restaurant Filter | P0 | C1 | Food Context | DONE | Filter by restaurant |
| └─ Quantity Controls | P0 | C1 | - | DONE | Add/remove items |
| **Cart Implementation** | P0 | C3 | Menu UI | IN PROGRESS | Core feature |
| ├─ Cart UI Components | P0 | C1 | - | DONE | List, total, checkout |
| ├─ Cart Context Setup | P0 | C2 | - | TODO | State management |
| ├─ Add to Cart Logic | P0 | C2 | Cart Context | TODO | Menu integration |
| └─ Cart Operations | P0 | C1 | Cart Context | TODO | Update/remove items |
| **Payment Integration** | P0 | C3 | Cart | TODO | Core feature |
| ├─ VNPay Setup | P0 | C2 | - | TODO | API configuration |
| ├─ Payment Flow | P0 | C2 | VNPay Setup | TODO | Process handling |
| └─ Order Confirmation | P0 | C1 | Payment Flow | TODO | Success/failure |

### 2. Booking System (PHASE 2)

| Task | Priority | Complexity | Dependencies | Status | Notes |
|------|----------|------------|--------------|--------|-------|
| **Table Booking Flow** | P0 | C3 | - | TODO | Core feature |
| ├─ Booking UI | P0 | C2 | - | TODO | Date/time, guests |
| ├─ Table Selection | P0 | C2 | - | TODO | Visual layout |
| ├─ Booking Context | P0 | C2 | - | TODO | State management |
| └─ Confirmation | P0 | C1 | - | TODO | Success/failure |

### Next Immediate Tasks (Broken down by prompt)

1. Cart Context Implementation (2-3 prompts):
   - Setup CartContext structure
   - Implement add/remove/update methods
   - Connect Menu with CartContext

2. Cart Operations (2-3 prompts):
   - Add quantity adjustment in cart
   - Implement remove item functionality
   - Add cart item persistence

3. Payment Flow (3-4 prompts):
   - Setup VNPay service
   - Implement payment initiation
   - Handle payment callbacks
   - Add order confirmation

4. Table Booking (4-5 prompts):
   - Create booking UI components
   - Implement date/time selection
   - Add table visualization
   - Setup booking context
   - Add confirmation flow

## Dependencies Graph
```
Cart System
└─ Cart Context
   ├─ Menu Integration
   └─ Payment Flow
      └─ Order Confirmation

Booking System
└─ Booking Context
   ├─ Table Selection
   └─ Confirmation Flow
```

## Next Actions (Immediate)
1. Implement CartContext and connect with Menu
2. Add cart operations (update/remove)
3. Setup VNPay integration
4. Begin booking system UI

### 3. Chat System (PHASE 2)

| Task | Priority | Complexity | Dependencies | Status | Notes |
|------|----------|------------|--------------|--------|-------|
| **Chat Implementation** | P1 | C4 | - | TODO | Core communication |
| ├─ Firebase Setup | P1 | C2 | - | TODO | Project configuration |
| ├─ Chat UI | P1 | C2 | - | TODO | Message list, input |
| ├─ Message Handling | P1 | C2 | Firebase Setup | TODO | Send/receive |
| └─ Chat History | P1 | C1 | Message Handling | TODO | DB storage |
| **Notifications** | P1 | C3 | - | TODO | User alerts |
| ├─ Push Notifications | P1 | C2 | Firebase Setup | TODO | Firebase Cloud Messaging |
| └─ In-app Notifications | P1 | C2 | - | TODO | Local notifications |

### 4. User Experience (PHASE 3)

| Task | Priority | Complexity | Dependencies | Status | Notes |
|------|----------|------------|--------------|--------|-------|
| **Profile Management** | P2 | C2 | - | TODO | User data |
| ├─ Profile UI | P2 | C1 | - | TODO | Edit form |
| └─ API Integration | P2 | C1 | Profile UI | TODO | Update profile |
| **Booking History** | P2 | C2 | - | TODO | Past bookings |
| ├─ History UI | P2 | C1 | - | TODO | List view |
| └─ API Integration | P2 | C1 | History UI | TODO | Fetch history |

### 5. Restaurant Discovery (PHASE 3)

| Task | Priority | Complexity | Dependencies | Status | Notes |
|------|----------|------------|--------------|--------|-------|
| **Search & Filter** | P2 | C2 | - | TODO | Find restaurants |
| ├─ Search UI | P2 | C1 | - | TODO | Search input, filters |
| └─ API Integration | P2 | C1 | Search UI | TODO | Search endpoint |
| **Restaurant Details** | P2 | C2 | - | TODO | Info display |
| ├─ Details UI | P2 | C1 | - | TODO | Info layout |
| └─ API Integration | P2 | C1 | Details UI | TODO | Fetch details |

## Critical Path
1. Table Booking Flow → VNPay Integration
2. Food Pre-order → Payment Flow
3. Chat Implementation
4. Push Notifications

## Dependencies Graph
```
Booking System
└─ UI Components
   └─ API Integration
      └─ VNPay Integration
         └─ Payment Flow

Chat System
└─ Firebase Setup
   ├─ Message Handling
   └─ Push Notifications
```

## Next Actions (Immediate)
1. Start with Table Booking UI Components
2. Parallel: Begin Firebase project setup
3. Setup VNPay sandbox environment
4. Design and implement basic booking API integration 