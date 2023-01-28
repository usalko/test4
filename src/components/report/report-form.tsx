import React from 'react';

export interface ReportFormProps {
    className?: string;
}

export const ReportForm: React.FC<ReportFormProps> = ({ className = '' }) => (
    <div className={className}>ReportForm</div>
);