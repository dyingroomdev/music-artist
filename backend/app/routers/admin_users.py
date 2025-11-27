# path: backend/app/routers/admin_users.py
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..deps import get_db_session, require_superadmin
from ..models import AdminUser
from ..schemas import AdminUserCreate, AdminUserOut, AdminUserUpdate
from ..security import get_password_hash

router = APIRouter(prefix="/admin/users", tags=["admin-users"])


def _get_user_or_404(user_id: int, db: Session) -> AdminUser:
    user = db.execute(select(AdminUser).where(AdminUser.id == user_id)).scalars().first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin user not found")
    return user


@router.get("/", response_model=list[AdminUserOut])
def list_users(
    db: Session = Depends(get_db_session),
    _: object = Depends(require_superadmin),
) -> list[AdminUserOut]:
    return db.execute(select(AdminUser)).scalars().all()


@router.post("/", response_model=AdminUserOut, status_code=status.HTTP_201_CREATED)
def create_user(
    payload: AdminUserCreate,
    db: Session = Depends(get_db_session),
    _: object = Depends(require_superadmin),
) -> AdminUserOut:
    exists = db.execute(select(AdminUser).where(AdminUser.username == payload.username)).scalars().first()
    if exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")
    user = AdminUser(
        username=payload.username,
        password_hash=get_password_hash(payload.password),
        role=payload.role,
        is_active=payload.is_active,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.put("/{user_id}", response_model=AdminUserOut)
def update_user(
    user_id: int,
    payload: AdminUserUpdate,
    db: Session = Depends(get_db_session),
    _: object = Depends(require_superadmin),
) -> AdminUserOut:
    user = _get_user_or_404(user_id, db)
    data = payload.model_dump(exclude_unset=True)
    if "password" in data:
        user.password_hash = get_password_hash(data.pop("password"))
    for k, v in data.items():
        setattr(user, k, v)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db_session),
    _: object = Depends(require_superadmin),
) -> None:
    user = _get_user_or_404(user_id, db)
    db.delete(user)
    db.commit()
