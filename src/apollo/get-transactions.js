import { gql } from '@apollo/client';
import { TransactionReportFilter } from '../filters/TransactionReportFilter'

export const GET_TRANSACTIONS = (filter) => {
  const filters = ''
  return (gql`query TransactionsWithCursorPagination {
    transactionsRelayConnection(
    first: 10
    ${filters}
  ) {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    totalCount
    edges {
      node {
        date
        cardNumber
        ticketType
        paymentFact
        routeCode
        garageNumber
        flightNumber
        validatorNumber
        validatorType
      }
    }
  }
}
`)
};
