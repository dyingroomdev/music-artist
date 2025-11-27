# path: backend/alembic/versions/0003_admin_users_seo.py
"""add admin users and seo settings

Revision ID: 0003
Revises: 0002
Create Date: 2025-11-27
"""
from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "0003"
down_revision = "0002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "admin_users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("username", sa.String(length=150), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("role", sa.String(length=50), nullable=False, server_default="admin"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("username"),
    )
    op.create_index(op.f("ix_admin_users_id"), "admin_users", ["id"], unique=False)

    op.create_table(
        "seo_settings",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("meta_title", sa.String(length=255), nullable=False),
        sa.Column("meta_description", sa.String(length=500), nullable=True),
        sa.Column("og_image_url", sa.String(length=500), nullable=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_seo_settings_id"), "seo_settings", ["id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_seo_settings_id"), table_name="seo_settings")
    op.drop_table("seo_settings")
    op.drop_index(op.f("ix_admin_users_id"), table_name="admin_users")
    op.drop_table("admin_users")
