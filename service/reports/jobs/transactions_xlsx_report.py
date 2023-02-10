from os.path import basename, join
from tempfile import mktemp
from typing import Any

from django.conf import settings
from django.contrib.auth import models as auth_models
from django.db.models import Q, QuerySet
from reports.models.transaction import Transaction
from test4.graphql.filters import TransactionFilters
from test4.graphql.order import TransactionOrder
from xlsxwriter import Workbook
from strawberry_django_plus.filters import _build_filter_kwargs
from strawberry_django_plus.type import JointType

from .report_job import ReportJob


class TransactionsXlsxReport(ReportJob):

    def _filters_as_queryset(self, filters: TransactionFilters) -> QuerySet:
        if filters:
            filter_kwargs, _ = _build_filter_kwargs(filters)
            filters_kwargs_expressions = None
            for filter_key_and_joint_type, filter_value in filter_kwargs.items():
                filter_key, filter_joint_type = filter_key_and_joint_type
                if filters_kwargs_expressions is None and filter_joint_type != JointType.NOT:
                    filters_kwargs_expressions = Q(
                        **{filter_key: filter_value})
                elif filters_kwargs_expressions is None and filter_joint_type == JointType.NOT:
                    filters_kwargs_expressions = ~Q(
                        **{filter_key: filter_value})
                elif not (filters_kwargs_expressions is None) and filter_joint_type == JointType.AND:
                    filters_kwargs_expressions &= Q(
                        **{filter_key: filter_value})
                elif not (filters_kwargs_expressions is None) and filter_joint_type == JointType.OR:
                    filters_kwargs_expressions |= Q(
                        **{filter_key: filter_value})
                elif not (filters_kwargs_expressions is None) and filter_joint_type == JointType.NOT:
                    filters_kwargs_expressions &= ~Q(
                        **{filter_key: filter_value})
                else:
                    raise BaseException(
                        f"Not implemented case: (filter_key, filter_joint_type, filter_value) {filter_key}, {filter_joint_type}, {filter_value}")
            return Transaction.objects.filter(filters_kwargs_expressions)

        return Transaction.objects.all()

    def execute(self, user: auth_models.User, filters: TransactionFilters = None, order: TransactionOrder = None) -> Any:
        document_root = settings.MEDIA_ROOT
        temporary_filename = mktemp('.xlsx', 'transactions-', document_root)

        # Create an new Excel file and add a worksheet.
        workbook = Workbook(temporary_filename,
                            {'remove_timezone': True})
        worksheet = workbook.add_worksheet()

        # Add a bold format to use to highlight cells.
        header_format = workbook.add_format({
            'bold': True,
            'text_wrap': True,
            'align': 'center',
            'valign': 'vcenter',
        })

        # Set columns headers and widths
        worksheet.write('A2', 'ДАТА ТРАНЗАКЦИИ', header_format)
        worksheet.set_column('A:A', 20)
        worksheet.write('B2', 'НОМЕР КАРТЫ', header_format)
        worksheet.set_column('B:B', 20)
        worksheet.write('C2', 'ТИП БИЛЕТА', header_format)
        worksheet.set_column('C:C', 10)
        worksheet.write('D2', 'ФАКТ ОПЛАТЫ', header_format)
        worksheet.set_column('D:D', 10)
        worksheet.write('E2', 'КОД МАРШРУТА', header_format)
        worksheet.set_column('E:E', 12)
        worksheet.write('F2', 'ГАРАЖНЫЙ НОМЕР', header_format)
        worksheet.set_column('F:F', 12)
        worksheet.write('G2', 'НОМЕР РЕЙСА', header_format)
        worksheet.set_column('G:G', 10)
        worksheet.write('H2', 'НОМЕР ВАЛИДАТОРА', header_format)
        worksheet.set_column('H:H', 20)
        worksheet.write('I2', 'ТИП ВАЛИДАТОРА', header_format)
        worksheet.set_column('I:I', 15)

        worksheet.set_row(1, 40)  # Set the height of Row 2 to 40.

        # Date format
        date_format = workbook.add_format(
            {'num_format': 'dd.mm.yyyy hh:mm:ss'})

        row_number = 3
        for transaction in self._filters_as_queryset(filters):
            worksheet.write(f'A{row_number}', transaction.date, date_format)
            worksheet.write(f'B{row_number}', transaction.card_number)
            worksheet.write(f'C{row_number}', transaction.ticket_type)
            worksheet.write(f'D{row_number}', int(transaction.payment_fact))
            worksheet.write(f'E{row_number}', transaction.route_code)
            worksheet.write(
                f'F{row_number}', transaction.garage and transaction.garage.number)
            worksheet.write(f'G{row_number}', transaction.flight_number)
            worksheet.write(f'H{row_number}', transaction.validator_number)
            worksheet.write(f'I{row_number}', transaction.validator_type)
            row_number += 1

        worksheet.freeze_panes(0, 1)
        workbook.close()

        return join(settings.MEDIA_URL, basename(temporary_filename))
