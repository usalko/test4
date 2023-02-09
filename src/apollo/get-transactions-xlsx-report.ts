import { gql } from '@apollo/client';


export const GET_TRANSACTIONS_XLSX_REPORT = gql`query TransactionsXlsxReport($filters: TransactionFilters!) {
  transactionsXlsxReport(filters: $filters)
}
`
