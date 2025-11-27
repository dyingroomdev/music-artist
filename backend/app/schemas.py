# path: backend/app/schemas.py
from __future__ import annotations

from datetime import date, time, datetime
from typing import Optional

from pydantic import BaseModel


class HeroSlideBase(BaseModel):
    title: str
    subtitle: Optional[str] = None
    image_url: str
    cta_label: Optional[str] = None
    cta_url: Optional[str] = None
    is_active: bool = True
    sort_order: int = 0


class HeroSlideCreate(HeroSlideBase):
    pass


class HeroSlideUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    image_url: Optional[str] = None
    cta_label: Optional[str] = None
    cta_url: Optional[str] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None


class HeroSlideOut(HeroSlideBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class BioBase(BaseModel):
    headline: str
    content: str
    profile_image_url: Optional[str] = None


class BioCreate(BioBase):
    pass


class BioUpdate(BaseModel):
    headline: Optional[str] = None
    content: Optional[str] = None
    profile_image_url: Optional[str] = None


class BioOut(BioBase):
    id: int
    updated_at: datetime

    model_config = {"from_attributes": True}


class ShowBase(BaseModel):
    title: str
    venue: str
    city: str
    country: str
    show_date: date
    start_time: Optional[time] = None
    is_upcoming: bool = True
    ticket_url: Optional[str] = None
    featured_image_url: Optional[str] = None
    description: Optional[str] = None


class ShowCreate(ShowBase):
    pass


class ShowUpdate(BaseModel):
    title: Optional[str] = None
    venue: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    show_date: Optional[date] = None
    start_time: Optional[time] = None
    is_upcoming: Optional[bool] = None
    ticket_url: Optional[str] = None
    featured_image_url: Optional[str] = None
    description: Optional[str] = None


class ShowOut(ShowBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}


class AdminUserBase(BaseModel):
    username: str
    role: str = "admin"
    is_active: bool = True


class AdminUserCreate(AdminUserBase):
    password: str


class AdminUserUpdate(BaseModel):
    password: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None


class AdminUserOut(AdminUserBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}


class SEOSettingsBase(BaseModel):
    meta_title: str
    meta_description: Optional[str] = None
    og_image_url: Optional[str] = None


class SEOSettingsCreate(SEOSettingsBase):
    pass


class SEOSettingsUpdate(BaseModel):
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    og_image_url: Optional[str] = None


class SEOSettingsOut(SEOSettingsBase):
    id: int
    updated_at: datetime

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[str] = None


class LoginRequest(BaseModel):
    username: str
    password: str
