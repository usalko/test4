import cn from 'classnames'

import React, { useState } from 'react'
import Datepicker from "react-tailwindcss-datepicker"
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types'


export interface InputDateRangeFieldProps {
    className?: string,
    inputClassName?: string,
    hint?: string,
    label?: string,
    initialValue?: { startDate?: Date, finishDate?: Date },
    onChangeValue?: (value: { startDate?: Date, finishDate?: Date }) => void
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

export interface InputDateRangeFieldState {
    value: DateValueType
}

export const InputDateRangeField: React.FC<InputDateRangeFieldProps> = ({ className = '', inputClassName = '', hint = '', label = '', initialValue, onChangeValue }) => {

    const [state, setState] = useState<InputDateRangeFieldState>({
        value: { startDate: initialValue?.startDate!, endDate: initialValue?.finishDate! },
    })

    // console.debug(initialValue)

    return (
        <div className={className}>
            <div className="input-group pr-3">
                <p tabIndex={0} className="mt-3 mr-2 text-left">{label}</p>
                <Datepicker i18n="ru"
                    asSingle={false}
                    displayFormat="DD.MM.YYYY"
                    classNames={{
                        container: (p) => {
                            return 'relative w-full'
                        },
                        input: (p) => {
                            return `input input-bordered ${inputClassName}`
                        },
                        toggleButton: (p) => {
                            return 'hidden'
                        },
                        footer: (p) => {
                            return 'hidden'
                        },
                    }}
                    useRange={true}
                    value={state.value}
                    onChange={async (value) => {
                        const newValue = { startDate: _asDate(value?.startDate), finishDate: _asDate(value?.endDate) }
                        setState({ ...state, value: { startDate: newValue.startDate!, endDate: newValue.finishDate! } })
                        if (onChangeValue) {
                            onChangeValue(newValue)
                        }
                    }} />
                <button className={`${'btn btn-ghost border-opacity-20 pl-1 pr-2'} ${cn({
                    'invisible': !(state.value?.startDate && state.value?.endDate)
                })}`}
                    onClick={(event) => {
                        if (onChangeValue) {
                            onChangeValue({})
                        }
                        setState((state) => { return { ...state, value: { startDate: null, endDate: null } } })
                    }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7"
                        fill="none"
                        viewBox="0 0 20 24"
                        width="20"
                        height="24"
                        stroke="currentColor"
                        opacity={state.value?.startDate || state.value?.endDate ? 0.4 : 0}
                        strokeWidth="1"
                    >
                        <path
                            strokeLinecap="square"
                            strokeLinejoin="miter"
                            d="m 10,14 2,-2 m 0,0 2,-2 m -2,2 -2,-2 m 2,2 2,2 M 1,12 7.414,18.414 A 2,2 0 0 0 8.828,19 H 17 a 2,2 0 0 0 2,-2 V 7 A 2,2 0 0 0 17,5 H 8.828 A 2,2 0 0 0 7.414,5.586 Z"
                            id="path2" />
                    </svg>
                </button>

            </div>
        </div>
    )
}