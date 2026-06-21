# Real-Time Ticket Booking System

A full-stack ticket booking platform supporting real-time seat synchronization, concurrency-safe reservations, and automated reservation expiration.

## Demo
- Live Demo

    - Frontend: (https://ticket-booking-frontend-ashen.vercel.app/)

    - Backend API Docs: (https://ticket-booking-backend-1-lppv.onrender.com/docs)

<!-- - Demo Video

    - <video_url> -->
## Features
1. Real-time seat updates using Socket.IO
2. Concurrency-safe seat reservation using Optimistic Concurrency Control (OCC)
3. Automated reservation expiration with BullMQ and Redis
4. PostgreSQL transactions for reservation consistency
5. Integration tested reservation workflows
6. Swagger API documentation

## Tech Stack
- ### Frontend
    - Next.js
    - React
    - TypeScript
    - TanStack Query
    - Socket.IO Client
    - Tailwind CSS
- ### Backend
    - Node.js
    - Express.js
    - TypeScript
    - Prisma ORM
    - PostgreSQL
    - Redis
    - BullMQ
    - Socket.IO

## Reservation Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Next.js
    participant A as Express API
    participant DB as PostgreSQL
    participant Q as BullMQ
    participant S as Socket.IO

    U->>F: Select Seats

    F->>A: POST /reservations

    A->>DB: Read Seat + Version

    A->>DB: OCC Update Seat

    DB-->>A: Update Success

    A->>DB: Create Reservation

    A->>Q: Schedule Expiration Job

    A->>S: Emit seat:update

    S-->>F: Seat Held Event

    F-->>U: UI Updated
```

## Booking Confirmation Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Next.js
    participant A as Express API
    participant DB as PostgreSQL
    participant S as Socket.IO

    U->>F: Confirm Reservation

    F->>A: POST /confirm

    A->>DB: Validate Reservation

    A->>DB: Mark BOOKED

    DB-->>A: Success

    A->>S: Emit seat:update

    S-->>F: Seat Booked Event

    F-->>U: UI Updated
```

## Reservation Expiration Flow

```mermaid
sequenceDiagram
    participant Q as BullMQ Worker
    participant DB as PostgreSQL
    participant S as Socket.IO
    participant F as Next.js

    Q->>DB: Expire Reservation

    Q->>DB: Release Seats

    DB-->>Q: Success

    Q->>S: Emit seat:update

    S-->>F: Seat Available Event

    F-->>F: Update TanStack Query Cache
```

## Concurrency Handling

To prevent double booking, the system uses Optimistic Concurrency Control.

``` ts
UPDATE seat
SET status='HELD',
    version=version+1
WHERE id=?
  AND version=?
  AND status='AVAILABLE';
```

If another reservation updates the seat first, the transaction fails and the reservation request is rejected.

## Tested Scenarios

1. Seat retrieval
2. Seat reservation
3. Reservation confirmation
4. Double booking prevention
5. Reservation expiration
6. Confirming expired reservations
7. Concurrent reservation attempt

## API Documentation

Swagger documentation is available at:

`
/docs
`

## Running Locally

### Backend

```bash
npm install
npm run dev
```

### Frontend

```bash
npm install
npm run dev
```

## Future Improvements

1. Google OAuth Authentication
2. User Booking History
3. Socket.IO Room-Based Broadcasting
4. Event Management Dashboard
5. Payment Integratio5