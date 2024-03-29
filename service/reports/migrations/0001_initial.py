# Generated by Django 4.1.5 on 2023-02-05 17:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Garage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=40, verbose_name='Номер гаража')),
            ],
            options={
                'verbose_name': 'гараж',
                'verbose_name_plural': 'гаражи',
            },
        ),
        migrations.CreateModel(
            name='Park',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Название')),
            ],
            options={
                'verbose_name': 'парк',
                'verbose_name_plural': 'парки',
            },
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(verbose_name='дата транзакции')),
                ('card_number', models.CharField(max_length=52, verbose_name='номер карты')),
                ('ticket_type', models.CharField(max_length=8, verbose_name='тип билета')),
                ('payment_fact', models.BooleanField(verbose_name='факт оплаты')),
                ('route_code', models.CharField(max_length=8, verbose_name='тип билета')),
                ('flight_number', models.CharField(max_length=8, verbose_name='номер рейса')),
                ('validator_number', models.CharField(max_length=8, verbose_name='номер валидатора')),
                ('validator_type', models.CharField(max_length=8, verbose_name='тип валидатора')),
                ('ticket_number', models.CharField(max_length=10, verbose_name='номер билета')),
                ('garage', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='garages', related_query_name='garage', to='reports.garage')),
            ],
            options={
                'verbose_name': 'транзакция',
                'verbose_name_plural': 'транзакции',
            },
        ),
        migrations.AddField(
            model_name='garage',
            name='park',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parks', related_query_name='park', to='reports.park'),
        ),
    ]
