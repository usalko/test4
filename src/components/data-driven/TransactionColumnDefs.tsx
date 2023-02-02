import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Transaction } from "../../model/Transaction";


const columnHelper = createColumnHelper<Transaction>();


export const userColumnDefs: ColumnDef<Transaction, any>[] = [
    columnHelper.accessor((row) => row.date, {
        id: "date",
        cell: (info) => info.getValue(),
        header: () => <span>Дата транзакции:</span>,
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.cardNumber, {
        id: "cardNumber",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Номер карты:</span>,
    }),
    columnHelper.accessor((row) => row.ticketType, {
        id: "ticketType",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Тип билета:</span>,
    }),
    columnHelper.accessor((row) => row.paymentFact, {
        id: "paymentFact",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Факт оплаты:</span>,
    }),
    columnHelper.accessor((row) => row.routeCode, {
        id: "routeCode",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Код маршрута:</span>,
    }),
    columnHelper.accessor((row) => row.garageNumber, {
        id: "garageNumber",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Гаражный номер:</span>,
    }),
    columnHelper.accessor((row) => row.flightNumber, {
        id: "flightNumber",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Номер рейса:</span>,
    }),
    columnHelper.accessor((row) => row.validatorNumber, {
        id: "validatorNumber",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Номер валидатора:</span>,
    }),
    columnHelper.accessor((row) => row.validatorType, {
        id: "validatorType",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Тип валидатора:</span>,
    }),
];