import { SortDirection } from '@tanstack/react-table'
import React from 'react'

export interface DataTableSortIndicatorProps {
    className?: string,
    direction: false | SortDirection
}

export const DataTableSortIndicator: React.FC<DataTableSortIndicatorProps> = ({ className = '', direction = false }) => {

    const directionRepresentation = direction === 'asc' ? '🔼' : (direction === 'desc' ? '🔽' : ' ')

    return (
        <span className={className}>{directionRepresentation}</span>
    )
}