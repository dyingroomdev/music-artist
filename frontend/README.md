# Mehreen Frontend

Dark, blue-gradient single-page site for Bangladeshi pop singer Mehreen Mahmud. Built with React + TypeScript, Vite, Tailwind, and axios to consume the backend JSON APIs.

## Prerequisites
- Node 18+
- Backend reachable at `VITE_API_BASE_URL` (defaults to `http://localhost:8000/api`)

## Setup
```bash
cd frontend
cp .env.example .env    # fill in API base URL and optional keys
npm install
npm run dev             # starts Vite dev server
```

## Build & Preview
```bash
npm run build
npm run preview
```

## API Integration
- Hero slides: `GET /api/hero-slides`
- Bio: `GET /api/bio`
- Shows: `GET /api/shows`
- External content: YouTube (API key/channel env), Spotify stubbed until backend proxy is available, Instagram via `VITE_INSTAGRAM_FEED_ENDPOINT` proxy.

## Notes
- Theme: night-mode with blue gradients; mobile-first layout.
- Missing external keys or proxies fall back to friendly empty states or sample content.
