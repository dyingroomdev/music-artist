# path: backend/app/routers/seo.py
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..deps import get_current_admin_user, get_db_session
from ..models import SEOSettings
from ..schemas import SEOSettingsOut, SEOSettingsUpdate, SEOSettingsCreate

router = APIRouter(prefix="/seo", tags=["seo"])


def _get_settings(db: Session) -> SEOSettings | None:
    return db.execute(select(SEOSettings).limit(1)).scalars().first()


@router.get("/", response_model=SEOSettingsOut | None)
def get_seo_settings(db: Session = Depends(get_db_session)) -> SEOSettingsOut | None:
    return _get_settings(db)


@router.post("/", response_model=SEOSettingsOut)
def create_seo_settings(
    payload: SEOSettingsCreate,
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> SEOSettingsOut:
    existing = _get_settings(db)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="SEO settings already exist")
    seo = SEOSettings(**payload.model_dump())
    db.add(seo)
    db.commit()
    db.refresh(seo)
    return seo


@router.put("/", response_model=SEOSettingsOut)
def update_seo_settings(
    payload: SEOSettingsUpdate,
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> SEOSettingsOut:
    seo = _get_settings(db)
    if not seo:
        # create if missing
        seo = SEOSettings(**payload.model_dump(exclude_unset=True))
        db.add(seo)
    else:
        for k, v in payload.model_dump(exclude_unset=True).items():
            setattr(seo, k, v)
        db.add(seo)
    db.commit()
    db.refresh(seo)
    return seo
