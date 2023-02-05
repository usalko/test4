from typing import Optional
from django.contrib.auth import models as auth_models
from reports import models as reports_models
from strawberry_django_plus import gql


@gql.django.filter(auth_models.User, lookups=True)
class UserFilters:

    first_name: gql.auto
    last_name: gql.auto


@gql.django.filter(reports_models.Park, lookups=True)
class ParkFilters:

    id: gql.auto
    title: gql.auto


@gql.django.filter(reports_models.Garage, lookups=True)
class GarageFilters:

    id: gql.auto
    number: gql.auto
    park: Optional['ParkFilters']


@gql.django.filter(reports_models.Transaction, lookups=True)
class TransactionFilters:

    id: gql.auto
    date: gql.auto
    card_number: gql.auto
    ticket_type: gql.auto
    payment_fact: gql.auto
    ticket_type: gql.auto
    route_code: gql.auto
    garage: Optional['GarageFilters']
    flight_number: gql.auto
    validator_number: gql.auto
    validator_type: gql.auto
    ticket_number: gql.auto
