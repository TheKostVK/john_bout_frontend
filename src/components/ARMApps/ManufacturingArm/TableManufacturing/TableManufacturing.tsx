import RowCardProduct from "./RowCard/RowCardProduct";
import { Table, TableColumnsType } from "antd";
import React from "react";
import { IProductTable } from "../ManufacturingArm";
import { typeToSubtypes } from "../../../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { IWarehouse } from "../../../../services/interface/IWarehousesService";

/**
 * Таблица товаров
 * @param tableData - данные таблицы
 */
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
            width: 40,
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
            onFilter: (value: any, record: IProductTable): boolean => record.product_type === value,
            width: 150,
        },
        {
            title: 'Подтип',
            dataIndex: 'product_subtype',
            filters: subTypeFilters.flatMap(type => type.children), // Используем подтипы в фильтрах
            filterSearch: true,
            onFilter: (value: any, record: IProductTable): boolean => record.product_subtype === value,
            width: 150,
        },
        {
            title: 'Количество на складе',
            dataIndex: 'quantity',
            render: (quantity: string): string => `${ quantity } ед.`,
            width: 180,
        },
        {
            title: 'Зарезервировано',
            dataIndex: 'reserved_quantity',
            render: (reserved_quantity: string): string => `${ reserved_quantity } ед.`,
            width: 120,
        },
        {
            title: 'Склад',
            dataIndex: 'storage_location',
            render: (storage_location: string) => warehouses.find((warehouse: IWarehouse): boolean => warehouse.id === Number(storage_location))?.name || storage_location,
            width: 150,
        },
        {
            title: 'Цена за единицу',
            dataIndex: 'price',
            render: (price: string): string => `${Number(price).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} руб.`,
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
                        <RowCardProduct product={ product }/>
                    );
                },
                rowExpandable: (product: IProductTable): boolean => product.name !== 'Нет данных',
            } }
        />
    );
};

export default TableManufacturing;