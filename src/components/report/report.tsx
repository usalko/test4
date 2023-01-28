import React from 'react'
import { ReportForm } from './report-form'
import { ReportBody } from './report-body'

export interface ReportProps {
    className?: string
}

export const Report: React.FC<ReportProps> = ({ className = '' }) => (
    <div className={className}>
        <ReportForm/>
        <ReportBody/>
    </div>
);