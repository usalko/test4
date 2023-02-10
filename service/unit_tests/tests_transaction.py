from datetime import date, datetime, timedelta, timezone
from math import floor
from random import randint
from typing import Tuple

from faker import Faker
from reports.models import Garage, Park, Transaction
from unit_tests.snapshot_database_test_case import \
    SnapshotDatabaseStateTestCase


class TestsTransaction(SnapshotDatabaseStateTestCase):

    @staticmethod
    def _datetime_range_for_flight_number(date_only_obj: date, start_hour: int, end_hour: int,
                                          flight_count: int, flight_number: int) -> Tuple[datetime, datetime]:
        '''
            @flight_number parameter starts with 1
        '''
        date_start = date_only_obj
        # Overnight detection
        date_end = date_only_obj + \
            timedelta(days=1) if end_hour <= start_hour else date_only_obj
        hours_delta = floor((24 - start_hour + end_hour) /
                            flight_count) if end_hour <= start_hour else floor((end_hour - start_hour) / flight_count)

        datetime_start = datetime(date_start.year, date_start.month,
                                  date_start.day, start_hour + (flight_number - 1) * hours_delta, 0)
        datetime_end = datetime(date_end.year, date_end.month, date_end.day,
                                start_hour + flight_number * hours_delta - 1, 59)

        return datetime_start, datetime_end

    def setUp(self):
        Faker.seed(0)
        faker = Faker()

        # References ==================================================

        Park.objects.create(title='Парк 1')
        Park.objects.create(title='Парк 22')

        for i in range(0, 10):
            Garage.objects.create(
                number=f'{randint(1234, 9345)}', park_id=randint(1, 2))

        # Transactions ================================================

        # Simple modeling without real correlations
        routes = [{'code': f'0{randint(1, 3)}{randint(10, 90)}', 'garage_id': randint(
            1, 10)} for _ in range(0, 50)]
        validators = [{'number': f'{randint(100, 900)}{randint(1000, 9000)}', 'type': [
            'E', 'F'][randint(0, 1)]} for _ in range(0, 50)]
        flights_counts = {(faker.date_this_year(), frozenset(routes[randint(
            0, len(routes) - 1)].items())): randint(1, 12) for _ in range(0, 100)}

        # Main parameters for the modelling
        average_tickets_per_flight = 40
        max_transaction_count = 1000
        working_hours_start = 7
        working_hours_end = 23

        flight_number = 1
        ticket_index_in_flight = 0
        flights_counts_keys = list(flights_counts.keys())
        flights_counts_key = flights_counts_keys[randint(
            0, len(flights_counts_keys) - 1)]
        datetime_start, datetime_end = self._datetime_range_for_flight_number(
            flights_counts_key[0], working_hours_start, working_hours_end, flights_counts[flights_counts_key], flight_number)
        # Please consider about more then one validator in the flight
        validator = validators[randint(0, len(validators) - 1)]
        route = dict(flights_counts_key[1])
        for _ in range(0, max_transaction_count):
            if ticket_index_in_flight < average_tickets_per_flight:
                ticket_index_in_flight += 1

            # In current flight
            elif flight_number <= flights_counts[flights_counts_key]:
                datetime_start, datetime_end = self._datetime_range_for_flight_number(
                    flights_counts_key[0], working_hours_start, working_hours_end, flights_counts[flights_counts_key], flight_number)

                flight_number += 1
                ticket_index_in_flight = 0  # Reset ticket index
            else:
                flights_counts_key = flights_counts_keys[randint(
                    0, len(flights_counts_keys))]
                flight_number = 1           # Reset flight number
                ticket_index_in_flight = 0  # Reset ticket index

                datetime_start, datetime_end = self._datetime_range_for_flight_number(
                    flights_counts_key[0], working_hours_start, working_hours_end, flights_counts[flights_counts_key], flight_number)

                # Please consider about more then one validator in the flight
                validator = validators[randint(0, len(validators) - 1)]
                route = dict(flights_counts_key[1])

            Transaction.objects.create(
                date=faker.date_time_between_dates(
                    datetime_start, datetime_end, tzinfo=timezone.utc),
                card_number=faker.credit_card_number(),
                ticket_type=['A', 'B', 'C'][randint(0, 2)],
                payment_fact=[True, False][randint(0, 1)],
                route_code=route['code'],
                garage_id=route['garage_id'],
                flight_number=f'{flight_number:02d}',
                validator_number=validator['number'],
                validator_type=validator['type'],
                ticket_number=f'10{randint(111, 999)}{randint(1111, 9999)}'
            )

    def test_utility(self):
        park1 = Park.objects.get(title='Парк 1')
        self.assertEqual(park1.title, 'Парк 1')
