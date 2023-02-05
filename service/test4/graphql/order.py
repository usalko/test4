from typing import Optional
from strawberry_django_plus import gql
from reports import models as reports_models
from django.contrib.auth import models as auth_models


@gql.django.order(auth_models.User)
class UserOrder:

    first_name: gql.auto
    last_name: gql.auto


@gql.django.order(reports_models.Park)
class ParkOrder:

    id: gql.auto
    title: gql.auto


@gql.django.order(reports_models.Garage)
class GarageOrder:

    id: gql.auto
    number: gql.auto
    park: Optional['ParkOrder']


@gql.django.order(reports_models.Transaction)
class TransactionOrder:

    id: gql.auto
    date: gql.auto
    card_number: gql.auto
    ticket_type: gql.auto
    payment_fact: gql.auto
    ticket_type: gql.auto
    route_code: gql.auto
    garage: Optional['GarageOrder']
    flight_number: gql.auto
    validator_number: gql.auto
    validator_type: gql.auto
    ticket_number: gql.auto
