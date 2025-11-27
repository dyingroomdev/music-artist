# path: backend/app/routers/admin_shows.py
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import asc, desc, select
from sqlalchemy.orm import Session

from ..deps import get_current_admin_user, get_db_session
from ..models import Show
from ..schemas import ShowCreate, ShowOut, ShowUpdate

router = APIRouter(prefix="/admin/shows", tags=["admin-shows"])


def _get_show_or_404(show_id: int, db: Session) -> Show:
    show = db.execute(select(Show).where(Show.id == show_id)).scalars().first()
    if show is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Show not found")
    return show


@router.get("/", response_model=list[ShowOut])
def list_shows(
    upcoming: bool | None = Query(default=None),
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> list[ShowOut]:
    stmt = select(Show)
    if upcoming is True:
        stmt = stmt.where(Show.is_upcoming.is_(True)).order_by(asc(Show.show_date))
    elif upcoming is False:
        stmt = stmt.where(Show.is_upcoming.is_(False)).order_by(desc(Show.show_date))
    result = db.execute(stmt)
    return result.scalars().all()


@router.get("/{show_id}", response_model=ShowOut)
def get_show(
    show_id: int,
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> ShowOut:
    return _get_show_or_404(show_id, db)


@router.post("/", response_model=ShowOut, status_code=status.HTTP_201_CREATED)
def create_show(
    show_in: ShowCreate,
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> ShowOut:
    show = Show(**show_in.model_dump())
    db.add(show)
    db.commit()
    db.refresh(show)
    return show


@router.put("/{show_id}", response_model=ShowOut)
def update_show(
    show_id: int,
    show_in: ShowUpdate,
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> ShowOut:
    show = _get_show_or_404(show_id, db)
    for field, value in show_in.model_dump(exclude_unset=True).items():
        setattr(show, field, value)
    db.add(show)
    db.commit()
    db.refresh(show)
    return show


@router.delete("/{show_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_show(
    show_id: int,
    db: Session = Depends(get_db_session),
    _: str = Depends(get_current_admin_user),
) -> None:
    show = _get_show_or_404(show_id, db)
    db.delete(show)
    db.commit()
