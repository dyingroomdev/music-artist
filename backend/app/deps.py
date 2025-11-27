# path: backend/app/deps.py
from __future__ import annotations

from typing import Generator

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from .config import Settings, settings
from .db import get_db
from .schemas import TokenData

http_bearer = HTTPBearer(auto_error=False)


def get_settings() -> Settings:
    return settings


def get_db_session() -> Generator[Session, None, None]:
    yield from get_db()


def get_current_admin_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(http_bearer),
    app_settings: Settings = Depends(get_settings),
    db: Session = Depends(get_db_session),
) -> TokenData:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    token = credentials.credentials
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials"
    )
    try:
        payload = jwt.decode(token, app_settings.JWT_SECRET_KEY, algorithms=[app_settings.JWT_ALGORITHM])
        username: str | None = payload.get("sub")
        role: str | None = payload.get("role")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    from .models import AdminUser  # local import to avoid circular
    from sqlalchemy import select

    user = (
        db.execute(select(AdminUser).where(AdminUser.username == username, AdminUser.is_active.is_(True)))
        .scalars()
        .first()
    )
    if not user:
        # Fallback: allow env-configured admin even if row missing (e.g., old token before seed)
        if username == app_settings.ADMIN_USERNAME:
            return TokenData(username=username, role=role or "superadmin")
        raise credentials_exception
    return TokenData(username=user.username, role=role or user.role)


def require_superadmin(
    token_data: TokenData = Depends(get_current_admin_user),
) -> TokenData:
    if token_data.role != "superadmin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Superadmin required")
    return token_data
