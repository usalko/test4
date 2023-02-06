import { gql } from '@apollo/client';
import { Park } from '../model/Park';


export const GET_PARKS = gql`query ParksWithCursorPagination ($filters: ParkFilters!) {
    parksRelayConnection(
    first: 10
    filters: $filters
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
        id
        title
      }
    }
  }
}
`

/**
 * Convert result item (node) to Park
 * 
 * @param node 
 * @returns Park
 */
export const _nodeToPark= (node: any) => ({
  id: node.id,
  title: node.title,
} as Park)
