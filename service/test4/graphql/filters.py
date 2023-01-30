from strawberry_django_plus import gql
from reports import models as reports_models
from django.contrib.auth import models as auth_models


@gql.django.filter(auth_models.User, lookups=True)
class UserFilters:

    first_name: gql.auto
    last_name: gql.auto


@gql.django.filter(reports_models.Transaction, lookups=True)
class TransactionFilters:

    id: gql.auto
    date: gql.auto
    card_number: gql.auto
    ticket_type: gql.auto
    payment_fact: gql.auto
    ticket_type: gql.auto
    route_code: gql.auto
    garage_number: gql.auto
    flight_number: gql.auto
    validator_number: gql.auto
    validator_type: gql.auto
