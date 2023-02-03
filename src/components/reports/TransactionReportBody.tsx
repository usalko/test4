import React from 'react';
import TransactionTable from '../data-driven/TransactionTable';
import { TransactionReportFilter } from './TransactionReportForm'


export interface TransactionReportBodyProps {
    className?: string
    filter?: TransactionReportFilter
}

export const TransactionReportBody: React.FC<TransactionReportBodyProps> = ({ className = '', filter }) => {

    console.log(`Filter is ${JSON.stringify(filter)}`)

    return (
    <div className={className}>
        <TransactionTable />
    </div>
)}