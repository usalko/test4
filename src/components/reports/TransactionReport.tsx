import { useLazyQuery } from '@apollo/client'
import React, { useState } from 'react'
import { _useTransactionFilter } from '../../apollo/get-transactions'
import { GET_TRANSACTIONS_XLSX_REPORT } from '../../apollo/get-transactions-xlsx-report'
import { TransactionReportFilter } from '../../filters/TransactionReportFilter'
import { TransactionReportBody } from './TransactionReportBody'
import { TransactionReportForm } from './TransactionReportForm'


export interface TransactionReportState {
    filter?: TransactionReportFilter
}

export interface TransactionReportProps {
    className?: string
}

export const TransactionReport: React.FC<TransactionReportProps> = ({ className = '' }) => {

    const [state, setState] = useState<TransactionReportState>({
        filter: {
            parkName: '',
            garageNumber: '',
            startDate: new Date('2022-01-01'),
            finishDate: new Date(),
            ticketNumber: '',
        }
    })

    const [getTransactionsXlsxReport] = useLazyQuery(GET_TRANSACTIONS_XLSX_REPORT, { variables: { filters: _useTransactionFilter(state.filter) } })

    return (
        <div className={className}>
            <TransactionReportForm filter={state.filter}
                onExecute={(filterValue) => setState({ filter: filterValue })}
                onDownload={async (filterValue) => {
                    return (await getTransactionsXlsxReport({ variables: { filters: _useTransactionFilter(filterValue) } })).data?.transactionsXlsxReport as string
                }} />
            <TransactionReportBody {...state} />
        </div>
    )
}