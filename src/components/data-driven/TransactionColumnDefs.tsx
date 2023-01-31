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
    columnHelper.accessor((row) => row.card_number, {
        id: "card_number",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Номер карты:</span>,
    }),
    columnHelper.accessor((row) => row.ticket_type, {
        id: "ticket_type",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Тип билета:</span>,
    }),
    columnHelper.accessor((row) => row.payment_fact, {
        id: "payment_fact",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Факт оплаты:</span>,
    }),
    columnHelper.accessor((row) => row.route_code, {
        id: "route_code",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Код маршрута:</span>,
    }),
    columnHelper.accessor((row) => row.garage_number, {
        id: "garage_number",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Гаражный номер:</span>,
    }),
    columnHelper.accessor((row) => row.flight_number, {
        id: "flight_number",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Номер рейса:</span>,
    }),
    columnHelper.accessor((row) => row.validator_number, {
        id: "validator_number",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Номер валидатора:</span>,
    }),
    columnHelper.accessor((row) => row.validator_type, {
        id: "validator_type",
        cell: (info) => <span>{info.getValue()}</span>,
        header: () => <span>Тип валидатора:</span>,
    }),
];