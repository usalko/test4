import React from 'react'

export interface StartPageProps {
    className?: string
}

export const StartPage: React.FC<StartPageProps> = ({ className = '' }) => (
    <div className={className}>
        <article className="prose flex-row max-w-[100%]">
            <h2 className="text-left ml-5 mt-5 max-w-[50%]">
                Прототип системы отчетов.
            </h2>
            <p className="text-left ml-5 mt-5 max-w-[50%]">
                Для перехода на отчет, используйте кнопку с названием отчета или пункт в бургер меню на мобильных устройствах.
            </p>
        </article>
    </div>
);