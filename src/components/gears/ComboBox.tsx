import React from 'react'

export interface ComboBoxProps {
    className?: string,
    hint?: string,
    label?: string,
    items: string[],
}

export const ComboBox: React.FC<ComboBoxProps> = ({ className = '', hint = '', label = '', items }) => (
    <div className={className}>
        <div className="input-group">
            <label tabIndex={0} className="mt-3 mr-2">{label}</label>
            <div className="dropdown dropdown-start">
                <input type="text" placeholder={hint} className="input input-bordered w-20 rounded-none" />
                {/* <button tabIndex={0} className="btn btn-outline btn-primary rounded-none d-none">
                    <svg
                        height="32"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m 0.17267709,12.770364 11.99999991,12 12,-12 z"
                        />
                    </svg>
                </button> */}
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-none w-52">
                    {items.map((item) => {
                        return (<li><a className="rounded-none">{item}</a></li>)
                    })}
                </ul>
            </div>
        </div>
    </div>
);