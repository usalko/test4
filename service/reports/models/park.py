from django.db import models

# Create your models here.


class Park(models.Model):
    title = models.CharField('Название', max_length=255)

    class Meta:
        verbose_name = 'парк'
        verbose_name_plural = 'парки'

