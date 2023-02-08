from os.path import basename, join
from tempfile import mktemp
from typing import Any

from django.conf import settings
from django.contrib.auth import models as auth_models
from reports.models.transaction import Transaction
from test4.graphql.filters import TransactionFilters
from test4.graphql.order import TransactionOrder
from xlsxwriter import Workbook

from .report_job import ReportJob


class TransactionsXlsxReport(ReportJob):

    def execute(self, user: auth_models.User, filters: TransactionFilters = None, order: TransactionOrder = None) -> Any:
        document_root = settings.MEDIA_ROOT
        temporary_filename = mktemp('.xlsx', 'transactions-', document_root)

        # Create an new Excel file and add a worksheet.
        workbook = Workbook(temporary_filename,
                            {'remove_timezone': True})
        worksheet = workbook.add_worksheet()

        # Widen the first column to make the text clearer.
        worksheet.set_column('A:A', 20)

        # Add a bold format to use to highlight cells.
        bold = workbook.add_format({'bold': True})

        worksheet.write('A2', 'ДАТА ТРАНЗАКЦИИ', bold)
        worksheet.write('B2', 'НОМЕР КАРТЫ', bold)
        worksheet.write('C2', 'ТИП БИЛЕТА', bold)
        worksheet.write('D2', 'ФАКТ ОПЛАТЫ', bold)
        worksheet.write('E2', 'КОД МАРШРУТА', bold)
        worksheet.write('F2', 'ГАРАЖНЫЙ НОМЕР', bold)
        worksheet.write('G2', 'НОМЕР РЕЙСА', bold)
        worksheet.write('H2', 'НОМЕР ВАЛИДАТОРА', bold)
        worksheet.write('I2', 'ТИП ВАЛИДАТОРА', bold)

        row_number = 3
        for transaction in Transaction.objects.all():
            worksheet.write(f'A{row_number}', transaction.date)
            worksheet.write(f'B{row_number}', transaction.card_number)
            worksheet.write(f'C{row_number}', transaction.ticket_type)
            worksheet.write(f'D{row_number}', transaction.payment_fact)
            worksheet.write(f'E{row_number}', transaction.route_code)
            worksheet.write(
                f'F{row_number}', transaction.garage and transaction.garage.number)
            worksheet.write(f'G{row_number}', transaction.flight_number)
            worksheet.write(f'H{row_number}', transaction.validator_type)
            worksheet.write(f'I{row_number}', transaction.validator_type)
            row_number += 1

        workbook.close()

        return join(settings.MEDIA_URL, basename(temporary_filename))
