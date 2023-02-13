import {
    ColumnDef,
    PaginationState,
    RowData,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table"
import React, { useCallback, useEffect, useState } from "react"
import { DocumentNode, QueryResult, TypedDocumentNode, useLazyQuery } from '@apollo/client'
import { _cursorForPageNumber } from '../../apollo/utils'
import DataTablePagination from "./DataTablePagination"
import { DataTableSortIndicator } from './DataTableSortIndicator'


// Query result parsers by default
const defaultTotalCount = (result: QueryResult<any, any>) => {
    const relayConnection = result.data && result.data[Object.keys(result.data)[0]]
    return relayConnection && relayConnection.totalCount ? relayConnection.totalCount : 0
}


// Properties and states
export interface DataTableProps<T extends RowData> {
    filters?: any
    graphQuery: DocumentNode | TypedDocumentNode
    queryResultDataMapper: (result: QueryResult<any, any>) => T[]
    queryResultTotalCount?: (result: QueryResult<any, any>) => number
    columnDefs: ColumnDef<T, any>[]
}


export interface PageDataState<T extends RowData> {
    pageData: T[]
    pageCount: number
}


// Components factory
const DataTable = <T extends RowData>() => {

    const Instance: React.FC<DataTableProps<T>> = ({ filters, graphQuery,
        queryResultDataMapper,
        queryResultTotalCount = defaultTotalCount,
        columnDefs }) => {

        const [sorting, setSorting] = useState<SortingState>([])
        const [pagination, setPagination] = useState<PaginationState>({
            pageIndex: 0,
            pageSize: 10,
        })
        const [{ pageData, pageCount }, setPageData] = useState<PageDataState<T>>({
            pageData: [],
            pageCount: 0
        })

        // The full ability is const [getRequest, { loading, error, data, refetch, networkStatus }]
        const [getRequest] = useLazyQuery(graphQuery, {
            variables: {
                filters,
                cursor: _cursorForPageNumber(pagination.pageIndex),
                pageSize: pagination.pageSize,
            }
        })

        const fetchData = useCallback(async (pageIndex: number, pageSize: number) => {
            getRequest({ variables: { filters, pageSize: pageSize, cursor: _cursorForPageNumber(pageIndex) } }).then((result) => {
                setPageData((state) => {
                    return {
                        ...state,
                        pageData: queryResultDataMapper(result),
                        pageCount: Math.ceil(queryResultTotalCount(result) / pageSize)
                    }
                })
                // state.filteredData = result.data.transactionsRelayConnection.edges.map((node: any) => _nodeToTransaction(node.node))
            })
        }, [getRequest, queryResultDataMapper, queryResultTotalCount, filters])

        useEffect(() => {
            fetchData(pagination.pageIndex, pagination.pageSize).catch(console.error)
        }, [fetchData, pagination])

        const table = useReactTable({
            columns: columnDefs,
            data: pageData,
            getCoreRowModel: getCoreRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            state: {
                sorting,
                pagination,
            },
            onSortingChange: setSorting,
            manualPagination: true,
            pageCount
        })
        const headers = table.getFlatHeaders()
        const rows = table.getRowModel().rows
        return (
            <div className="overflow-auto">
                <table className="table table-zebra my-4 w-full">
                    <thead>
                        <tr>
                            {headers.map((header) => {
                                return (
                                    <th key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                onClick={header.column.getToggleSortingHandler()}
                                                className="cursor-pointer flex gap-4"
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                <DataTableSortIndicator direction={header.column.getIsSorted()} />
                                            </div>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell, index) => {
                                    return index === 0 ? (
                                        <th key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </th>
                                    ) : (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <DataTablePagination table={table} onChange={(state: PaginationState) => setPagination(state)}/>
            </div>
        )
    }

    return Instance
}


export default DataTable