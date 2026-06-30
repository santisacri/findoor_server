# Findoor

Simplified real estate portal to publish and search properties for sale or rent.

## Stack
- **Backend:** Node.js, TypeScript, Express, Prisma, PostgreSQL
- **Frontend:** React, TypeScript, Tailwind CSS
- **Auth:** JWT with access + refresh tokens, refresh token rotation, httpOnly cookies, local and global logout
- **Storage:** Cloudinary (photos)
- **Email:** Resend
- **Security:** Helmet, CORS, rate limiting (global and auth)
- **Deploy:** Railway (backend + DB) / Vercel (frontend)

## Architecture
Backend structured with Clean Architecture (Domain → Use Cases → Infrastructure → Presentation).
Strict separation between datasources, repositories, and use cases with dependency injection.

## Local setup
1. Clone the repo
2. Copy `.env.template` to `.env` and fill in the variables
3. `docker-compose up -d` (starts PostgreSQL)
4. `npm run migrate`
5. `npm run dev`

## Features

### Auth
- Registration and login with JWT
- Authenticated password change
- Local logout (invalidates the current token) and global logout (invalidates all of the user's tokens)

### Properties
- Public feed with pagination and filters (price, city, type, operation, rooms, surface, parking)
- Publish a property with photos, description, price, and location
- Types: House, Apartment
- Operations: Sale, Rent
- View property detail

### Seekers
- Save and remove properties from favorites (toggle)
- Contact the owner via a message

### Owner dashboard
- View and manage their properties (activate/deactivate/edit/delete)
- Upload and delete property photos
- View received contact leads (read / unread)

## Out of scope (v2)
- Interactive map with radius-based search
- Real-time chat between Seeker and Owner
- Reviews system
- Paid / featured listings