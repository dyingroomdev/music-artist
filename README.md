# Mehreen – Night Mode Landing & Admin Suite

This repo contains three apps:
- `backend/` – FastAPI + PostgreSQL API for public content and admin CRUD.
- `frontend/` – Public landing site (Vite + React + Tailwind).
- `admin-frontend/` – Admin SPA for managing hero slides, bio, shows, admins, and SEO.

## Prerequisites
- Python 3.11+
- Node 18+
- PostgreSQL
- (Optional) Docker/Docker Compose

## Environment
Copy the samples and fill in values:
- Backend: `cp backend/.env.example backend/.env`
- Frontend: `cp frontend/.env.example frontend/.env`
- Admin: `cp admin-frontend/.env.example admin-frontend/.env`

Key backend envs:
- `DATABASE_URL` (e.g., postgresql+psycopg2://user:pass@localhost:5432/mehreen_db)
- `JWT_SECRET_KEY`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`
- CORS origins (5173/5174) and optional Spotify creds

## Backend setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8001
```

## Frontend (public)
```bash
cd frontend
npm install
npm run dev  # defaults to port 5173
```

## Admin frontend
```bash
cd admin-frontend
npm install
npm run dev  # defaults to port 5174
```

## Docker (optional)
We provide a single `docker-compose.yml` at repo root.

### Using your existing Postgres (`some-postgres` on `pg-network`)
The compose file is preconfigured to connect to an external Postgres container named `some-postgres` on network `pg-network`.

1) Ensure the DB is created:
   - host: `some-postgres`
   - port: `5432`
   - user: `mehreen_user`
   - password: `mehreen_password`
   - database: `mehreen_db`

2) Ensure the external network exists:
```bash
docker network ls | grep pg-network || docker network create pg-network
```

3) Start the stack:
```bash
docker-compose up --build
```

Exposed ports:
- Backend API: host `9010` -> container `8000`
- Frontend: host `9011` -> container `5173`
- Admin: host `9012` -> container `5174`

4) If you prefer to run a bundled Postgres instead, reintroduce a `db` service in compose and point `DATABASE_URL` to it.

## Features
- Public APIs: hero slides, bio, shows, Spotify albums proxy, SEO fetch.
- Admin APIs: CRUD for slides/bio/shows/admin users, SEO settings, media upload, auth (JWT).
- Admin roles: superadmin can create other admins.
- Static media served from `backend/media`.

## Common tasks
- Refresh DB schema: `alembic upgrade head`
- Seed superadmin: first login uses `ADMIN_USERNAME`/`ADMIN_PASSWORD` (auto-created if missing).
- Update SEO: via admin UI (SEO page); frontend reads `/api/seo` to set meta tags.

## Support
If something fails:
- Check env values and ports (API default 8001).
- Ensure CORS allows 5173/5174.
- Restart after env/migration changes.
