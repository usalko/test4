import { gql } from '@apollo/client';
import { TransactionReportFilter } from '../filters/TransactionReportFilter';
import { Transaction } from '../model/Transaction';

/**
 * Map filter to filters string
 * 
 * @param {*} filter 
 * @returns filters string
 */

export const _useTransactionFilter = (filter: TransactionReportFilter | undefined) => {
  if (!filter) {
    return { date: { gte: "2022-01-01" } } // Empty conditions
  }
  const conditions: string[] = []
  if (filter.startDate) {
    conditions.push(`"date": {"gte": "${filter.startDate.toISOString()}"}`)
  }
  if (filter.finishDate) {
    conditions.push(`"date": {"lte": "${filter.finishDate.toISOString()}"}`)
  }
  if (filter.garageNumber) {
    conditions.push(`"garage": {"number": {"startsWith": "${filter.garageNumber}"}}`)
  }
  if (filter.parkName) {
    conditions.push(`"garage": {"park": {"title": {"startsWith": "${filter.parkName}"}}}`)
  }
  if (filter.ticketNumber) {
    conditions.push(`"ticketNumber": {"startsWith": "${filter.ticketNumber}"}`)
  }

  const filtersAsString = `{
    ${conditions.reverse().reduce((previousValue, currentValue) => {
    if (previousValue) {
      return `${currentValue},
        "And": {${previousValue}}
        `
    } else {
      return currentValue
    }
  })}
  }`

  // from bottom to up
  return JSON.parse(filtersAsString)
}


/**
 * There is the example for input data
 *   filters: {
 *     date: {gte: "2023-01-01T17:28:43.229Z"},
 *     And: {
 *       date: {lte: "2023-02-05T17:30:09.629Z"},
 *       And: {
 *         garage: {number: {startsWith: "45"}},
 *         And: {
 *           garage: { park: {title: {startsWith: "Парк 1"}}}
 *         }
 *       }
 *     }
 *   }
 * @param {*} filter 
 * @returns graphql string
 */

export const GET_TRANSACTIONS = gql`query TransactionsWithCursorPagination ($filters: TransactionFilters!) {
    transactionsRelayConnection(
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
        date
        cardNumber
        ticketType
        paymentFact
        routeCode
        garage {
          number
        }
        flightNumber
        validatorNumber
        validatorType
      }
    }
  }
}
`

/**
 * Convert result item (node) to Transaction
 * 
 * @param node 
 * @returns Transaction
 */
export const _nodeToTransaction = (node: any) => ({
  date: node.date,
  cardNumber: node.cardNumber,
  ticketType: node.ticketType,
  paymentFact: node.paymentFact,
  routeCode: node.routeCode,
  garageNumber: node.garage?.number,
  flightNumber: node.flightNumber,
  validatorNumber: node.validatorNumber,
  validatorType: node.validatorType
} as Transaction)
