import React, { useState, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import cn from 'classnames'

export type ComboBoxItem = object | string


export interface ComboBoxProps<T extends ComboBoxItem> {
    className?: string,
    hint?: string,
    label?: string,
    items?: T[],
    initialSearchString?: string

    onChangeValue?: (value: T | string) => void,
    itemTitle?: (value: T) => string,
}

export interface ComboBoxState {
    index?: number
    showDropDown: boolean
    searchString?: string
}

// Components factory
const ComboBox = <T extends ComboBoxItem>() => {
    const Instance: React.FC<ComboBoxProps<T>> = ({ className = '', hint = '', label = '', items, initialSearchString, onChangeValue, itemTitle = (value: T) => String(value) }) => {

        const [state, setState] = useState<ComboBoxState>({
            showDropDown: false,
            searchString: initialSearchString
        })

        const ref = useRef()
        useOnClickOutside(ref.current!, () => setState({ ...state, showDropDown: false }))
        //onclick handler when clicking a menu item
        const closeDropdown = () => {
            setState({ ...state, showDropDown: false })
        }

        console.log(`The state of combo-box is ${JSON.stringify(state)}`)

        return (
            <div className={className}>
                <div className="input-group">
                    <label tabIndex={0} className="mt-3 mr-2">{label}</label>
                    <div className="dropdown dropdown-start">
                        <input tabIndex={0}
                            type="text"
                            placeholder={hint}
                            className="input input-bordered w-20 rounded-none"
                            value={state.searchString}
                            onChange={async (event) => {
                                closeDropdown()
                                if (onChangeValue) {
                                    onChangeValue(event.target.value)
                                }
                                setState({ ...state, searchString: event.target.value })
                            }}
                            onFocus={() => setState({ ...state, showDropDown: items !== undefined })}
                        />
                        {/* Drop-down menu ======================================= */}
                        <ul tabIndex={0} className={cn({
                            'dropdown-content menu p-2 shadow bg-base-100 rounded-none w-52': true,
                            hidden: !state.showDropDown,
                        })}>
                            {items?.length ?
                                items.map((item, index) => {
                                    return (
                                        <li key={index}><span onClick={async (event) => {
                                            if (onChangeValue) {
                                                onChangeValue(item)
                                            }
                                            setState({ ...state, searchString: itemTitle(item), showDropDown: false })
                                        }}>{itemTitle(item)}</span></li>
                                    )
                                }) : (<li><span>Нет совпадений</span></li>)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    return Instance
}

export default ComboBox