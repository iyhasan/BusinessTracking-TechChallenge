"""stand up company tables

Revision ID: 6a9c12b2609f
Revises: f20d441e1153
Create Date: 2023-08-17 04:36:44.712043

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

import json
from sqlalchemy.orm import sessionmaker, Session
from app import models

import os


# revision identifiers, used by Alembic.
revision = '6a9c12b2609f'
down_revision = 'f20d441e1153'
branch_labels = None
depends_on = None

def import_data(session):
    f = open('static_data/industries.json')
    industries = json.load(f)
    f.close()

    f = open('static_data/business_models.json')
    business_models = json.load(f)
    f.close()

    f = open('static_data/companies.json')
    companies = json.load(f)
    f.close()

    db_industries = []

    for main_industry in industries:
        for industry in industries[main_industry]:
            db_industries.append(
                models.company.Industry(
                    name=industry,
                    main_industry=main_industry
                )
            )

    db_business_models = []

    for bm in business_models:
        description = business_models[bm]
        db_business_models.append(
            models.company.BusinessModel(
                name=bm,
                description=description
            )
        )

    db_companies = []
    for company in companies:
        db_companies.append(
            models.company.Company(
                name = company['name'],
                logo_url = company['logo_url'],
                city = company['city'],
                country = company['country'],
                linkedin_url = company['linkedin_url']
            )
        )

    print(f'Num records\tindustries\t{len(db_industries)}')
    print(f'Num records\tbusiness models\t{len(db_business_models)}')
    print(f'Num records\tcompanies\t{len(db_companies)}')

    session.add_all(db_industries)
    session.add_all(db_business_models)
    session.add_all(db_companies)

    session.commit()
    session.close()

def upgrade() -> None:
    op.create_table(
        'company',
        sa.Column('created_at', sa.DateTime()),
        sa.Column('updated_at', sa.DateTime()),
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('name', sa.String(200)),
        sa.Column('logo_url', sa.String()),
        sa.Column('city', sa.String(50)),
        sa.Column('country', sa.String(50)),
        sa.Column('linkedin_url', sa.String())
    )

    op.create_table(
        'industry',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, index=True),
        sa.Column('name', sa.String(100)),
        sa.Column('main_industry', sa.String(100))
    )

    op.create_table(
        'business_model',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, index=True),
        sa.Column('name', sa.String(200)),
        sa.Column('description', sa.String())
    )

    op.create_table(
        'company_industry',
        sa.Column('created_at', sa.DateTime()),
        sa.Column('updated_at', sa.DateTime()),
        sa.Column('company_id', UUID(as_uuid=True), sa.ForeignKey('company.id'), nullable=False),
        sa.Column('industry_id', sa.Integer(), sa.ForeignKey('industry.id'), nullable=False),
        sa.PrimaryKeyConstraint('company_id', 'industry_id')
    )

    op.create_table(
        'company_business_model',
        sa.Column('created_at', sa.DateTime()),
        sa.Column('updated_at', sa.DateTime()),
        sa.Column('company_id', UUID(as_uuid=True), sa.ForeignKey('company.id'), nullable=False),
        sa.Column('business_model_id', sa.Integer(), sa.ForeignKey('business_model.id'), nullable=False),
        sa.PrimaryKeyConstraint('company_id', 'business_model_id')
    )

    bind = op.get_bind()
    session = Session(bind=bind)

    import_data(session)


def downgrade() -> None:
    op.drop_table('company_business_model')
    op.drop_table('company_industry')
    op.drop_table('business_model')
    op.drop_table('industry')
    op.drop_table('company')
