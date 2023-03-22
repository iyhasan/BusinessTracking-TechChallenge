"""create users table

Revision ID: f20d441e1153
Revises: 
Create Date: 2023-03-19 16:26:11.120814

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID


# revision identifiers, used by Alembic.
revision = 'f20d441e1153'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('created_at', sa.DateTime()),
        sa.Column('updated_at', sa.DateTime()),
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('email', sa.String()),
        sa.Column('hashed_password', sa.String()),
        sa.Column('first_name', sa.String()),
        sa.Column('last_name', sa.String())
    )

    op.create_table(
        'admins',
        sa.Column('user_id', UUID(as_uuid=True), sa.ForeignKey('users.id'), primary_key=True, nullable=False),
        sa.Column('created_at', sa.DateTime()),
        sa.Column('updated_at', sa.DateTime()),
        sa.Column('is_active', sa.Boolean(), default=False, nullable=False)
    )


def downgrade() -> None:

    op.drop_table(
        'admins'
    )

    op.drop_table(
        'users'
    )
