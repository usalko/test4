import React from 'react';
import DataTable from '../data-driven/DataTable';
import { TransactionReportFilter } from './TransactionReportForm'
import { Transaction } from '../../model/Transaction';
import data from '../../data/transactions.json'
import { userColumnDefs as transactionColumnDefs } from '../data-driven/TransactionColumnDefs';


export interface TransactionReportBodyProps {
    className?: string
    filter?: TransactionReportFilter
}

const TransactionTable = DataTable<Transaction>()

export const TransactionReportBody: React.FC<TransactionReportBodyProps> = ({ className = '', filter }) => {

    console.debug(`Filter is ${JSON.stringify(filter)}`)

    return (
    <div className={className}>
        <TransactionTable data={(data as any[]) as Transaction[]} columnDefs={transactionColumnDefs}/>
    </div>
)}