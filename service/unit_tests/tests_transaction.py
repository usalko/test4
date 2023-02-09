from django.test import TestCase
from reports.models import Transaction, Park, Garage
from faker import Faker
from random import randint     

class TestsTransaction(TestCase):
    def setUp(self):
        # Animal.objects.create(name="lion", sound="roar")
        # Animal.objects.create(name="cat", sound="meow")
        Park.objects.create(title='Парк 1')
        Park.objects.create(title='Парк 22')
        
        for i in range(0, 10):
            Garage.objects.create(number=f'{randint(1234, 9345)}', park_id=randint(1, 2))        

    def test_utility(self):
        park1 = Park.objects.get(title='Парк 1')
        self.assertEqual(park1.title, 'Парк 1')