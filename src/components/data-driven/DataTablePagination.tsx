//components/Pagination.tsx
import { PaginationState, Table } from '@tanstack/react-table'
import cn from 'classnames'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'


type Props = {
    table: Table<any>
    onChange?: (state: PaginationState) => void
}

export interface InternalState {
    showDropDown: boolean
}

const DataTablePagination = ({ table, onChange }: Props) => {

    // pagination state
    const [state, setState] = useState<InternalState>({
        showDropDown: false
    })

    const ref = useRef()
    useOnClickOutside(ref.current!, () => setState((state) => { return { ...state, showDropDown: false } }))

    const updateState = (partial: (state: PaginationState) => any) => {
        const partialState = partial({ ...table.getState().pagination })
        if (partialState) {
            setState((state) => {
                // Link with parent table events
                onChange && onChange({ ...table.getState().pagination, ...partialState })
                return { ...state, ...partialState }
            })
        }
    }

    return (
        <div className="my-2">
            <div className="flex items-center gap-2">
                <div className="btn-group btn-sm">
                    {/* button to go to first page */}
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={async () => updateState(() => { return { pageIndex: 0 } })}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<<"}
                    </button>
                    {/* button to go previous page */}
                    <button
                        className="btn btn-primary  btn-sm"
                        onClick={async () => updateState((state) => { return state.pageIndex > 0 ? { pageIndex: state.pageIndex - 1 } : undefined })}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<"}
                    </button>
                    {/* button to go next page */}
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={async () => updateState((state) => { return { pageIndex: state.pageIndex + 1 } })}
                        disabled={!table.getCanNextPage()}
                    >
                        {">"}
                    </button>
                    {/* button to go last page */}
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={async () => updateState(() => { return { pageIndex: table.getPageCount() - 1 } })}
                        disabled={!table.getCanNextPage()}
                    >
                        {">>"}
                    </button>
                </div>
                {/* page info */}
                <span className="flex items-center gap-1">
                    <div>Страница</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
                    </strong>
                </span>
                {/* input to skip to a specific page */}
                <span className="flex items-center gap-1">
                    | Перейти на страницу:
                    <input
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        type="number"
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            updateState(() => { return { pageIndex: page } })
                        }}
                        className="input input-bordered w-20 input-sm mx-2"
                    />
                </span>
                {/* select to input page size */}
                <div className="dropdown dropdown-top">
                    <label tabIndex={0} className="btn btn-outline btn-primary border btn-sm m-1"
                        onClick={() => setState((state) => { return { ...state, showDropDown: true } })}
                    >Показывать по {table.getState().pagination.pageSize} строк</label>
                    {/* Drop-down menu ======================================= */}
                    <ul tabIndex={0} className={cn({
                        'dropdown-content menu p-2 shadow bg-base-100 rounded-none w-96': true,
                        hidden: !state.showDropDown,
                    })}>
                        {[10, 50, 100].map((pageSize) => (
                            <li key={pageSize}><span className="text-left" onClick={async (event) => {
                                updateState(() => { return { pageIndex: 0, pageSize: pageSize, showDropDown: false } })
                            }}> Показывать по {pageSize} строк на странице</span></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default DataTablePagination