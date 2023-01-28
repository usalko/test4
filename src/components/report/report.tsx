import React from 'react';

export interface ReportProps {
    className?: string;
}

export const Report: React.FC<ReportProps> = ({ className = '' }) => (
    <div className={className}>Report</div>
);