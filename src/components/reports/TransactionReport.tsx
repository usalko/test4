import React from 'react'
import { TransactionReportForm } from './TransactionReportForm'
import { TransactionReportBody } from './TransactionReportBody'

export interface TransactionReportProps {
    className?: string
}

export const TransactionReport: React.FC<TransactionReportProps> = ({ className = '' }) => (
    <div className={className}>
        <TransactionReportForm/>
        <TransactionReportBody/>
    </div>
);