# path: backend/app/routers/hero.py
from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from ..deps import get_db_session
from ..models import HeroSlide
from ..schemas import HeroSlideOut

router = APIRouter(prefix="/hero-slides", tags=["hero"])


@router.get("/", response_model=list[HeroSlideOut])
def list_active_hero_slides(db: Session = Depends(get_db_session)) -> list[HeroSlideOut]:
    stmt = (
        select(HeroSlide)
        .where(HeroSlide.is_active.is_(True))
        .order_by(HeroSlide.sort_order, desc(HeroSlide.created_at))
    )
    result = db.execute(stmt)
    return result.scalars().all()
