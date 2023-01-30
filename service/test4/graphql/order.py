from strawberry_django_plus import gql
from reports import models as reports_models
from django.contrib.auth import models as auth_models


@gql.django.order(auth_models.User)
class UserOrder:

    first_name: gql.auto
    last_name: gql.auto


@gql.django.order(reports_models.Transaction)
class TransactionOrder:

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
