"""standup financial data tables for companies

Revision ID: b80d5d4ba9f4
Revises: 6a9c12b2609f
Create Date: 2023-08-20 02:29:27.415520

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID
import json
from app import models
from sqlalchemy.orm import sessionmaker, Session


# revision identifiers, used by Alembic.
revision = 'b80d5d4ba9f4'
down_revision = '6a9c12b2609f'
branch_labels = None
depends_on = None

def import_data(session):
    f = open('static_data/metric_types.json')
    metric_types = json.load(f)
    f.close()

    db_metric_types = list(map(
        lambda mt: models.metric.MetricType(
            name=mt['name'],
            label=mt['label']
        )
        , metric_types
    ))

    session.add_all(db_metric_types)
    session.commit()
    session.close()



def upgrade() -> None:
    op.create_table(
        'metric_snapshot',
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('created_at', sa.DateTime()),
        sa.Column('updated_at', sa.DateTime()),
        sa.Column('company_id', UUID(as_uuid=True), sa.ForeignKey('company.id'), nullable=False),
        sa.Column('next_estimated_fundraise_date', sa.DateTime()),
        sa.Column('created_by', UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
    )

    op.create_table(
        'metric_type',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, index=True),
        sa.Column('name', sa.String(200)),
        sa.Column('label', sa.String(200)),
    )

    op.create_table(
        'metric_entry',
        sa.Column('created_at', sa.DateTime()),
        sa.Column('updated_at', sa.DateTime()),
        sa.Column('metric_snapshot_id',  UUID(as_uuid=True), sa.ForeignKey('metric_snapshot.id'), nullable=False),
        sa.Column('metric_type_id', sa.Integer(), sa.ForeignKey('metric_type.id'), nullable=False),
        sa.Column('value', sa.Float()),
        sa.Column('value_type', sa.String(100)),
        sa.Column('created_by', UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.PrimaryKeyConstraint('metric_snapshot_id', 'metric_type_id'),
    )

    bind = op.get_bind()
    session = Session(bind=bind)

    import_data(session)


def downgrade() -> None:
    op.drop_table('metric_entry')
    op.drop_table('metric_type')
    op.drop_table('metric_snapshot')
