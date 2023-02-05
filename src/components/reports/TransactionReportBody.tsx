import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GET_TRANSACTIONS } from '../../apollo/get-transactions';
import DataTable from '../data-driven/DataTable';
import { TransactionReportFilter } from '../../filters/TransactionReportFilter'
import { Transaction } from '../../model/Transaction';
import data from '../../data/transactions.json'
import { userColumnDefs as transactionColumnDefs } from '../data-driven/TransactionColumnDefs';
import { useQuery } from "@apollo/client";


export interface TransactionReportBodyProps {
    className?: string
    filter?: TransactionReportFilter
}

const TransactionTable = DataTable<Transaction>()

export const TransactionReportBody: React.FC<TransactionReportBodyProps> = ({ className = '', filter }) => {

    console.debug(`Filter is ${JSON.stringify(filter)}`)
    const { data, loading, error } = useQuery(GET_TRANSACTIONS(filter))
    const filteredData = data ? data.transactionsRelayConnection.edges.map((node: any) => node.node as Transaction) : []
//HERE <<<<<<<<<<<
    return (
    <div className={className}>
        <TransactionTable data={filteredData} columnDefs={transactionColumnDefs}/>
    </div>
)}