from django.db import models

from .garage import Garage

# Create your models here.


class Transaction(models.Model):
    date = models.DateTimeField('дата транзакции')
    card_number = models.CharField('номер карты', max_length=52)
    ticket_type = models.CharField('тип билета', max_length=8)
    payment_fact = models.BooleanField('факт оплаты')
    route_code = models.CharField('тип билета', max_length=8)
    garage_id: int
    garage = models.ForeignKey[Garage](
        Garage,
        on_delete=models.CASCADE,
        related_name='garages',
        related_query_name='garage',
    )
    flight_number = models.CharField('номер рейса', max_length=8)
    validator_number = models.CharField('номер валидатора', max_length=8)
    validator_type = models.CharField('тип валидатора', max_length=8)
    ticket_number = models.CharField('номер билета', max_length=10)

    class Meta:
        verbose_name = 'транзакция'
        verbose_name_plural = 'транзакции'
