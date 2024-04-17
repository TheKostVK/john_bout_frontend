import { Table, TableColumnsType, Tag } from "antd";
import React from "react";
import { IContractsTable } from "../ContractsArm";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ICustomer } from "../../../../services/interface/ICustomersService";
import { contractStatus } from "../../../../constants";
import RowCardContract from "./RowCard/RowCardContract";


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
            render: (customer_id: string) => customers.find((customer: ICustomer): boolean => customer.id === Number(customer_id))?.name || customer_id,
            sorter: (a: IContractsTable, b: IContractsTable) => a.customer_id - b.customer_id,
            width: 120,
        },
        {
            title: 'Тип контракта',
            dataIndex: 'contract_type',
            sorter: (a: IContractsTable, b: IContractsTable) => a.contract_type.localeCompare(b.contract_type),
            width: 150,
        },
        {
            title: 'Статус',
            dataIndex: 'contract_status',
            key: 'contract_status',
            filters: contractStatus,
            onFilter: (value: any, record: IContractsTable): boolean => record.contract_status === value,
            sorter: (a: IContractsTable, b: IContractsTable) => a.contract_status.localeCompare(b.contract_status),
            render: (contract_status: boolean, record: IContractsTable): React.JSX.Element => {
                if (record.disable) {
                    return (
                        <Tag color={ 'green-inverse' } key={ record.id }>
                            { contract_status }
                        </Tag>
                    );
                } else {
                    return (
                        <Tag color={ 'yellow-inverse' } key={ record.id }>
                            { contract_status }
                        </Tag>
                    );
                }
            },
            width: 100,
        },
        {
            title: 'Кол-во позиций',
            dataIndex: 'products_sales',
            render: (products_sales: string) => `${ products_sales.length } поз.` || 'Неизвестно',
            width: 40,
        },
        {
            title: 'Сумма контракта',
            dataIndex: 'contract_amount',
            render: (contract_amount: string): string => `${ Number(contract_amount).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) } руб.`,
            sorter: (a: IContractsTable, b: IContractsTable) => a.contract_amount - b.contract_amount,
            width: 120,
        },
        {
            title: 'Валюта',
            dataIndex: 'currency',
            sorter: (a: IContractsTable, b: IContractsTable) => a.currency.localeCompare(b.currency),
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
            expandable={ {
                expandedRowRender: (contract: IContractsTable) => {
                    return (
                        <RowCardContract contract={ contract }/>
                    );
                },
                rowExpandable: (contract: IContractsTable): boolean => contract.id !== undefined,
            } }
        />
    );
};

export default TableCustomers;