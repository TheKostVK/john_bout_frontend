import { Table, TableColumnsType } from "antd";
import React from "react";
import { ICustomerTable } from "../CustomerArm";


const TableCustomers= ({ tableData }: { tableData: ICustomerTable[] }) => {

    /**
     * Описание столбцов таблицы.
     */
    const columns: TableColumnsType<ICustomerTable> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 50,
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: 'Адрес',
            dataIndex: 'address',
            width: 150,
        },
        {
            title: 'КонтактИнфо',
            dataIndex: 'contact_info',
            width: 120,
        },
        {
            title: 'Тип клиента',
            dataIndex: 'type',
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