import RowCard from "./RowCard/RowCard";
import { Table, TableColumnsType } from "antd";
import React from "react";
import { IProductTable } from "../ManufacturingArm";


const TableManufacturing = ({ tableData }: { tableData: IProductTable[] }) => {

    /**
     * Описание столбцов таблицы.
     */
    const columns: TableColumnsType<IProductTable> = [
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
            title: 'Тип',
            dataIndex: 'product_type',
            width: 150,
        },
        {
            title: 'Количество',
            dataIndex: 'quantity',
            width: 120,
        },
        {
            title: 'Зарезервировано',
            dataIndex: 'reserved_quantity',
            width: 120,
        },
        {
            title: 'Склад',
            dataIndex: 'storage_location',
            width: 150,
        },
        {
            title: 'Цена за единицу',
            dataIndex: 'price',
            width: 150,
        },
    ];

    return (
        <Table
            columns={ columns }
            dataSource={ tableData }
            pagination={ false }
            scroll={ { x: 300, y: 300 } }
            expandable={ {
                expandedRowRender: (product: IProductTable) => {
                    return (
                        <RowCard product={ product }/>
                    );
                },
                rowExpandable: (product: IProductTable): boolean => product.name !== 'Нет данных',
            } }
        />
    );
};

export default TableManufacturing;