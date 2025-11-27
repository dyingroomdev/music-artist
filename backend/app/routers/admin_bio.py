# path: backend/app/routers/admin_bio.py
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from ..deps import get_current_admin_user, get_db_session
from ..models import Bio
from ..schemas import BioCreate, BioOut, BioUpdate

router = APIRouter(prefix="/admin/bio", tags=["admin-bio"])


def _get_bio_or_404(bio_id: int, db: Session) -> Bio:
    bio = db.execute(select(Bio).where(Bio.id == bio_id)).scalars().first()
    if bio is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bio not found")
    return bio


@router.get("/", response_model=list[BioOut])
def list_bios(
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> list[BioOut]:
    result = db.execute(select(Bio).order_by(desc(Bio.updated_at)))
    return result.scalars().all()


@router.get("/latest", response_model=BioOut)
def get_latest_bio_admin(
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> BioOut:
    bio = db.execute(select(Bio).order_by(desc(Bio.updated_at)).limit(1)).scalars().first()
    if bio is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bio not found")
    return bio


@router.get("/{bio_id}", response_model=BioOut)
def get_bio(
    bio_id: int,
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> BioOut:
    return _get_bio_or_404(bio_id, db)


@router.post("/", response_model=BioOut, status_code=status.HTTP_201_CREATED)
def create_bio(
    bio_in: BioCreate,
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> BioOut:
    bio = Bio(**bio_in.model_dump())
    db.add(bio)
    db.commit()
    db.refresh(bio)
    return bio


@router.put("/{bio_id}", response_model=BioOut)
def update_bio(
    bio_id: int,
    bio_in: BioUpdate,
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> BioOut:
    bio = _get_bio_or_404(bio_id, db)
    for field, value in bio_in.model_dump(exclude_unset=True).items():
        setattr(bio, field, value)
    db.add(bio)
    db.commit()
    db.refresh(bio)
    return bio
