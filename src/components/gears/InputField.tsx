import React from 'react'

export interface InputFieldProps {
    className?: string,
    hint?: string,
    label?: string,
}

export const InputField: React.FC<InputFieldProps> = ({ className = '', hint = '', label = ''}) => (
    <div className={className}>
        <div className="input-group">
            <label tabIndex={0} className="mt-3 mr-2">{label}</label>
            <input type="text" placeholder={hint} className="input input-bordered w-20 rounded-none" />
        </div>
    </div>
);