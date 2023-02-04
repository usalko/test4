from django.db import models

# Create your models here.


class Ticket(models.Model):
    number = models.CharField('Номер билета', max_length=40)

    class Meta:
        verbose_name = 'билет'
        verbose_name_plural = 'билеты'

