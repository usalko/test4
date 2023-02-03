import React, { useState } from 'react'
import { ComboBox } from '../gears/ComboBox'
import { InputField } from '../gears/InputField'
import { InputDateField } from '../gears/InputDateField'

export interface TransactionReportFilter {
    parkName?: string
    garageNumber?: string
    startDate?: Date
    finishDate?: Date
    ticketNumber?: string
}

export interface TransactionReportFormProps {
    className?: string
    onExecute?: (filter: TransactionReportFilter) => void
    onUpload?: (filter: TransactionReportFilter) => void
}

export const TransactionReportForm: React.FC<TransactionReportFormProps> = ({ className = '', onExecute, onUpload }) => {

    const [state, setValue] = useState<TransactionReportFilter>({
        parkName: '1',
        garageNumber: '01',
        startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60),
        finishDate: new Date(),
        ticketNumber: ''
    })

    return (
        <div className={className}>
            <div className="form-control flex-row m-5">
                <ComboBox label="Выберите парк:" items={["1", "2", "3"]} />
                <InputField label="Укажите Гаражный Номер:" className="ml-5"
                    initialValue={state.garageNumber}
                    onChangeValue={(value) => setValue({ ...state, garageNumber: value })} />
                <InputDateField label="Выберите период c: " className="ml-5"
                    initialValue={state.startDate}
                    onChangeValue={(value) => setValue({...state, startDate: value})}/>
                <InputDateField label="по: " className="ml-5"
                    initialValue={state.finishDate}
                    onChangeValue={(value) => setValue({...state, finishDate: value})}/>
                <InputField label="Укажите Номер Билета:" className="ml-5"
                    initialValue={state.ticketNumber}
                    onChangeValue={(value) => setValue({ ...state, ticketNumber: value })} />
                <button className="btn btn-primary btn-outline ml-10" onClick={async () => {
                    if (onExecute) {
                        onExecute(state)
                    }
                }}>Выбрать</button>
            </div>
            <article className="prose flex-row">
                <h2 className="text-left ml-5">Транзакции по гаражному номеру и дате: Автобусный парк № {state.parkName},
                    Гаражный номер {state.garageNumber} в период c {state.startDate?.toISOString().split("T")[0]} по {state.finishDate?.toISOString().split("T")[0]}
                </h2>
            </article>
            <div className="flex-row w-max mt-2">
                <button className="btn btn-primary btn-outline ml-4" onClick={async () => {
                    if (onUpload) {
                        onUpload(state)
                    }
                }}>Выгрузить отчет</button>
            </div>
        </div>
    )
}