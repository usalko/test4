import React from 'react'

export interface ReportFormProps {
    className?: string
}

export const ReportForm: React.FC<ReportFormProps> = ({ className = '' }) => (
    <div className={className}>
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">Remember me</span>
                <input type="checkbox" checked className="checkbox" />
            </label>
        </div>
    </div>
);