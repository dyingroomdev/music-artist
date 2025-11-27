from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..deps import get_current_admin_user, get_db_session
from ..models import MusicPlayerSettings
from ..schemas import MusicPlayerOut, MusicPlayerUpdate, MusicPlayerCreate

router = APIRouter(prefix="/music-player", tags=["music-player"])


def _get_single(db: Session) -> MusicPlayerSettings | None:
    return db.execute(select(MusicPlayerSettings).limit(1)).scalars().first()


@router.get("/", response_model=MusicPlayerOut | None)
def get_music_player(db: Session = Depends(get_db_session)) -> MusicPlayerOut | None:
    return _get_single(db)


@router.post("/", response_model=MusicPlayerOut, status_code=status.HTTP_201_CREATED)
def create_music_player(
    payload: MusicPlayerCreate,
    db: Session = Depends(get_db_session),
    _: object = Depends(get_current_admin_user),
) -> MusicPlayerOut:
    existing = _get_single(db)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Music player settings already exist")
    mp = MusicPlayerSettings(**payload.model_dump())
    db.add(mp)
    db.commit()
    db.refresh(mp)
    return mp


@router.put("/", response_model=MusicPlayerOut)
def update_music_player(
    payload: MusicPlayerUpdate,
    db: Session = Depends(get_db_session),
    _: object = Depends(get_current_admin_user),
) -> MusicPlayerOut:
    mp = _get_single(db)
    if not mp:
        mp = MusicPlayerSettings(**payload.model_dump(exclude_unset=True))
        db.add(mp)
    else:
        for k, v in payload.model_dump(exclude_unset=True).items():
            setattr(mp, k, v)
        db.add(mp)
    db.commit()
    db.refresh(mp)
    return mp
