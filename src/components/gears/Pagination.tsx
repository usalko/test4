//components/Pagination.tsx
import { PaginationState, Table } from '@tanstack/react-table'
import cn from 'classnames'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'


type Props = {
    // table returned from useTable hook.
    table: Table<any>
}

export interface InternalPaginationState extends PaginationState {
    showDropDown: boolean
}

const Pagination = ({ table }: Props) => {
    // pagination state
    const [state, setState] = useState<InternalPaginationState>({
        ...table.getState().pagination,
        showDropDown: false
    })

    //last page helper function
    const goLastPage = () => table.setPageIndex(table.getPageCount() - 1)

    const ref = useRef()
    useOnClickOutside(ref.current!, () => setState((state) => { return { ...state, showDropDown: false } }))

    return (
        <div className="my-2">
            <div className="flex items-center gap-2">
                <div className="btn-group btn-sm">
                    {/* button to go to first page */}
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<<"}
                    </button>
                    {/* button to go previous page */}
                    <button
                        className="btn btn-primary  btn-sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<"}
                    </button>
                    {/* button to go next page */}
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {">"}
                    </button>
                    {/* button to go last page */}
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={goLastPage}
                        disabled={!table.getCanNextPage()}
                    >
                        {">>"}
                    </button>
                </div>
                {/* page info */}
                <span className="flex items-center gap-1">
                    <div>Страница</div>
                    <strong>
                        {state.pageIndex + 1} из {table.getPageCount()}
                    </strong>
                </span>
                {/* input to skip to a specific page */}
                <span className="flex items-center gap-1">
                    | Перейти на страницу:
                    <input
                        defaultValue={state.pageIndex + 1}
                        type="number"
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="input input-bordered w-20 input-sm mx-2"
                    />
                </span>
                {/* select to input page size */}
                <div className="dropdown dropdown-top">
                    <label tabIndex={0} className="btn btn-outline btn-primary border btn-sm m-1"
                        onClick={() => setState((state) => { return { ...state, showDropDown: true } })}
                    >Показывать по {state.pageSize} строк на странице</label>
                    {/* Drop-down menu ======================================= */}
                    <ul tabIndex={0} className={cn({
                        'dropdown-content menu p-2 shadow bg-base-100 rounded-none w-100': true,
                        hidden: !state.showDropDown,
                    })}>
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <li key={pageSize}><span onClick={async (event) => {
                                const newState = { ...state, pageSize: pageSize, showDropDown: false }
                                setState((state) => { return { ...newState } })
                                table.setState((tableState) => { return { ...tableState, pagination: { ...newState } } })
                            }}> Показывать по {pageSize} строк на странице</span></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Pagination