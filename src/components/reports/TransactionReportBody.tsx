import React from 'react';

export interface TransactionReportBodyProps {
    className?: string;
}

export const TransactionReportBody: React.FC<TransactionReportBodyProps> = ({ className = '' }) => (
    <div className={className}>
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Дата транзакции:</th>
                        <th>Номер карты:</th>
                        <th>Тип билета:</th>
                        <th>Факт оплаты:</th>
                        <th>Код маршрута:</th>
                        <th>Гаражный номер:</th>
                        <th>Номер рейса:</th>
                        <th>Номер валидатора:</th>
                        <th>Тип валидатора:</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                        <th>2023-01-30T12:01:01</th>
                        <td>2983749874</td>
                        <td>обычный</td>
                        <td>есть</td>
                        <td>12345</td>
                        <td>4532</td>
                        <td>03</td>
                        <td>238762394</td>
                        <td>обычный</td>
                    </tr>
                    <tr>
                        <th>2023-01-30T12:10:18</th>
                        <td>2384723847</td>
                        <td>обычный</td>
                        <td>есть</td>
                        <td>12345</td>
                        <td>4532</td>
                        <td>03</td>
                        <td>238762394</td>
                        <td>обычный</td>
                    </tr>
                    <tr>
                        <th>2023-01-30T12:11:14</th>
                        <td>43874837477</td>
                        <td>обычный</td>
                        <td>есть</td>
                        <td>12345</td>
                        <td>4532</td>
                        <td>03</td>
                        <td>238762394</td>
                        <td>обычный</td>
                    </tr>
              </tbody>
            </table>
        </div>
    </div>
);