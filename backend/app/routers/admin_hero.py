# path: backend/app/routers/admin_hero.py
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..deps import get_current_admin_user, get_db_session
from ..models import HeroSlide
from ..schemas import HeroSlideCreate, HeroSlideOut, HeroSlideUpdate

router = APIRouter(prefix="/admin/hero-slides", tags=["admin-hero"])


def _get_slide_or_404(slide_id: int, db: Session) -> HeroSlide:
    slide = db.execute(select(HeroSlide).where(HeroSlide.id == slide_id)).scalars().first()
    if slide is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Slide not found")
    return slide


@router.get("/", response_model=list[HeroSlideOut])
def list_slides(
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> list[HeroSlideOut]:
    result = db.execute(select(HeroSlide).order_by(HeroSlide.sort_order, HeroSlide.id))
    return result.scalars().all()


@router.get("/{slide_id}", response_model=HeroSlideOut)
def get_slide(
    slide_id: int,
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> HeroSlideOut:
    return _get_slide_or_404(slide_id, db)


@router.post("/", response_model=HeroSlideOut, status_code=status.HTTP_201_CREATED)
def create_slide(
    slide_in: HeroSlideCreate,
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> HeroSlideOut:
    slide = HeroSlide(**slide_in.model_dump())
    db.add(slide)
    db.commit()
    db.refresh(slide)
    return slide


@router.put("/{slide_id}", response_model=HeroSlideOut)
def update_slide(
    slide_id: int,
    slide_in: HeroSlideUpdate,
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> HeroSlideOut:
    slide = _get_slide_or_404(slide_id, db)
    for field, value in slide_in.model_dump(exclude_unset=True).items():
        setattr(slide, field, value)
    db.add(slide)
    db.commit()
    db.refresh(slide)
    return slide


@router.delete("/{slide_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_slide(
    slide_id: int,
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> None:
    slide = _get_slide_or_404(slide_id, db)
    db.delete(slide)
    db.commit()
