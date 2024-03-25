import { Table, TableColumnsType } from "antd";
import React from "react";
import { IContractsTable } from "../ContractsArm";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ICustomer } from "../../../../services/interface/ICustomersService";
import { contractStatus } from "../../../../constants";


const TableCustomers = ({ tableData }: { tableData: IContractsTable[] }) => {
    const { customers } = useSelector((state: RootState) => state.customerReducer);

    // TODO: сделать фильтр по покупателю
    /**
     * Описание столбцов таблицы.
     */
    const columns: TableColumnsType<IContractsTable> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 40,
        },
        {
            title: 'Покупатель',
            dataIndex: 'customer_id',
            render: (customer_id: string) => customers.find((customer: ICustomer) => customer.id === Number(customer_id))?.name || customer_id,
            width: 120,
        },
        {
            title: 'Тип контракта',
            dataIndex: 'contract_type',
            width: 150,
        },
        {
            title: 'Статус',
            dataIndex: 'contract_status',
            key: 'contract_status',
            filters: contractStatus,
            onFilter: (value: any, record: IContractsTable) => record.contract_status === value,
            width: 150,
        },
        {
            title: 'Кол-во позиций',
            dataIndex: 'products_sales',
            render: (products_sales: string) => products_sales.length || 'Неизвестно',
            width: 120,
        },
        {
            title: 'Сумма контракта',
            dataIndex: 'contract_amount',
            render: (contract_amount: string) => `${Number(contract_amount).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} руб.`,
            width: 120,
        },
        {
            title: 'Валюта',
            dataIndex: 'currency',
            width: 40,
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

export default TableCustomers;