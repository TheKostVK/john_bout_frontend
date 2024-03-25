import { Table, TableColumnsType } from "antd";
import React from "react";
import { IContractsTable } from "../ContractsArm";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ICustomer } from "../../../../services/interface/ICustomersService";


const TableCustomers= ({ tableData }: { tableData: IContractsTable[] }) => {
    const { customers } = useSelector((state: RootState) => state.customerReducer);

    // TODO: сделать сортировку по статусу и типу контракта, а также по покупателю
    /**
     * Описание столбцов таблицы.
     */
    const columns: TableColumnsType<IContractsTable> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 50,
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
            title: 'Статус контракта',
            dataIndex: 'contract_status',
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
            width: 120,
        },
        {
            title: 'Валюта',
            dataIndex: 'currency',
            width: 150,
        },
    ];

    return (
        <Table
            bordered
            columns={ columns }
            dataSource={ tableData }
            pagination={ false }
            size={'small'}
        />
    );
};

export default TableCustomers;