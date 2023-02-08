import cn from 'classnames'
import React, { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

export type ComboBoxItem = object | string


export interface ComboBoxProps<T extends ComboBoxItem> {
    className?: string,
    inputClassName?: string,
    hint?: string,
    label?: string,
    items?: T[],
    initialSearchString?: string,
    requestsCount: number, // Variable ->>signal for update dropdown

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
    const Instance: React.FC<ComboBoxProps<T>> = ({ className = '',
        inputClassName = '',
        hint = '',
        label = '',
        items,
        initialSearchString,
        onChangeValue,
        itemTitle = (value: T) => String(value) }) => {

        const [state, setState] = useState<ComboBoxState>({
            showDropDown: false,
            searchString: initialSearchString
        })

        const ref = useRef()
        useOnClickOutside(ref.current!, () => setState({ ...state, showDropDown: false }))
        //onclick handler when clicking a menu item
        const closeDropdown = () => {
            setState((state) => { return { ...state, showDropDown: false } })
        }

        console.log(`The state of combo-box is ${JSON.stringify(state)}`)

        return (
            <div className={className}>
                <div className="input-group pr-3">
                    <p tabIndex={0} className="mt-3 mr-2 text-left">{label}</p>
                    <div className="dropdown dropdown-start">
                        <input tabIndex={0}
                            type="text"
                            placeholder={hint}
                            className={`input input-bordered ${inputClassName}`}
                            value={state.searchString}
                            onChange={async (event) => {
                                closeDropdown()
                                if (onChangeValue) {
                                    onChangeValue(event.target.value)
                                }
                                setState((state) => { return { ...state, searchString: event.target.value } })
                            }}
                            onFocus={() => setState((state) => { return { ...state, showDropDown: items !== undefined } })}
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
                                            setState((state) => { return { ...state, searchString: itemTitle(item), showDropDown: false } })
                                        }}>{itemTitle(item)}</span></li>
                                    )
                                }) : (<li><span>Нет совпадений</span></li>)}
                        </ul>
                    </div>
                    <button className={`${'btn btn-ghost border-opacity-20 pl-1 pr-2'} ${cn({
                        'invisible': !state.searchString
                    })}`}
                        onClick={(event) => {
                            if (onChangeValue) {
                                onChangeValue('')
                            }
                            setState((state) => { return { ...state, searchString: '' } })
                        }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            fill="none"
                            viewBox="0 0 20 24"
                            width="20"
                            height="24"
                            stroke="currentColor"
                            opacity={state.searchString ? 0.4 : 0}
                            strokeWidth="1"
                        >
                            <path
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                                d="m 10,14 2,-2 m 0,0 2,-2 m -2,2 -2,-2 m 2,2 2,2 M 1,12 7.414,18.414 A 2,2 0 0 0 8.828,19 H 17 a 2,2 0 0 0 2,-2 V 7 A 2,2 0 0 0 17,5 H 8.828 A 2,2 0 0 0 7.414,5.586 Z"
                                id="path2" />
                        </svg>
                    </button>
                </div>
            </div>
        )
    }

    return Instance
}

export default ComboBox