import { Table, TableColumnsType } from "antd";
import React from "react";
import { IWarehouse } from "../../../../services/interface/IWarehousesService";
import { IFinancial } from "../../../../services/interface/IFinancialsService";

export interface IFinancialTable extends IFinancial {
    key: number;
}

/**
 * Таблица отчетов по доходам
 * @param tableData - данные таблицы
 */
const TableDashArm = ({ tableData }: { tableData: IFinancialTable[] }) => {
    /**
     * Описание столбцов таблицы.
     */
    const columns: TableColumnsType<IFinancialTable> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 40,
        },
        {
            title: 'Дата создания отчета',
            dataIndex: 'report_date',
            render: (report_date: string) => new Date(report_date).toLocaleDateString('ru-RU', {}),
            width: 150,
        },
        {
            title: 'Доход за период',
            dataIndex: 'income',
            render: (income: string): string => `${ Number(income).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) } руб.`,
            width: 150,
        },
        {
            title: 'Потрачено за период',
            dataIndex: 'expenditure',
            render: (expenditure: string): string => `${ Number(expenditure).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) } руб.`,
            width: 150,
        },
        {
            title: 'Прибыль за период',
            dataIndex: 'profit',
            render: (profit: string): string => `${ Number(profit).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) } руб.`,
            width: 180,
        },
        {
            title: 'Текущий баланс',
            dataIndex: 'current_balance',
            render: (current_balance: string): string => `${ Number(current_balance).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) } руб.`,
            width: 120,
        },
    ];

    return (
        <Table
            bordered
            columns={ columns }
            dataSource={ tableData }
            pagination={ false }
            size={ 'small' }
        />
    );
};

export default TableDashArm;