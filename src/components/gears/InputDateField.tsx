import React from 'react'
import Datepicker from 'react-tailwindcss-datepicker'


export interface InputDateFieldProps {
    className?: string,
    hint?: string,
    label?: string,
    initialValue?: Date,
    onChangeValue?: (value: Date | undefined) => void
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

export const InputDateField: React.FC<InputDateFieldProps> = ({ className = '', hint = '', label = '', initialValue = null, onChangeValue }) => {

    return (
    <div className={className}>
        <div className="input-group">
            <label tabIndex={0} className="mt-3 mr-2">{label}</label>
            <div className="w-120">
                <Datepicker i18n="ru"
                    asSingle={true}
                    useRange={false}
                    value={{ startDate: initialValue, endDate: initialValue }} 
                    onChange={async (value) => {
                    if (onChangeValue) {
                        onChangeValue(_asDate(value?.startDate))
                    }
                }} />
            </div>
        </div>
    </div>
)}