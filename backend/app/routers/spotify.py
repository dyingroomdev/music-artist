# path: backend/app/routers/spotify.py
from __future__ import annotations

import time
from typing import Any, Dict, List

import httpx
from fastapi import APIRouter, Depends, HTTPException, status

from ..config import Settings
from ..deps import get_settings

router = APIRouter(prefix="/spotify", tags=["spotify"])

_token_cache: Dict[str, Any] = {"token": None, "expires_at": 0.0}


def _get_token(settings: Settings) -> str:
    if not settings.SPOTIFY_CLIENT_ID or not settings.SPOTIFY_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Spotify credentials not configured",
        )
    now = time.time()
    if _token_cache["token"] and now < _token_cache["expires_at"]:
        return _token_cache["token"]
    auth = (settings.SPOTIFY_CLIENT_ID, settings.SPOTIFY_CLIENT_SECRET)
    data = {"grant_type": "client_credentials"}
    resp = httpx.post("https://accounts.spotify.com/api/token", data=data, auth=auth, timeout=10.0)
    if resp.status_code != 200:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Failed to fetch Spotify token")
    payload = resp.json()
    token = payload.get("access_token")
    expires_in = payload.get("expires_in", 3600)
    _token_cache["token"] = token
    _token_cache["expires_at"] = now + expires_in - 60  # refresh 1m early
    return token


@router.get("/albums")
def list_albums(settings: Settings = Depends(get_settings)) -> List[dict[str, Any]]:
    artist_id = settings.SPOTIFY_ARTIST_ID
    if not artist_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Artist ID missing")
    token = _get_token(settings)
    headers = {"Authorization": f"Bearer {token}"}
    params = {"include_groups": "album", "market": "US", "limit": 10}
    resp = httpx.get(f"https://api.spotify.com/v1/artists/{artist_id}/albums", headers=headers, params=params, timeout=10.0)
    if resp.status_code != 200:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Failed to fetch albums")
    albums = resp.json().get("items", [])
    transformed = []
    for album in albums:
        images = album.get("images") or []
        image_url = images[0]["url"] if images else ""
        transformed.append(
            {
                "id": album.get("id"),
                "name": album.get("name"),
                "album": album.get("name"),
                "releaseDate": album.get("release_date"),
                "imageUrl": image_url,
                "url": album.get("external_urls", {}).get("spotify", ""),
            }
        )
    return transformed
