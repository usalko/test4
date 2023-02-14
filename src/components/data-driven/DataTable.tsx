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
// Extract sorting map
const defaultReverseColumnMapper = (columnDefs: ColumnDef<any, any>[], graphQuery: DocumentNode | TypedDocumentNode) => {
    const fields = Object.fromEntries(((graphQuery.definitions[0] as any).selectionSet.selections[0].selectionSet.selections[2].selectionSet.selections[0].selectionSet.selections).map((entry: any) => [entry.name.value, entry.selectionSet]))
    const result = Object.fromEntries(columnDefs.filter((column: any) => column.id in fields).map((column: any) => [column.id,
        fields[column.id] ? [column.id, fields[column.id].selections[0].name.value] : [column.id]
    ]))
    return result
}
// Mapping sorting state to order object
const _orderFromSorting = (sorting: SortingState, reverseColumnMap: any): any => {
    return Object.fromEntries(sorting.filter((entry) => entry.id in reverseColumnMap).map((entry) => {
        const propertyPath = reverseColumnMap[entry.id]
        if (propertyPath.length > 1) {
            return [entry.id, JSON.parse(`{${propertyPath[1]}: ${entry.desc ? 'DESC' : 'ASC'}}`)] // Perhaps not working, please recheck
        }
        return [entry.id, entry.desc ? 'DESC' : 'ASC']
    }))
}


// Properties and states
export interface DataTableProps<T extends RowData> {
    filters?: any
    graphQuery: DocumentNode | TypedDocumentNode
    queryResultDataMapper: (result: QueryResult<any, any>) => T[]
    queryResultTotalCount?: (result: QueryResult<any, any>) => number
    reverseColumnMapper?: (columnDefs: ColumnDef<any, any>[], graphQuery: DocumentNode | TypedDocumentNode) => any
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
        reverseColumnMapper = defaultReverseColumnMapper,
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

        // Revers column mapper as helper for sorting mapper function (i.e. map sorting to order object)
        const reverseColumnMap = reverseColumnMapper(columnDefs, graphQuery)

        // The full signature is: const [getRequest, { loading, error, data, refetch, networkStatus }]
        const [getRequest] = useLazyQuery(graphQuery, {
            variables: {
                cursor: _cursorForPageNumber(pagination.pageIndex, pagination.pageSize),
                pageSize: pagination.pageSize,
                filters,
                order: _orderFromSorting(sorting, reverseColumnMap),
            }
        })

        const fetchData = useCallback(async (pageIndex: number, pageSize: number, filters: any, order: any) => {
            getRequest({ variables: { pageSize: pageSize, cursor: _cursorForPageNumber(pageIndex, pageSize), filters, order } }).then((result) => {
                setPageData((state) => {
                    return {
                        ...state,
                        pageData: queryResultDataMapper(result),
                        pageCount: Math.ceil(queryResultTotalCount(result) / pageSize)
                    }
                })
            })
        }, [getRequest, queryResultDataMapper, queryResultTotalCount])

        // Change pagination
        useEffect(() => {
            fetchData(pagination.pageIndex, pagination.pageSize, filters, _orderFromSorting(sorting, reverseColumnMap)).catch(console.error)
        }, [fetchData, pagination]) // For prevent cycle sorting and filters dependencies are handling in separate hook (@see below code)
        // Change filters
        useEffect(() => {
            setPagination((state) => { return { ...state, pageIndex: 0 } })
        }, [filters, sorting])

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
                                                <DataTableSortIndicator direction={header.column.id in reverseColumnMap && header.column.getIsSorted()} />
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
                <DataTablePagination table={table} onChange={(state: PaginationState) => setPagination(state)} />
            </div>
        )
    }

    return Instance
}


export default DataTable
