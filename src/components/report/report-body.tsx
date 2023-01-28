import React from 'react';

export interface ReportBodyProps {
    className?: string;
}

export const ReportBody: React.FC<ReportBodyProps> = ({ className = '' }) => (
    <div className={className}>ReportBody</div>
);