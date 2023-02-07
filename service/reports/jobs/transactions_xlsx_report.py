from typing import Any
from xlsxwriter import Workbook
from .report_job import ReportJob
from tempfile import mktemp
from django.conf import settings
from os.path import join, basename


class TransactionsXlsxReport(ReportJob):
    
    def execute(self, *args, **kwags) -> Any:
        document_root=settings.MEDIA_ROOT
        temporary_filename = mktemp('.xlsx', 'transactions-', document_root)
        
        # Create an new Excel file and add a worksheet.
        workbook = Workbook(temporary_filename)
        worksheet = workbook.add_worksheet()

        # Widen the first column to make the text clearer.
        worksheet.set_column('A:A', 20)

        # Add a bold format to use to highlight cells.
        bold = workbook.add_format({'bold': True})

        # Write some simple text.
        worksheet.write('A1', 'Hello')

        # Text with formatting.
        worksheet.write('A2', 'World', bold)

        # Write some numbers, with row/column notation.
        worksheet.write(2, 0, 123)
        worksheet.write(3, 0, 123.456)

        # Insert an image.
        # worksheet.insert_image('B5', 'logo.png')
        workbook.close()
        
        return join(settings.MEDIA_URL, basename(temporary_filename))
