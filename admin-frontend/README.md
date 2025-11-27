# Mehreen Admin Frontend

Admin SPA to manage hero slides, artist bio, and shows for the Mehreen site.

## Setup
1) `cd admin-frontend`
2) `cp .env.example .env` and set `VITE_API_BASE_URL` to your backend (default `http://localhost:8000/api`)
3) `npm install`
4) `npm run dev`

Build/preview:
```bash
npm run build
npm run preview
```

## Auth
- Uses backend `POST /api/auth/login` (JWT).
- Token stored in `localStorage` under `mehreen_admin_token`.

## Routes
- `/login`
- `/` (Dashboard)
- `/hero-slides`
- `/bio`
- `/shows`

Backend must be running and reachable at `VITE_API_BASE_URL`.
