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

### 1. Booking System (PHASE 1)

| Task | Priority | Complexity | Dependencies | Status | Notes |
|------|----------|------------|--------------|--------|-------|
| **Table Booking Flow** | P0 | C3 | - | TODO | Core feature |
| ├─ UI Components | P0 | C1 | - | TODO | Date/Time picker, guest count |
| ├─ API Integration | P0 | C2 | UI Components | TODO | CRUD operations |
| ├─ VNPay Integration | P0 | C3 | API Integration | TODO | Sandbox mode |
| └─ Booking Status Tracking | P0 | C2 | API Integration | TODO | Real-time updates |
| **Food Pre-order** | P0 | C3 | - | TODO | Core feature |
| ├─ Menu UI | P0 | C1 | - | TODO | List, details, quantity |
| ├─ Cart System | P0 | C2 | Menu UI | TODO | Add/remove items |
| ├─ Order API Integration | P0 | C2 | Cart System | TODO | Submit orders |
| └─ Payment Flow | P0 | C2 | VNPay Integration | TODO | 40% pre-payment |

### 2. Chat System (PHASE 2)

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

### 3. User Experience (PHASE 3)

| Task | Priority | Complexity | Dependencies | Status | Notes |
|------|----------|------------|--------------|--------|-------|
| **Profile Management** | P2 | C2 | - | TODO | User data |
| ├─ Profile UI | P2 | C1 | - | TODO | Edit form |
| └─ API Integration | P2 | C1 | Profile UI | TODO | Update profile |
| **Booking History** | P2 | C2 | - | TODO | Past bookings |
| ├─ History UI | P2 | C1 | - | TODO | List view |
| └─ API Integration | P2 | C1 | History UI | TODO | Fetch history |

### 4. Restaurant Discovery (PHASE 3)

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