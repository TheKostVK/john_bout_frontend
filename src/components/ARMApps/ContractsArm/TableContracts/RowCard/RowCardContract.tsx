import React from "react";
import { Card, Col, Divider, Image, Row, Typography, Statistic, Table, TableColumnsType } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { IContractsTable } from "../../ContractsArm";
import { ICustomer } from "../../../../../services/interface/ICustomersService";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { IProduct } from "../../../../../services/interface/IProductsService";
import { IProductTable } from "../../../ManufacturingArm/ManufacturingArm";
import RowCardProduct from "../../../ManufacturingArm/TableManufacturing/RowCard/RowCardProduct";
import { typeToSubtypes } from "../../../../../constants";
import { IWarehouse } from "../../../../../services/interface/IWarehousesService";

const { Title, Text, Paragraph } = Typography;

interface IProductContractTable extends IProductTable {
    contactQuantity: number;
};

/**
 * Карточка с информацией о контракте
 * @param contract - контракт для отображения
 */
const RowCardContract = ({ contract }: { contract: IContractsTable }) => {
    const { customers } = useSelector((state: RootState) => state.customerReducer);
    const { warehouses } = useSelector((state: RootState) => state.warehouseReducer);
    const { products } = useSelector((state: RootState) => state.productReducer);

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
    const columns: TableColumnsType<IProductContractTable> = [
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
            onFilter: (value: any, record: IProductContractTable): boolean => record.product_type === value,
            width: 150,
        },
        {
            title: 'Подтип',
            dataIndex: 'product_subtype',
            filters: subTypeFilters.flatMap(type => type.children), // Используем подтипы в фильтрах
            filterSearch: true,
            onFilter: (value: any, record: IProductContractTable): boolean => record.product_subtype === value,
            width: 150,
        },
        {
            title: 'Количество товара в контракте',
            dataIndex: 'contactQuantity',
            render: (contactQuantity: string): string => `${ contactQuantity } ед.`,
            width: 180,
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
            render: (price: string): string => `${ Number(price).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }) } руб.`,
            width: 150,
        },
    ];

    /**
     * Карточка отчета прибыльности контракта
     */
    const profitCard = (contract_amount: number, production_cost: number): React.JSX.Element => {
        const profit: number = contract_amount - production_cost;
        const symbolProfit: React.JSX.Element = profit > 0 ? <ArrowUpOutlined/> : <ArrowDownOutlined/>;
        const profitColor: string = profit > 0 ? '#3f8600' : '#ff0000';

        return (
            <Statistic
                value={
                    Number(profit).toLocaleString('ru-RU', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })
                }
                precision={ 2 }
                valueStyle={ { color: profitColor } }
                prefix={ symbolProfit }
                suffix="руб."
            />
        );
    };

    /**
     * Карточка товара из контракта
     */
    const productCard = (productsContact: { id: number, quantity: number }[]): React.JSX.Element => {
        const productsTable: IProductContractTable[] = [];

        productsContact.map((productContact: { id: number, quantity: number }, index: number): void => {
            const currentProduct: IProduct | undefined = products.find((product: IProduct): boolean => product.id === productContact.id);

            if (!currentProduct) return;

            productsTable.push({
                ...currentProduct,
                key: index,
                contactQuantity: productContact.quantity,
            });
        });

        return (
            <Table
                bordered
                columns={ columns }
                dataSource={ productsTable }
                pagination={ false }
                size={ 'small' }
                expandable={ {
                    expandedRowRender: (product: IProductContractTable) => {
                        return (
                            <RowCardProduct product={ product }/>
                        );
                    },
                    rowExpandable: (product: IProductContractTable): boolean => product.name !== 'Нет данных',
                } }
            />
        );
    };

    return (
        <Card title={ `ID - ${ contract.id } ` } bordered={ false }>
            <Row gutter={ [10, 10] }>
                <Col span={ 4 }>
                    <p>Покупатель</p>
                    <Title level={ 4 }>
                        {
                            customers.find((customer: ICustomer): boolean => customer.id === Number(contract.customer_id))?.name || contract.customer_id
                        }
                    </Title>
                </Col>
                <Col span={ 6 }>
                    <p>Дата заключения контракта</p>
                    <Title level={ 4 }>
                        {
                            new Date(contract.contract_date).toLocaleDateString('ru-RU', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })
                        }
                    </Title>
                </Col>
                <Col span={ 4 }>
                    <p>Тип контракта</p>
                    <Title level={ 4 }>{ contract.contract_type }</Title>
                </Col>
                <Col span={ 6 }>
                    <p>Состояние контракта</p>
                    <Title level={ 4 }>{ contract.contract_status }</Title>
                </Col>
            </Row>

            <Divider/>

            <Row gutter={ [10, 10] }>
                <Col span={ 4 }>
                    <p>Валюта</p>
                    <Title level={ 4 }>{ contract.currency }</Title>
                </Col>
                <Col span={ 6 }>
                    <p>Прибыль</p>
                    { profitCard(contract.contract_amount, contract.production_cost) }
                </Col>
                <Col span={ 6 }>
                    <p>Сумма контракта</p>
                    <Title level={ 4 }>
                        {
                            `${ Number(contract.contract_amount).toLocaleString('ru-RU', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }) } руб.`
                        }
                    </Title>
                </Col>
                <Col span={ 6 }>
                    <p>Стоимость выполнения контракта</p>
                    <Title level={ 4 }>
                        { `${ Number(contract.production_cost).toLocaleString('ru-RU', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }) } руб.` }
                    </Title>
                </Col>
            </Row>

            <Divider/>
            <Title level={ 4 }>Товары в контракте</Title>
            { productCard(contract.products_sales) }
        </Card>
    )
};

export default RowCardContract;