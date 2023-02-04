from typing import Iterable, Iterator, List, Optional, cast

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
    Parks_relay_connection: relay.Connection[Park] = gql.django.connection(
        filters=ParkFilters, order=ParkOrder)
    garage: List[Garage] = gql.django.field(
        filters=GarageFilters, order=GarageOrder, pagination=True)
    Garages_relay_connection: relay.Connection[Garage] = gql.django.connection(
        filters=GarageFilters, order=GarageOrder)
    ticket: List[Ticket] = gql.django.field(
        filters=TicketFilters, order=TicketOrder, pagination=True)
    Tickets_relay_connection: relay.Connection[Ticket] = gql.django.connection(
        filters=GarageFilters, order=GarageOrder)
    transactions: List[Transaction] = gql.django.field(
        filters=TransactionFilters, order=TransactionOrder, pagination=True)
    transactions_relay_connection: relay.Connection[Transaction] = gql.django.connection(
        filters=TransactionFilters, order=TransactionOrder)


schema = gql.Schema(
    query=Query,
    mutation=None,
    extensions=[
        SchemaDirectiveExtension,
        DjangoOptimizerExtension,
    ],
)
