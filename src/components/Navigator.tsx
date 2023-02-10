import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'


export interface NavigatorProps {
    className?: string
}

export interface NavigatorState {
    showDrawer?: boolean
}

export const Navigator: React.FC<NavigatorProps> = ({ className = '' }) => {

    const [state, setState] = useState<NavigatorState>({
        showDrawer: false
    })

    return (
        <div className={className}>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" onChange={async (event) => {
                    setState((state) => { return { ...state, showDrawer: event.target.checked } })
                }} checked={state.showDrawer} />
                <div className="drawer-content flex flex-col">
                    <div className="w-full navbar bg-base-300">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2">Test4</div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                                <li><a href="#/transactions">Отчет по транзакциям</a></li>
                            </ul>
                        </div>
                    </div>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100">
                        <li><a href="#/transactions" onClick={async (event) => setState((state) => { return { ...state, showDrawer: false } })}>
                            Отчет по транзакциям
                        </a></li>
                    </ul>

                </div>
            </div>
        </div>
    )
}