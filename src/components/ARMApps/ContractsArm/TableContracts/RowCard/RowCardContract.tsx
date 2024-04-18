import React, { useEffect, useState } from "react";
import { Card, Col, Divider, Row, Typography, Statistic, Table, TableColumnsType, Button, Steps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { IContractsTable } from "../../ContractsArm";
import { ICustomer } from "../../../../../services/interface/ICustomersService";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { IProduct } from "../../../../../services/interface/IProductsService";
import { IProductTable } from "../../../ManufacturingArm/ManufacturingArm";
import RowCardProduct from "../../../ManufacturingArm/TableManufacturing/RowCard/RowCardProduct";
import { typeToSubtypes } from "../../../../../constants";
import { IWarehouse } from "../../../../../services/interface/IWarehousesService";
import { useChangeContractStatusMutation, useCompleteContractMutation } from "../../../../../services/contractsService";
import messageUtility from "../../../../utility/messageUtility";
import {
    IChangeStatusContractResponse,
    ICompleteContractResponse
} from "../../../../../services/interface/IContractsService";
import { updateStatusContract } from "../../../../../store/reducers/contractsSlice";
import { contractStatus } from "../../../../../services/interface/globalTypes";

const { Title } = Typography;

interface IProductContractTable extends IProductTable {
    contactQuantity: number;
}

/**
 * Карточка с информацией о контракте
 * @param contract - контракт для отображения
 */
const RowCardContract = ({ contract }: { contract: IContractsTable }) => {
    const { customers } = useSelector((state: RootState) => state.customerReducer);
    const { warehouses } = useSelector((state: RootState) => state.warehouseReducer);
    const { products } = useSelector((state: RootState) => state.productReducer);

    const [completeContract] = useCompleteContractMutation();
    const [changeStatusContract] = useChangeContractStatusMutation();

    const [currentStepContract, setCurrentStepContract] = useState<1 | 2 | 3 | 4>(1);

    const dispatch = useDispatch();

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
     * Метод переводит контракт на следующий этап
     * @param contractId - id контракта
     * @param cancellation - Флаг отмены контракта
     */
    const handleChangeStatusContract = (contractId: number, cancellation?: boolean): void => {
        /**
         * Завершает контракт
         */
        const toChangeStatusContract = (contractIdToComplete: number, newContractStatus: contractStatus): void => {
            messageUtility.showMessage({
                key: 'contractChangeStatus',
                type: 'loading',
                content: 'Идет смена статуса контракта...',
            });

            changeStatusContract({
                contractId: contractIdToComplete,
                bodyStatus: {
                    newStatus: newContractStatus
                }
            }).unwrap().then((respContract: IChangeStatusContractResponse): void => {
                if (respContract.success) {
                    messageUtility.showMessage({
                        key: 'contractChangeStatus',
                        type: 'success',
                        content: `${ newContractStatus === 'Отменен' ? 'Контракт успешно отменен' : 'Контракт успешно переведен на следующий этап' }`,
                    });

                    dispatch(updateStatusContract({ contractID: contractIdToComplete, newStatus: newContractStatus }));
                }
            }).catch((err): void => {
                messageUtility.showMessage({
                    key: 'contractChangeStatus',
                    type: 'error',
                    content: `Ошибка при переводе контракта на следующий этап. Код: ${ err.status }. Причина: ${ err.data.message }`,
                });
            });
        };

        let newContractStatus: contractStatus = 'Ожидает подтверждения';

        switch (contract.contract_status) {
            case "Ожидает подтверждения":
                newContractStatus = "В процессе выполнения";
                break;
            case "В процессе выполнения":
                newContractStatus = "Выполнен";
                break;
            case "Выполнен":
                newContractStatus = "Выполнен";
                break;
            default:
                newContractStatus = "Отменен";
                break;
        }

        messageUtility.showConfirmMessage({
            title: 'Подтвердите действие',
            content: 'Вы уверены что хотите перевести контракт на следующий этап?',
            onOk(): void {
                if (!cancellation) {
                    toChangeStatusContract(contractId, newContractStatus);

                    return;
                }

                toChangeStatusContract(contractId, newContractStatus = 'Отменен');
            },
            onCancel(): void {
                console.log('cancel');
            },
        });
    };

    /**
     * Метод завершающий контракт
     * @param contractId - id контракта
     */
    const handleCompleteContract = (contractId: number): void => {
        /**
         * Завершает контракт
         */
        const toCompleteContract = (contractIdToComplete: number): void => {
            messageUtility.showMessage({
                key: 'contractComplete',
                type: 'loading',
                content: 'Идет завершение контракта...',
            });

            completeContract({
                contractId: contractIdToComplete
            }).unwrap().then((respContract: ICompleteContractResponse): void => {
                if (respContract.success) {
                    messageUtility.showMessage({
                        key: 'contractComplete',
                        type: 'success',
                        content: 'Контракт успешно завершен',
                    });

                    dispatch(updateStatusContract({ contractID: contractIdToComplete, newStatus: 'Выполнен' }));
                }
            }).catch((err): void => {
                messageUtility.showMessage({
                    key: 'contractComplete',
                    type: 'error',
                    content: `Ошибка при завершении контракта. Код: ${ err.status }. Причина: ${ err.data.message }`,
                });
            });
        };

        messageUtility.showConfirmMessage({
            title: 'Подтвердите действие',
            content: 'Вы уверены что хотите перевести контракт в выполненные?',
            onOk(): void {
                toCompleteContract(contractId);
            },
            onCancel(): void {
                console.log('cancel');
            },
        });
    };

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

    /**
     * Задает текущий прогресс контракта
     */
    useEffect((): void => {
        switch (contract.contract_status) {
            case "Ожидает подтверждения":
                setCurrentStepContract(1);
                break;
            case "В процессе выполнения":
                setCurrentStepContract(2);
                break;
            case "Выполнен":
                setCurrentStepContract(3);
                break;
            default:
                setCurrentStepContract(4);
                break;
        }
    }, [contract]);

    return (
        <Card title={
            <div className={ 'flex justify-between' }>
                <p>
                    ID - { contract.id }
                </p>
                <div className={ 'space-x-2 my-auto' }>
                    <Button
                        disabled={
                            contract.disable ||
                            contract.contract_status === 'В процессе выполнения' ||
                            contract.contract_status === 'Отменен' ||
                            contract.contract_status === 'Выполнен'
                        }
                        onClick={ () => handleChangeStatusContract(contract.id) }
                    >
                        Перевести контракт на следующий этап
                    </Button>
                    <Button
                        disabled={
                            contract.disable ||
                            contract.contract_status === 'Ожидает подтверждения' ||
                            contract.contract_status !== 'В процессе выполнения'
                        }
                        onClick={ () => handleCompleteContract(contract.id) }
                    >
                        Завершить контракт
                    </Button>
                    <Button
                        danger
                        disabled={ contract.disable || contract.contract_status === 'Отменен' || contract.contract_status === 'Выполнен' }
                        onClick={ () => handleChangeStatusContract(contract.id, true) }
                    >
                        Отменить контракт
                    </Button>
                </div>
            </div>
        } bordered={ false }>
            <Row gutter={ [10, 10] }>
                <Col span={ 24 }>
                    <Steps
                        current={ currentStepContract }
                        status={
                            currentStepContract === 4 ? 'error' :
                                currentStepContract === 3 ? 'finish' :
                                    currentStepContract === 1 ? 'wait' :
                                        'process'
                        }
                        items={ [
                            {
                                title: 'Создан',
                            },
                            {
                                title: 'Ожидает подтверждения',
                            },
                            {
                                title: 'В процессе выполнения',
                            },
                            {
                                title: 'Выполнен',
                            },
                            {
                                title: 'Отменен',
                            },
                        ] }
                    />
                </Col>
            </Row>

            <Row className={'mt-14'} gutter={ [10, 10] }>
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