import React from 'react'
import Datepicker from "react-tailwindcss-datepicker"


export interface InputDateRangeFieldProps {
    className?: string,
    hint?: string,
    label?: string,
    initialValue?: {startDate?: Date, finishDate?: Date},
    onChangeValue?: (value: {startDate?: Date, finishDate?: Date}) => void
}

const _asDate = (value: string | null | Date | undefined) => {
    if (value === undefined || value === null) {
        return undefined
    }
    if (String(value) === value) {
        const dateComponents = value.split('-').map((c) => Number.parseInt(c))
        return new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2])
    }
    return value as Date
}

export const InputDateRangeField: React.FC<InputDateRangeFieldProps> = ({ className = '', hint = '', label = '', initialValue, onChangeValue }) => {

    console.log(initialValue)

    return (
    <div className={className}>
        <div className="input-group">
            <label tabIndex={0} className="mt-3 mr-2">{label}</label>
            <div className="w-120">
                <Datepicker i18n="ru"
                    asSingle={false}
                    useRange={true}
                    value={{ startDate: initialValue?.startDate!, endDate: initialValue?.finishDate! }} 
                    onChange={async (value) => {
                    if (onChangeValue) {
                        onChangeValue({startDate: _asDate(value?.startDate), finishDate: _asDate(value?.endDate)})
                    }
                }} />
            </div>value.split('-')value.split('-')
        </div>
    </div>
)}