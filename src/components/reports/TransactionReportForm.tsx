import React from 'react'
import { ComboBox } from '../gears/ComboBox';

export interface TransactionReportFormProps {
    className?: string
}

export const TransactionReportForm: React.FC<TransactionReportFormProps> = ({ className = '' }) => (
    <div className={className}>
        <div className="form-control">
            <ComboBox label="Выберите парк:" items={["Парк 1", "Парк 2", "Парк 3"]}/>
            <label className="label cursor-pointer">
                <span className="label-text">Remember me</span>
                <input type="checkbox" checked className="checkbox" onChange={e => console.log('Click cahnged')} />
            </label>
        </div>
    </div>
);