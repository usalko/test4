from typing import Iterable, Iterator, List, Optional, cast

from reports.jobs.transactions_xlsx_report import TransactionsXlsxReport
from strawberry.types.info import Info
from strawberry_django_plus import gql
from strawberry_django_plus.directives import SchemaDirectiveExtension
from strawberry_django_plus.gql import relay
from strawberry_django_plus.optimizer import DjangoOptimizerExtension

from .filters import *
from .order import *
from .types import *


@gql.type
class Query:

    node: Optional[gql.Node] = gql.django.node()

    parks: List[Park] = gql.django.field(
        filters=ParkFilters, order=ParkOrder, pagination=True)
    parks_relay_connection: relay.Connection[Park] = gql.django.connection(
        filters=ParkFilters, order=ParkOrder)
    garages: List[Garage] = gql.django.field(
        filters=GarageFilters, order=GarageOrder, pagination=True)
    garages_relay_connection: relay.Connection[Garage] = gql.django.connection(
        filters=GarageFilters, order=GarageOrder)
    transactions: List[Transaction] = gql.django.field(
        filters=TransactionFilters, order=TransactionOrder, pagination=True)
    transactions_relay_connection: relay.Connection[Transaction] = gql.django.connection(
        filters=TransactionFilters, order=TransactionOrder)

    @gql.django.field
    def transactionsXlsxReport(self, info: Info) -> str:
        user = info.context.request.user
        # if not user.is_authenticated:
        #    return None
        return TransactionsXlsxReport().execute(user)


schema = gql.Schema(
    query=Query,
    mutation=None,
    extensions=[
        SchemaDirectiveExtension,
        DjangoOptimizerExtension,
    ],
)
