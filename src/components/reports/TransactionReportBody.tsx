import React from 'react';
import TransactionTable from '../data-driven/TransactionTable';

export interface TransactionReportBodyProps {
    className?: string;
}

export const TransactionReportBody: React.FC<TransactionReportBodyProps> = ({ className = '' }) => (
    <div className={className}>
        <TransactionTable />
    </div>
);