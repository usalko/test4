import { useLazyQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import { GET_GARAGES, _nodeToGarage } from '../../apollo/get-garages';
import { GET_PARKS, _nodeToPark } from '../../apollo/get-parks';
import { GET_TICKETS, _nodeToTicketNumber } from '../../apollo/get-tickets';
import { TransactionReportFilter } from '../../filters/TransactionReportFilter';
import { Garage } from '../../model/Garage';
import { Park } from '../../model/Park';
import { ComboBox } from '../gears/ComboBox';
import { InputDateField } from '../gears/InputDateField';


export interface TransactionReportFormProps {
    className?: string
    filter?: TransactionReportFilter
    onExecute?: (filter: TransactionReportFilter) => void
    onUpload?: (filter: TransactionReportFilter) => void
}


export interface TransactionReportFormState extends TransactionReportFilter {
    filteredParks: Park[],
    filteredGarages: Garage[],
    filteredTickets: string[],
}


export const TransactionReportForm: React.FC<TransactionReportFormProps> = ({ className = '', filter, onExecute, onUpload }) => {

    const [state, setValue] = useState<TransactionReportFormState>({
        ...filter,
        filteredParks: [],
        filteredGarages: [],
        filteredTickets: [],
    })

    console.log(`State of transaction report form is ${JSON.stringify(state)}`)

    const [getParks] = useLazyQuery(GET_PARKS, { variables: { filters: { title: { startsWith: state.parkName || '' } } } })

    const fetchParks = useCallback(async () => {
        getParks({ variables: { filters: { title: { startsWith: state.parkName || '' } } } }).then((result) => {
            state.filteredParks.length = 0
            state.filteredParks.push(...(result.data?.parksRelayConnection.edges.map((node: any) => _nodeToPark(node.node)) || [] ))
            console.log(`Set value to parks, count is ${result.data?.parksRelayConnection.totalCount}`)
        })
    }, [getParks, state.parkName])

    const [getGarages] = useLazyQuery(GET_GARAGES, { variables: { filters: { number: { startsWith: state.garageNumber || '' } } } })

    const fetchGarages = useCallback(async () => {
        getGarages({ variables: { filters: { number: { startsWith: state.garageNumber || '' } } } }).then((result) => {
            state.filteredGarages.length = 0
            state.filteredGarages.push(...(result.data?.garagesRelayConnection.edges.map((node: any) => _nodeToGarage(node.node)) || [] ))
            console.log(`Set value to garages, count is ${result.data?.garagesRelayConnection.totalCount}`)
        })
    }, [getGarages, state.garageNumber])

    const [getTickets] = useLazyQuery(GET_TICKETS, { variables: { ticketNumber: state.ticketNumber || '' } })

    const fetchTickets = useCallback(async () => {
        getTickets({ variables: { ticketNumber: state.ticketNumber || '' } }).then((result) => {
            state.filteredTickets.length = 0
            state.filteredTickets.push(...(result.data?.transactionsRelayConnection.edges.map((node: any) => _nodeToTicketNumber(node.node)) || [] ))
            console.log(`Set value to tickets, count is ${result.data?.transactionsRelayConnection.totalCount}`)
        })
    }, [getTickets, state.ticketNumber])

    useEffect(() => {
        fetchTickets().catch(console.error)
    }, [fetchTickets])

    useEffect(() => {
        fetchParks().catch(console.error)
    }, [fetchParks])

    useEffect(() => {
        fetchGarages().catch(console.error)
    }, [fetchGarages])

    // console.log(`State of form is ${JSON.stringify(state)}`)

    return (
        <div className={className}>
            <div className="form-control flex-row m-5">
                <ComboBox label="Выберите парк:"
                    items={state.filteredParks?.map((park) => ({ key: park.id, title: park.title }))}
                    initialTitle={state.parkName}
                    onChangeValue={(value) => setValue({ ...state, parkName: value.title })} />
                <ComboBox label="Укажите гаражный номер:" className="ml-5"
                    items={state.filteredGarages?.map((garage) => ({ key: garage.id, title: garage.number }))}
                    initialTitle={state.garageNumber}
                    onChangeValue={(value) => setValue({ ...state, garageNumber: value.title })} />
                <InputDateField label="Выберите период c: " className="ml-5"
                    initialValue={state.startDate}
                    onChangeValue={(value) => setValue({ ...state, startDate: value })} />
                <InputDateField label="по: " className="ml-5"
                    initialValue={state.finishDate}
                    onChangeValue={(value) => setValue({ ...state, finishDate: value })} />
                <ComboBox label="Укажите Номер Билета:" className="ml-5"
                    items={state.filteredTickets?.map((ticketNumber) => ({ key: ticketNumber, title: ticketNumber }))}
                    initialTitle={state.ticketNumber}
                    onChangeValue={(value) => setValue({ ...state, ticketNumber: value.title })} />

                <button className="btn btn-primary btn-outline ml-10" onClick={async () => {
                    if (onExecute) {
                        const filter: TransactionReportFilter = state as TransactionReportFilter
                        onExecute({ ...filter })
                    }
                }}>Выбрать</button>
            </div>
            <article className="prose flex-row max-w-[100%]">
                <h2 className="text-left ml-5 max-w-[100%]">Транзакции по гаражному номеру и дате: Автобусный парк № {state.parkName},
                    Гаражный номер {state.garageNumber} в период c {state.startDate?.toISOString().split("T")[0]} по {state.finishDate?.toISOString().split("T")[0]}
                </h2>
            </article>
            <div className="flex-row w-max mt-2">
                <button className="btn btn-primary btn-outline ml-4" onClick={async () => {
                    if (onUpload) {
                        onUpload({ ...(state as TransactionReportFilter) })
                    }
                }}>Выгрузить отчет</button>
            </div>
        </div>
    )
}