# path: backend/app/routers/auth.py
from __future__ import annotations

from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..config import Settings
from ..deps import get_settings, get_db_session
from ..models import AdminUser
from ..schemas import LoginRequest, Token
from ..security import create_access_token, get_password_hash, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
def login_for_access_token(
    login_request: LoginRequest,
    settings: Settings = Depends(get_settings),
    db: Session = Depends(get_db_session),
) -> Token:
    stmt = select(AdminUser).where(AdminUser.username == login_request.username, AdminUser.is_active.is_(True))
    user = db.execute(stmt).scalars().first()
    if user is None and login_request.username == settings.ADMIN_USERNAME and settings.ADMIN_PASSWORD:
        # Seed superadmin from env if not present
        user = AdminUser(
            username=settings.ADMIN_USERNAME,
            password_hash=get_password_hash(settings.ADMIN_PASSWORD),
            role="superadmin",
            is_active=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    if user is None or not verify_password(login_request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username, "role": user.role}, expires_delta=access_token_expires)
    return Token(access_token=access_token)
