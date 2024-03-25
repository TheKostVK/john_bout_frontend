import RowCard from "./RowCard/RowCard";
import { Table, TableColumnsType } from "antd";
import React from "react";
import { IProductTable } from "../ManufacturingArm";
import { typeToSubtypes } from "../../../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { IWarehouse } from "../../../../services/interface/IWarehousesService";


const TableManufacturing = ({ tableData }: { tableData: IProductTable[] }) => {
    const { warehouses } = useSelector((state: RootState) => state.warehouseReducer);

    /**
     * Создаем массив объектов фильтров для типов
     */
    const typeFilters = Object.keys(typeToSubtypes).map((type: string) => ({
        text: type,
        value: type,
    }));

    /**
     * Создаем массив объектов фильтров для подтипов
     */
    const subTypeFilters = Object.keys(typeToSubtypes).map((type: string) => (
        {
            text: type,
            value: type,
            children: typeToSubtypes[type].map((subtype: string) => ({
                text: subtype,
                value: subtype
            }))
        }
    ));

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
            filters: typeFilters,
            onFilter: (value: any, record: IProductTable) => record.product_type === value,
            width: 150,
        },
        {
            title: 'Подтип',
            dataIndex: 'product_subtype',
            filters: subTypeFilters.flatMap(type => type.children), // Используем подтипы в фильтрах
            filterSearch: true,
            onFilter: (value: any, record: IProductTable) => record.product_subtype === value,
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
            render: (storage_location: string) => warehouses.find((warehouse: IWarehouse) => warehouse.id === Number(storage_location))?.name || storage_location,
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
            bordered
            columns={ columns }
            dataSource={ tableData }
            pagination={ false }
            size={ 'small' }
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