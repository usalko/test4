from django.db import models

# Create your models here.


class Transaction(models.Model):
    date = models.DateField('дата транзакции')
    card_number = models.CharField('номер карты', max_length=52)
    ticket_type = models.CharField('тип билета', max_length=8)
    payment_fact = models.BooleanField('факт оплаты')
    ticket_type = models.CharField('тип билета', max_length=8)
    route_code = models.CharField('тип билета', max_length=8)
    garage_number = models.CharField('тип билета', max_length=8)
    flight_number = models.CharField('номер рейса', max_length=8)
    validator_number = models.CharField('номер валидатора', max_length=8)
    validator_type = models.CharField('тип валидатора', max_length=8)

    class Meta:
        verbose_name = 'транзакция'
        verbose_name_plural = 'транзакции'
