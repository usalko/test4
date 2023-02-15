import { SortDirection } from '@tanstack/react-table'
import React from 'react'
import { ReactComponent as ArrowDown } from './arrow-down.svg'
import { ReactComponent as ArrowNone } from './arrow-none.svg'
import { ReactComponent as ArrowUp } from './arrow-up.svg'


export interface DataTableSortIndicatorProps {
    className?: string,
    direction: false | SortDirection
}

export const DataTableSortIndicator: React.FC<DataTableSortIndicatorProps> = ({ className = '', direction = false }) => {

    if (direction === 'asc') {
        return (<span className={className}><ArrowUp /></span>)
    } else if (direction === 'desc') {
        return (<span className={className}><ArrowDown /></span>)
    } else {
        return (<span className={className}><ArrowNone /></span>)
    }
}