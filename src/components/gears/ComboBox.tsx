import React, { useState, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import cn from 'classnames'


export interface ComboBoxProps {
    className?: string,
    hint?: string,
    label?: string,
    items: { title: string, key: string }[],
    initialTitle?: string // title
    onChangeValue?: (value: { title: string, key: string }) => void,
}

export const ComboBox: React.FC<ComboBoxProps> = ({ className = '', hint = '', label = '', items, initialTitle, onChangeValue }) => {
    const [open, setOpen] = useState<boolean>();

    const ref = useRef()
    useOnClickOutside(ref.current!, () => setOpen(false))
    //onclick handler when clicking a menu item
    const closeDropdown = () => {
        setOpen(false)
    };

    return (
        <div className={className}>
            <div className="input-group">
                <label tabIndex={0} className="mt-3 mr-2">{label}</label>
                <div className="dropdown dropdown-start">
                    <input tabIndex={0}
                        type="text"
                        placeholder={hint}
                        className="input input-bordered w-20 rounded-none"
                        value={initialTitle}
                        onChange={async (event) => {
                            if (onChangeValue) {
                                onChangeValue({ key: '', title: event.target.value })
                            }
                        }}
                        onFocus={() => setOpen(true)}
                    />
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
                    <ul tabIndex={0} className={cn({
                        'dropdown-content menu p-2 shadow bg-base-100 rounded-none w-52': true,
                        hidden: !open,
                    })}>
                        {items.length ?
                            items.map((item) => {
                                return (
                                    <li key={item.key}><span onClick={async (event) => {
                                        closeDropdown()
                                        if (onChangeValue) {
                                            onChangeValue({ key: item.key, title: item.title })
                                        }
                                    }}>{item.title}</span></li>
                                )
                            }) : (<li><span>Нет совпадений</span></li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}