import { gql } from '@apollo/client';


export const GET_TICKETS = gql`query TicketsWithCursorPagination ($ticketNumber: String!) {
    transactionsRelayConnection(
    first: 10
    filters: {
      ticketNumber: {startsWith: $ticketNumber}
    }
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
        ticketNumber
      }
    }
  }
}
`

/**
 * Convert result item (node) to string
 * 
 * @param node 
 * @returns string
 */
export const _nodeToTicketNumber = (node: any) => (node.ticketNumber)
