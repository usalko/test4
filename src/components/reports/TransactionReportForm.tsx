import React from 'react';
import { ComboBox } from '../gears/ComboBox';
import { InputDateRangeField } from '../gears/InputDateRangeField';
import { InputField } from '../gears/InputField';

export interface TransactionReportFormProps {
    className?: string
}

export const TransactionReportForm: React.FC<TransactionReportFormProps> = ({ className = '' }) => (
    <div className={className}>
        <div className="form-control flex-row m-5">
            <ComboBox label="Выберите парк:" items={["Парк 1", "Парк 2", "Парк 3"]} />
            <InputField label="Укажите Гаражный Номер:" className="ml-5" />
            <InputDateRangeField label="Выберите период: " className="ml-5" />
            <InputField label="Укажите Номер Билета:" className="ml-5" />
            <button className="btn ml-10">Выбрать</button>
        </div>
        <article className="prose flex-row">
            <h2 className="text-left ml-5 w-max">Транзакции по гаражному номеру и дате: Автобусный парк №, Гаражный номер в период</h2>
        </article>
        <button className="btn btn-outline block ml-4">Выгрузить отчет</button>
    </div>
);