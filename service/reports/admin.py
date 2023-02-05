from django.contrib import admin

from .models.garage import *
from .models.transaction import *

# Register your models here.


class ParkAdmin(admin.ModelAdmin):
    ...


class GarageAdmin(admin.ModelAdmin):
    ...


class TransactionAdmin(admin.ModelAdmin):
    ...


admin.site.register(Park, ParkAdmin)
admin.site.register(Garage, GarageAdmin)
admin.site.register(Transaction, TransactionAdmin)
