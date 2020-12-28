"""unique likes

Revision ID: 18d247a95c14
Revises: d0cb4810abc1
Create Date: 2020-12-05 13:11:12.988131

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '18d247a95c14'
down_revision = 'd0cb4810abc1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('unique', 'likes', ['postId', 'userId'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('unique', 'likes', type_='unique')
    # ### end Alembic commands ###
