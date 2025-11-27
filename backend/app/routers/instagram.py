# path: backend/app/routers/instagram.py
from __future__ import annotations

from fastapi import APIRouter

router = APIRouter(prefix="/instagram-feed", tags=["instagram"])


@router.get("/")
def get_instagram_feed() -> list[dict]:
    # Mock feed; replace with real proxy when available
    return [
        {
            "id": "1",
            "imageUrl": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
            "caption": "Studio vibes.",
            "permalink": "https://www.instagram.com/mehreen.music"
        },
        {
            "id": "2",
            "imageUrl": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
            "caption": "Live set in Dhaka.",
            "permalink": "https://www.instagram.com/mehreen.music"
        },
        {
            "id": "3",
            "imageUrl": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
            "caption": "Backstage moments.",
            "permalink": "https://www.instagram.com/mehreen.music"
        }
    ]
