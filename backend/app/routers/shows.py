# path: backend/app/routers/shows.py
from __future__ import annotations

from typing import Any, Dict, List, Union

from fastapi import APIRouter, Depends, Query
from sqlalchemy import asc, desc, select
from sqlalchemy.orm import Session

from ..deps import get_db_session
from ..models import Show
from ..schemas import ShowOut

router = APIRouter(prefix="/shows", tags=["shows"])


ResponseType = Union[List[ShowOut], Dict[str, List[ShowOut]]]


@router.get("/", response_model=ResponseType)
def list_shows(
    upcoming: bool | None = Query(default=None),
    limit: int | None = Query(default=None, ge=1),
    db: Session = Depends(get_db_session),
) -> ResponseType:
    if upcoming is True:
        stmt = select(Show).where(Show.is_upcoming.is_(True)).order_by(asc(Show.show_date))
        if limit is not None:
            stmt = stmt.limit(limit)
        result = db.execute(stmt).scalars().all()
        return [ShowOut.model_validate(show) for show in result]
    if upcoming is False:
        stmt = select(Show).where(Show.is_upcoming.is_(False)).order_by(desc(Show.show_date))
        if limit is not None:
            stmt = stmt.limit(limit)
        result = db.execute(stmt).scalars().all()
        return [ShowOut.model_validate(show) for show in result]

    upcoming_stmt = select(Show).where(Show.is_upcoming.is_(True)).order_by(asc(Show.show_date))
    past_stmt = select(Show).where(Show.is_upcoming.is_(False)).order_by(desc(Show.show_date))
    if limit is not None:
        upcoming_stmt = upcoming_stmt.limit(limit)
        past_stmt = past_stmt.limit(limit)

    upcoming_shows = db.execute(upcoming_stmt).scalars().all()
    past_shows = db.execute(past_stmt).scalars().all()
    payload: Dict[str, List[ShowOut]] = {
        "upcoming": [ShowOut.model_validate(show) for show in upcoming_shows],
        "past": [ShowOut.model_validate(show) for show in past_shows],
    }
    return payload
