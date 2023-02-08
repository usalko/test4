import { useLazyQuery } from '@apollo/client'
import React, { useState } from 'react'
import url from 'url'
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

    const [value, setValue] = useState<TransactionReportState>({
        filter: {
            parkName: '',
            garageNumber: '',
            startDate: new Date('2022-01-01'),
            finishDate: new Date(),
            ticketNumber: '',
        }
    })

    const [getTransactionsXlsxReport] = useLazyQuery(GET_TRANSACTIONS_XLSX_REPORT)

    return (
        <div className={className}>
            <TransactionReportForm filter={value.filter}
                onExecute={(filterValue) => setValue({ filter: filterValue })}
                onUpload={async (filterValue) => {
                    return (await getTransactionsXlsxReport()).data?.transactionsXlsxReport as string
                }} />
            <TransactionReportBody {...value} />
        </div>
    )
}