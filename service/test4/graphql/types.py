# types.py
from django.contrib.auth import models as auth_models

from reports import models as reports_models
from strawberry_django_plus import gql
from strawberry_django_plus.gql import relay


@gql.django.type(auth_models.User)
class User(relay.Node):

    first_name: gql.auto
    last_name: gql.auto


@gql.django.type(reports_models.Transaction)
class Transaction(relay.Node):

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
