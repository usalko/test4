from django.db import models
from .park import Park

# Create your models here.


class Garage(models.Model):
    number = models.CharField('Номер гаража', max_length=40)
    park_id: int
    # park = models.ForeignKey[Park](
    #     Park,
    #     on_delete=models.CASCADE,
    #     related_name="parks",
    #     related_query_name="park",
    # )

    class Meta:
        verbose_name = 'гараж'
        verbose_name_plural = 'гаражи'
