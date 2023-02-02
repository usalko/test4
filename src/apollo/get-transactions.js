import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = (filters = '{}') => {
  return (gql`query TransactionsWithCursorPagination {
    transactionsRelayConnection(
    first: 10
    filters: 
    ${filters}
    , 
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
