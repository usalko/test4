import React, { useState } from 'react'
import { TransactionReportBody } from './TransactionReportBody'
import { TransactionReportForm } from './TransactionReportForm'
import { TransactionReportFilter } from '../../filters/TransactionReportFilter'

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

    return (
        <div className={className}>
            <TransactionReportForm filter={value.filter} onExecute={(filterValue) => setValue({ filter: filterValue })} />
            <TransactionReportBody {...value} />
        </div>
    )
}