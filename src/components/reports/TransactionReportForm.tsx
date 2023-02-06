import { useLazyQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import { GET_GARAGES, _nodeToGarage } from '../../apollo/get-garages';
import { GET_PARKS, _nodeToPark } from '../../apollo/get-parks';
import { GET_TICKETS, _nodeToTicketNumber } from '../../apollo/get-tickets';
import { TransactionReportFilter } from '../../filters/TransactionReportFilter';
import { Garage } from '../../model/Garage';
import { Park } from '../../model/Park';
import ComboBox from '../gears/ComboBox';
import { InputDateField } from '../gears/InputDateField';


const ParkComboBox = ComboBox<Park>()
const GarageComboBox = ComboBox<Garage>()
const TicketComboBox = ComboBox<string>()


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
    filteredParksRequestsCount: number,
    filteredGaragesRequestsCount: number,
    filteredTicketsRequestsCount: number,
}


export const TransactionReportForm: React.FC<TransactionReportFormProps> = ({ className = '', filter, onExecute, onUpload }) => {

    const [state, setState] = useState<TransactionReportFormState>({
        ...filter,
        filteredParks: [],
        filteredGarages: [],
        filteredTickets: [],
        filteredParksRequestsCount: 0,
        filteredGaragesRequestsCount: 0,
        filteredTicketsRequestsCount: 0,
    })

    console.log(`State of transaction report form is ${JSON.stringify(state)}`)

    const [getParks] = useLazyQuery(GET_PARKS, { variables: { filters: { title: { startsWith: state.parkName || '' } } } })

    const fetchParks = useCallback(async () => {
        getParks({ variables: { filters: { title: { startsWith: state.parkName || '' } } } }).then((result) => {
            state.filteredParks.length = 0
            state.filteredParks.push(...(result.data?.parksRelayConnection.edges.map((node: any) => _nodeToPark(node.node)) || []))
            setState({ ...state, filteredParksRequestsCount: state.filteredParksRequestsCount + 1 })
            console.log(`Set value to parks, count is ${result.data?.parksRelayConnection.totalCount}`)
        })
    }, [getParks, state.parkName])

    const [getGarages] = useLazyQuery(GET_GARAGES, { variables: { filters: { number: { startsWith: state.garageNumber || '' } } } })

    const fetchGarages = useCallback(async () => {
        getGarages({ variables: { filters: { number: { startsWith: state.garageNumber || '' } } } }).then((result) => {
            state.filteredGarages.length = 0
            state.filteredGarages.push(...(result.data?.garagesRelayConnection.edges.map((node: any) => _nodeToGarage(node.node)) || []))
            setState({ ...state, filteredGaragesRequestsCount: state.filteredGaragesRequestsCount + 1 })
            console.log(`Set value to garages, count is ${result.data?.garagesRelayConnection.totalCount}`)
        })
    }, [getGarages, state.garageNumber])

    const [getTickets] = useLazyQuery(GET_TICKETS, { variables: { ticketNumber: state.ticketNumber || '' } })

    const fetchTickets = useCallback(async () => {
        getTickets({ variables: { ticketNumber: state.ticketNumber || '' } }).then((result) => {
            state.filteredTickets.length = 0
            state.filteredTickets.push(...(result.data?.transactionsRelayConnection.edges.map((node: any) => _nodeToTicketNumber(node.node)) || []))
            setState({ ...state, filteredTicketsRequestsCount: state.filteredTicketsRequestsCount + 1 })
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

    const _parkTitle = (park: Park | string) => String(park) === park ? park : (park as Park).title
    const _garageNumber = (garage: Garage | string) => String(garage) === garage ? garage : (garage as Garage).number

    return (
        <div className={className}>
            <div className="form-control flex-row m-5">
                <ParkComboBox label="Выберите парк:"
                    items={state.filteredParks}
                    requestsCount={state.filteredParksRequestsCount}
                    initialSearchString={state.parkName}
                    itemTitle={_parkTitle}
                    onChangeValue={(value) => setState({ ...state, parkName: _parkTitle(value) })} />
                <GarageComboBox label="Укажите гаражный номер:" className="ml-5"
                    items={state.filteredGarages}
                    initialSearchString={state.garageNumber}
                    requestsCount={state.filteredGaragesRequestsCount}
                    itemTitle={_garageNumber}
                    onChangeValue={(value) => setState({ ...state, garageNumber: _garageNumber(value) })} />
                <InputDateField label="Выберите период c: " className="ml-5"
                    initialValue={state.startDate}
                    onChangeValue={(value) => setState({ ...state, startDate: value })} />
                <InputDateField label="по: " className="ml-5"
                    initialValue={state.finishDate}
                    onChangeValue={(value) => setState({ ...state, finishDate: value })} />
                <TicketComboBox label="Укажите номер Билета:" className="ml-5"
                    items={state.filteredTickets}
                    requestsCount={state.filteredTicketsRequestsCount}
                    initialSearchString={state.ticketNumber}
                    onChangeValue={(value) => setState({ ...state, ticketNumber: value })} />

                <button className="btn btn-primary btn-outline ml-10" onClick={async () => {
                    if (onExecute) {
                        const filter: TransactionReportFilter = state as TransactionReportFilter
                        onExecute({ ...filter })
                    }
                }}>Выбрать</button>
            </div>
            <article className="prose flex-row max-w-[100%]">
                <h2 className="text-left ml-5 max-w-[100%]">Транзакции по гаражному номеру и дате: Автобусный парк № {state.parkName || '*'},
                    Гаражный номер {state.garageNumber || '*'} в период c {state.startDate?.toLocaleDateString('ru-RU')} по {state.finishDate?.toLocaleDateString('ru-RU')}
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