# path: backend/app/routers/bio.py
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from ..deps import get_db_session
from ..models import Bio
from ..schemas import BioOut

router = APIRouter(prefix="/bio", tags=["bio"])


@router.get("/", response_model=BioOut)
def get_latest_bio(db: Session = Depends(get_db_session)) -> BioOut:
    stmt = select(Bio).order_by(desc(Bio.updated_at)).limit(1)
    result = db.execute(stmt).scalars().first()
    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bio not found")
    return result
