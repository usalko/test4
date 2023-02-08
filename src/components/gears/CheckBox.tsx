import React from 'react'

export interface CheckBoxProps {
    className?: string,
}

export const CheckBox: React.FC<CheckBoxProps> = ({ className = '' }) => (
    <div className={className}>
        <label className="label cursor-pointer">
            <span className="label-text">Remember me</span>
            <input type="checkbox" checked className="checkbox" onChange={e => console.debug('On change the value')} />
        </label>
    </div>
);