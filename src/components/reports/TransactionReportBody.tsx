import { useLazyQuery } from '@apollo/client'
import React, { useCallback, useEffect, useState } from 'react'
import { GET_TRANSACTIONS, _nodeToTransaction, _useTransactionFilter } from '../../apollo/get-transactions'
import { TransactionReportFilter } from '../../filters/TransactionReportFilter'
import { Transaction } from '../../model/Transaction'
import DataTable from '../data-driven/DataTable'
import { userColumnDefs as transactionColumnDefs } from '../data-driven/TransactionColumnDefs'


export interface TransactionReportBodyState {
    filteredData: Transaction[]
}


export interface TransactionReportBodyProps {
    className?: string
    filter?: TransactionReportFilter
}


const TransactionTable = DataTable<Transaction>()


export const TransactionReportBody: React.FC<TransactionReportBodyProps> = ({ className = '', filter }) => {

    const [state, setValue] = useState<TransactionReportBodyState>({
        filteredData: []
    })

    console.debug(`Filter is ${JSON.stringify(filter)}`)
    const [getRequest, { loading, error, data, refetch, networkStatus }] = useLazyQuery(GET_TRANSACTIONS, { variables: { filters: _useTransactionFilter(filter) } })

    const fetchData = useCallback(async () => {
        getRequest({ variables: { filters: _useTransactionFilter(filter) } }).then((result) => {
            setValue({ filteredData: result.data.transactionsRelayConnection.edges.map((node: any) => _nodeToTransaction(node.node)) })
            // state.filteredData = result.data.transactionsRelayConnection.edges.map((node: any) => _nodeToTransaction(node.node))
        })
    }, [getRequest, filter])

    useEffect(() => {
        fetchData().catch(console.error)
    }, [fetchData])

    return (
        <div className={className}>
            <TransactionTable data={state.filteredData} columnDefs={transactionColumnDefs} />
        </div>
    )
}