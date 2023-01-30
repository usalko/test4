import React from 'react'
import Datepicker from "react-tailwindcss-datepicker";

export interface InputDateRangeFieldProps {
    className?: string,
    hint?: string,
    label?: string,
    valueStart?: Date,
    valueEnd?: Date,
}

export const InputDateRangeField: React.FC<InputDateRangeFieldProps> = ({ className = '', hint = '', label = '' }) => (
    <div className={className}>
        <div className="input-group">
            <label tabIndex={0} className="mt-3 mr-2">{label}</label>
            <div className="w-120">
                <Datepicker value={{ startDate: null, endDate: null }} onChange={(value) => {
                    console.log(value)
                }} />
            </div>
        </div>
    </div>
);