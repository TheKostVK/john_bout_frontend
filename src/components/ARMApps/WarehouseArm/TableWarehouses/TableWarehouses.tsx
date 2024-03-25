import { Table, TableColumnsType } from "antd";
import React from "react";
import { IWarehouseTable } from "../WarehouseArm";
import { IWarehouse } from "../../../../services/interface/IWarehousesService";


const TableWarehouses = ({ tableData }: { tableData: IWarehouseTable[] }) => {

    /**
     * Описание столбцов таблицы.
     */
    const columns: TableColumnsType<IWarehouseTable> = [
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
            title: 'Текущая занятость',
            dataIndex: 'current_capacity',
            render: (current_capacity: string) => `${ current_capacity } ед.`,
            width: 120,
        },
        {
            title: 'Вместимость',
            dataIndex: 'capacity',
            render: (capacity: string) => `${ capacity } ед.`,
            width: 120,
        },
        {
            title: 'Тип склада',
            dataIndex: 'warehouse_type',
            width: 150,
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

export default TableWarehouses;