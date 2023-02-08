import { useLazyQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import { GET_GARAGES, _nodeToGarage } from '../../apollo/get-garages';
import { GET_PARKS, _nodeToPark } from '../../apollo/get-parks';
import { GET_TICKETS, _nodeToTicketNumber } from '../../apollo/get-tickets';
import { TransactionReportFilter } from '../../filters/TransactionReportFilter';
import { Garage } from '../../model/Garage';
import { Park } from '../../model/Park';
import ComboBox from '../gears/ComboBox';
import { DownloadButton } from '../gears/DownloadButton';
import { InputDateField } from '../gears/InputDateField';


const ParkComboBox = ComboBox<Park>()
const GarageComboBox = ComboBox<Garage>()
const TicketComboBox = ComboBox<string>()


export interface TransactionReportFormProps {
    className?: string
    filter?: TransactionReportFilter
    onExecute?: (filter: TransactionReportFilter) => void
    onUpload?: (filter: TransactionReportFilter) => Promise<string>
}


export interface TransactionReportFormState extends TransactionReportFilter {
    filteredParks: Park[],
    filteredGarages: Garage[],
    filteredTickets: string[],
}


export const TransactionReportForm: React.FC<TransactionReportFormProps> = ({ className = '', filter, onExecute, onUpload }) => {

    const [state, setState] = useState<TransactionReportFormState>({
        ...filter,
        filteredParks: [],
        filteredGarages: [],
        filteredTickets: [],
    })

    const [getParks] = useLazyQuery(GET_PARKS, { variables: { filters: { title: { iStartsWith: state.parkName || '' } } } })

    const fetchParks = useCallback(async () => {
        getParks({ variables: { filters: { title: { iStartsWith: state.parkName || '' } } } }).then((result) => {
            setState((state) => { return { ...state, filteredParks: [...(result.data?.parksRelayConnection.edges.map((node: any) => _nodeToPark(node.node)) || [])] } })
            // console.debug(`Set value to parks, count is ${result.data?.parksRelayConnection.totalCount}`)
        })
    }, [getParks, state.parkName])

    const [getGarages] = useLazyQuery(GET_GARAGES, { variables: { filters: { number: { iStartsWith: state.garageNumber || '' } } } })

    const fetchGarages = useCallback(async () => {
        getGarages({ variables: { filters: { number: { iStartsWith: state.garageNumber || '' } } } }).then((result) => {
            setState((state) => { return { ...state, filteredGarages: [...(result.data?.garagesRelayConnection.edges.map((node: any) => _nodeToGarage(node.node)) || [])] } })
            // console.debug(`Set value to garages, count is ${result.data?.garagesRelayConnection.totalCount}`)
        })
    }, [getGarages, state.garageNumber])

    const [getTickets] = useLazyQuery(GET_TICKETS, { variables: { ticketNumber: state.ticketNumber || '' } })

    const fetchTickets = useCallback(async () => {
        getTickets({ variables: { ticketNumber: state.ticketNumber || '' } }).then((result) => {
            setState((state) => { return { ...state, filteredTickets: [...(result.data?.transactionsRelayConnection.edges.map((node: any) => _nodeToTicketNumber(node.node)) || [])] } })
            // console.debug(`Set value to tickets, count is ${result.data?.transactionsRelayConnection.totalCount}`)
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

    const _parkTitle = (park: Park | string) => String(park) === park ? park : (park as Park).title
    const _garageNumber = (garage: Garage | string) => String(garage) === garage ? garage : (garage as Garage).number

    // console.debug(`State of transaction report form is ${JSON.stringify(state)}`)

    return (
        <div className={className}>
            <div className="form-control flex flex-wrap flex-row m-5">
                <ParkComboBox label="Выберите парк:" className="flex-none" inputClassName="w-24"
                    items={state.filteredParks}
                    initialSearchString={state.parkName}
                    itemTitle={_parkTitle}
                    onChangeValue={(value) => setState((state) => { return { ...state, parkName: _parkTitle(value) } })} />
                <GarageComboBox label="Укажите гаражный номер:" className="flex-none" inputClassName="w-20"
                    items={state.filteredGarages}
                    initialSearchString={state.garageNumber}
                    itemTitle={_garageNumber}
                    onChangeValue={(value) => setState((state) => { return { ...state, garageNumber: _garageNumber(value) } })} />
                <InputDateField label="Выберите период c: " className="flex-none w-60"
                    initialValue={state.startDate}
                    onChangeValue={(value) => setState((state) => { return { ...state, startDate: value } })} />
                <InputDateField label="по: " className="flex-none w-48 ml-5"
                    initialValue={state.finishDate}
                    onChangeValue={(value) => setState((state) => { return { ...state, finishDate: value } })} />
                <TicketComboBox label="Укажите номер Билета:" className="flex-none" inputClassName="w-40"
                    items={state.filteredTickets}
                    initialSearchString={state.ticketNumber}
                    onChangeValue={(value) => setState((state) => { return { ...state, ticketNumber: value } })} />

                <span className="flex-auto w-1" />

                <button className="btn btn-primary w-24 btn-outline ml-1" onClick={async () => {
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
                <DownloadButton className="btn btn-primary btn-outline ml-4"
                    url={() => {
                        if (onUpload) {
                            const filter: TransactionReportFilter = state as TransactionReportFilter
                            return onUpload({ ...filter })
                        }
                        return undefined
                    }}
                    title="Выгрузить отчет" />
            </div>
        </div>
    )
}