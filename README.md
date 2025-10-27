# YAP Fantasy Football

A simplified fantasy football card collection game with performance-based card rarity system.

## Project Structure

```
yap-fantasy-football/
├── yap-fantasy-frontend/    # Vite + React + TypeScript frontend
├── yap-fantasy-backend/     # Express + TypeScript API
├── DEVELOPMENT_PLAN.md      # 35-week development roadmap
├── TECH_STACK_ADVANTAGES.md # Technical decisions documentation
└── mcp.json                 # MCP server configuration
```

## Tech Stack

### Frontend
- **Vite** - Ultra-fast dev server with instant HMR
- **React 18** with TypeScript
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Pre-built React components

### Backend
- **Express.js** - REST API
- **TypeScript** - Type safety
- **Supabase** - PostgreSQL + Auth + Realtime + Storage
- **BallDontLie API** - NFL GOAT subscription (unlimited calls)

### Hosting
- **Railway** - All-in-one platform (frontend + backend + cron + database)

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Frontend Setup
```bash
cd yap-fantasy-frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173

### Backend Setup
```bash
cd yap-fantasy-backend
npm install

# Copy .env.example to .env and fill in your credentials
cp .env.example .env

npm run dev
```

Backend runs on http://localhost:4000

## Environment Variables

### Backend (.env)
```
PORT=4000
NODE_ENV=development

# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
SUPABASE_ANON_KEY=your_supabase_anon_key

# BallDontLie API
BALLDONTLIE_API_KEY=your_api_key

# Cron Security
CRON_SECRET=your_secret_key
```

## Current Status

### Phase 0: Setup & Learning (Week 1-2) - IN PROGRESS

- [x] Create Vite + React + TypeScript frontend
- [x] Create Express + TypeScript backend
- [x] Install and configure Tailwind CSS
- [x] Set up basic API routes
- [x] Configure BallDontLie API integration
- [ ] Test API connections
- [ ] Initialize GitHub repository
- [ ] Deploy to Railway
- [ ] Set up Supabase database

## API Endpoints

### Test Endpoints
- `GET /health` - Health check
- `GET /api/test` - Basic API test
- `GET /api/test-nfl` - Test BallDontLie API connection

## Development Timeline

**Target:** 35 weeks (~8 months) to MVP
**Time Commitment:** 15 hrs/week average (adjustable 10-20)
**Launch Target:** Week 35 soft launch with 10 beta testers

See [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) for detailed roadmap.

## Core Features (MVP)

- Card packs (Bronze/Silver/Gold/Diamond)
- Card collection with filters and quick-sell
- Lineup builder (10 positions)
- Weekly scoring (batch update Tuesdays)
- Card auto-upgrades based on performance
- Boost tokens for bonus points
- Daily/weekly challenges
- Global leaderboard
- Push notifications

## License

ISC
