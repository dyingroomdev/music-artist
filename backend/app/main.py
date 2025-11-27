# path: backend/app/main.py
from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .config import settings
from pathlib import Path

from .routers import admin_bio, admin_hero, admin_shows, admin_upload, admin_users, auth, bio, hero, shows, spotify, instagram, seo

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_prefix = settings.API_V1_PREFIX
app.include_router(auth.router, prefix=api_prefix)
app.include_router(hero.router, prefix=api_prefix)
app.include_router(bio.router, prefix=api_prefix)
app.include_router(shows.router, prefix=api_prefix)
app.include_router(admin_hero.router, prefix=api_prefix)
app.include_router(admin_bio.router, prefix=api_prefix)
app.include_router(admin_shows.router, prefix=api_prefix)
app.include_router(admin_upload.router, prefix=api_prefix)
app.include_router(spotify.router, prefix=api_prefix)
app.include_router(instagram.router, prefix=api_prefix)
app.include_router(admin_users.router, prefix=api_prefix)
app.include_router(seo.router, prefix=api_prefix)

media_path = Path(__file__).resolve().parent.parent / "media"
media_path.mkdir(exist_ok=True)
app.mount("/media", StaticFiles(directory=media_path), name="media")


@app.get("/")
def read_root() -> dict[str, str]:
    return {"status": "ok"}
