import { gql } from '@apollo/client'
import { Garage } from '../model/Garage'


export const GET_GARAGES = gql`query GaragesWithCursorPagination ($filters: GarageFilters!) {
    garagesRelayConnection(
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
        number
      }
    }
  }
}
`

/**
 * Convert result item (node) to Garage
 * 
 * @param node 
 * @returns Garage
 */
export const _nodeToGarage = (node: any) => ({
  id: node.id,
  number: node.number,
} as Garage)
