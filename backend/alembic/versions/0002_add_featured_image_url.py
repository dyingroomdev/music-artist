# path: backend/alembic/versions/0002_add_featured_image_url.py
"""add featured_image_url to shows

Revision ID: 0002
Revises: 0001
Create Date: 2025-11-27
"""
from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "0002"
down_revision = "0001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("shows", sa.Column("featured_image_url", sa.String(length=500), nullable=True))


def downgrade() -> None:
    op.drop_column("shows", "featured_image_url")
