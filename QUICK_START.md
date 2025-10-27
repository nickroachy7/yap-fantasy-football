# YAP Fantasy Football - Quick Start Guide

## ✅ What's Been Done

1. ✅ **Project Structure Created**
   - Frontend: Vite + React + TypeScript + Tailwind CSS
   - Backend: Express + TypeScript + Node.js

2. ✅ **GitHub Repository Created & Pushed**
   - Repository: https://github.com/nickroachy7/yap-fantasy-football
   - GitHub account: nickroachy7

3. ✅ **API Connections Configured**
   - BallDontLie API (GOAT subscription) - ready to use
   - Supabase - credentials needed

4. ✅ **Single Command Setup**
   - Run both servers with one command!

---

## 🚀 How to Start the Servers

### Option 1: Start Both Servers Together (Recommended)
```bash
cd "/Users/n.roach/Desktop/KTC Test"
npm run dev
```

This will start:
- Backend on **http://localhost:4000**
- Frontend on **http://localhost:5173**

### Option 2: Start Servers Separately

**Terminal 1 - Backend:**
```bash
cd "/Users/n.roach/Desktop/KTC Test/yap-fantasy-backend"
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd "/Users/n.roach/Desktop/KTC Test/yap-fantasy-frontend"
npm run dev
```

---

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **API Health Check**: http://localhost:4000/health
- **Test NFL API**: http://localhost:4000/api/test-nfl
- **GitHub Repo**: https://github.com/nickroachy7/yap-fantasy-football

---

## 📋 Next Steps (Week 2 of Development Plan)

1. **Deploy to Railway**
   - Create Railway account: https://railway.com
   - Connect GitHub repository
   - Deploy both frontend and backend
   - Get your production URL

2. **Set up Supabase**
   - Create Supabase project: https://supabase.com
   - Run database schema from DEVELOPMENT_PLAN.md
   - Update `.env` files with Supabase credentials
   - Test database connection

3. **Complete Tutorials**
   - React Router: https://reactrouter.com/en/main/start/tutorial
   - Vite: https://vitejs.dev/guide/
   - Supabase: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs

---

## 📁 Project Structure

```
yap-fantasy-football/
├── yap-fantasy-frontend/       # React frontend (port 5173)
│   ├── src/
│   │   ├── App.tsx            # Main app component
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Tailwind styles
│   └── package.json
│
├── yap-fantasy-backend/        # Express backend (port 4000)
│   ├── src/
│   │   ├── index.ts           # Server entry point
│   │   └── routes/
│   │       └── test-nfl.ts    # BallDontLie API test route
│   ├── .env                   # Environment variables (NOT in git)
│   └── .env.example           # Template for environment variables
│
├── package.json               # Root package with dev scripts
├── DEVELOPMENT_PLAN.md        # 35-week roadmap
├── TECH_STACK_ADVANTAGES.md   # Tech decisions
├── README.md                  # Project documentation
├── QUICK_START.md            # This file!
└── mcp.json                   # MCP config (NOT in git - has API keys)
```

---

## 🔑 Environment Variables

### Backend (.env file location: yap-fantasy-backend/.env)

Currently configured:
- ✅ `PORT=4000`
- ✅ `BALLDONTLIE_API_KEY` (your GOAT subscription key)

Still needed:
- ⏳ `SUPABASE_URL` (get from Supabase dashboard)
- ⏳ `SUPABASE_SERVICE_KEY` (get from Supabase dashboard)
- ⏳ `SUPABASE_ANON_KEY` (get from Supabase dashboard)

---

## 🛠️ Useful Commands

```bash
# Start both servers
npm run dev

# Start only backend
npm run dev:backend

# Start only frontend
npm run dev:frontend

# Install all dependencies (if needed)
npm run install:all

# Test backend API
curl http://localhost:4000/health
curl http://localhost:4000/api/test-nfl

# Git commands
git status
git add .
git commit -m "Your message"
git push

# Stop running servers
# Press Ctrl+C in the terminal
```

---

## 🐛 Troubleshooting

### Servers won't start
1. Make sure you're in the right directory
2. Try installing dependencies: `npm run install:all`
3. Check if ports 4000 and 5173 are available

### Can't push to GitHub
- Make sure you don't have API keys in your code
- Check that `mcp.json` is in `.gitignore`
- The file `mcp.json.example` is safe to commit (no real keys)

### API not working
- Check that `.env` file exists in `yap-fantasy-backend/`
- Verify BallDontLie API key is correct
- Check server logs for errors

---

## 📚 Resources

- **Development Plan**: [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md)
- **Tech Stack Info**: [TECH_STACK_ADVANTAGES.md](./TECH_STACK_ADVANTAGES.md)
- **GitHub Repo**: https://github.com/nickroachy7/yap-fantasy-football
- **Railway Docs**: https://docs.railway.com
- **Supabase Docs**: https://supabase.com/docs
- **Vite Docs**: https://vitejs.dev
- **React Router Docs**: https://reactrouter.com

---

## ✨ Current Status: Week 1 Complete!

You've successfully completed the first week of your 35-week development plan:
- ✅ Development environment set up
- ✅ GitHub repository created
- ✅ Both servers running locally
- ✅ API integrations configured

**Next milestone**: Week 2 - Deploy to Railway and set up Supabase database

---

**Need Help?** Check the DEVELOPMENT_PLAN.md file for detailed week-by-week instructions!
