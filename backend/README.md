# path: backend/README.md
# Mehreen Backend

FastAPI backend for Mehreen Mahmud's landing site covering hero slider content, artist bio, and music shows with admin-protected CRUD.

## Prerequisites
- Python 3.11+
- Docker + docker-compose (for containerized run)
- PostgreSQL instance (local or via Docker)

## Configuration
1. Copy `.env.example` to `.env` and fill in values.
2. Admin credentials: preferred approach is to set `ADMIN_PASSWORD_HASH` (bcrypt). For convenience you can set `ADMIN_PASSWORD` instead; it will be hashed at startup.

## Local Setup (without Docker)
```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt

# ensure Postgres is running and DATABASE_URL in .env points to it
alembic upgrade head
uvicorn app.main:app --reload
```

## Docker Setup
```bash
cp .env.example .env  # and fill values
docker-compose up --build
```
The included `docker-compose.yml` starts Postgres and the backend on port 8000.

## API Quickstart
- Auth: `POST /api/auth/login` with JSON `{ "username": "...", "password": "..." }` -> returns bearer token.
- Public: `GET /api/hero-slides`, `GET /api/bio`, `GET /api/shows`.
- Admin (Bearer token required):
  - Hero slides CRUD: `/api/admin/hero-slides`
  - Bio CRUD: `/api/admin/bio`
  - Shows CRUD: `/api/admin/shows`

## Notes
- Database migrations: `alembic upgrade head` applies the initial schema (hero_slides, bios, shows).
- CORS origins can be set via `BACKEND_CORS_ORIGINS` (comma-separated list or JSON-style array).
