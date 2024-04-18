import React, { FC, useState } from 'react'
import { IProduct } from "../../../../services/interface/IProductsService";
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ICreateContractRequest, ICreateContractResponse } from "../../../../services/interface/IContractsService";
import messageUtility from "../../../utility/messageUtility";
import { useCreateContractMutation } from "../../../../services/contractsService";
import { addContract } from "../../../../store/reducers/contractsSlice";
import { Option } from "antd/lib/mentions";
import { ICustomer } from "../../../../services/interface/ICustomersService";
import { contractStatus, contractType, customerCurrency } from "../../../../constants";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface Props {
    isCreate: boolean;
    initialValues?: IProduct;
}

/**
 * Форма создания контракта
 * @param isCreate - флаг создания
 * @param initialValues - значения по умолчанию
 */
export const FormContract: FC<Props> = ({ isCreate = true, initialValues }) => {
    const [form] = Form.useForm();

    const { customers } = useSelector((state: RootState) => state.customerReducer);
    const { products } = useSelector((state: RootState) => state.productReducer);

    const [optionsProducts, setOptionsProducts] = useState<IProduct[]>(products);

    const [createContract] = useCreateContractMutation();

    const dispatch = useDispatch();

    /**
     * Обработчик создания контракта.
     */
    const onFinish = (values: ICreateContractRequest): void => {
        messageUtility.showMessage({
            key: 'createContract',
            type: 'loading',
            duration: 0,
            content: 'Создание контракта...'
        });

        let updatedValue: ICreateContractRequest = values;

        values.products_sales.map((product_sale: { id: any, quantity: number }, index: number): void => {
            const productId: number = Number(product_sale.id.value);

            updatedValue.products_sales[index] = {
                id: productId,
                quantity: product_sale.quantity,
            }
        });

        updatedValue.contract_amount = Number(updatedValue.contract_amount);

        createContract(values).unwrap().then((response: ICreateContractResponse): void => {
            if (response.success) {
                dispatch(addContract(response.data));

                messageUtility.showMessage({
                    key: 'createContract',
                    type: 'success',
                    content: 'Контракт успешно создан'
                });

                form.resetFields();
                setOptionsProducts(products);
            }
        }).catch((error): void => {
            messageUtility.showMessage({
                key: 'createContract',
                type: 'error',
                content: `Статус: ${ error.status }. Ошибка: ${ error.data.message }`
            });
        });
    };

    /**
     * Метод для поиска товаров
     */
    const loadOptions = (value: string): void => {
        const filteredProducts: IProduct[] = products.filter((product: IProduct) => product.name.includes(value) || product.product_description.includes(value));

        setOptionsProducts(filteredProducts);
    };

    return (
        <Form
            form={ form }
            onFinish={ onFinish }
            initialValues={ initialValues }
            layout="vertical"
            style={ { width: '98%' } }
        >
            <Row className={ 'mb-2' } gutter={ [10, 10] }>
                <Col span={ 10 }>
                    <Form.Item
                        name="customer_id"
                        label="Покупатель"
                        rules={ [{ required: true, message: 'Выберите покупателя' }] }
                    >
                        <Select
                            placeholder="Выберите покупателя"
                            onSelect={ (value): void => {
                                const customer: ICustomer | undefined = customers.find((customer: ICustomer): boolean => customer.id.toString() === value);

                                form.setFieldValue('currency', customer?.currency);
                            } }
                        >
                            {
                                customers.map((customer: ICustomer, index: number) => (
                                    <Option key={ index.toString() } value={ customer.id.toString() }>
                                        { customer.name }
                                    </Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={ 2 }>
                    <Form.Item
                        name="currency"
                        label="Валюта"
                        rules={ [{ required: true, message: 'Выберите валюту' }] }
                        initialValue={ customerCurrency[0].value }
                    >
                        <Select placeholder="Выберите валюту">
                            { customerCurrency.map((type) => (
                                <Option key={ type.value } value={ type.value }>{ type.text }</Option>
                            )) }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={ 12 }>
                    <Form.Item
                        name="description"
                        label="Описание контракта"
                        rules={ [{ required: true, message: 'Введите описание контракта' }] }
                    >
                        <TextArea
                            autoSize={ { minRows: 1, maxRows: 4 } }
                        />
                    </Form.Item>
                </Col>
                <Col span={ 8 }>
                    <Form.Item
                        name="contract_type"
                        label="Тип контракта"
                        rules={ [{ required: true, message: 'Выберите тип контракта' }] }
                        initialValue={ contractType[0].value }
                    >
                        <Select placeholder="Выберите валюту">
                            { contractType.map((type) => (
                                <Option key={ type.value } value={ type.value }>{ type.text }</Option>
                            )) }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={ 8 }>
                    <Form.Item
                        name="contract_status"
                        label="Статус контракта"
                        rules={ [{ required: true, message: 'Выберите статус контракта' }] }
                        initialValue={ contractStatus[0].value }
                    >
                        <Select placeholder="Выберите статус контракта">
                            { contractStatus.map((type) => (
                                <Option key={ type.value } value={ type.value }>{ type.text }</Option>
                            )) }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={ 8 }>
                    <Form.Item
                        name="contract_date"
                        label="Дата выполнения контракта"
                        rules={ [{ required: true, message: 'Выберите дату выполнения контракта' }] }
                    >
                        <DatePicker
                            style={ { width: '100%' } }
                            format={ 'DD.MM.YYYY' }
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="contract_amount"
                        label="Стоимость контракта"
                        rules={ [{ required: true, message: 'Введите стоимость контракта' }] }
                        getValueFromEvent={ (value) => (typeof value === 'number' ? parseFloat(`${ value }`).toFixed(2) : value) }
                        normalize={ (value) => (value === '0.00' ? undefined : value) }
                    >
                        <InputNumber
                            style={ { width: '100%' } }
                            placeholder="Стоимость контракта"
                            formatter={ (value: any): string => (
                                value === undefined || value === null ? '0.00' : `${ parseFloat(`${ value }`).toFixed(2) }`
                            ) }
                            min={ '0.00' }
                            defaultValue={ '0.00' }
                            step={ 0.01 }
                            precision={ 2 }
                            prefix={ '₽' }
                            suffix={ 'руб.' }
                        />
                    </Form.Item>
                </Col>
                <Col span={ 24 }>
                    <Form.Item
                        name="products_sales"
                        label="Товар"
                    >
                        <Form.List name="products_sales">
                            { (fields, { add, remove }) => (
                                <>
                                    { fields.map(({ key, name, fieldKey = 0, ...restField }) => (
                                        <Form.Item
                                            { ...restField }
                                            key={ fieldKey?.toString() }
                                        >
                                            <Row gutter={ [10, 10] }>
                                                <Col span={ 10 }>
                                                    <Form.Item
                                                        name={ [name, 'id'] }
                                                        fieldKey={ [fieldKey, 'id'] }
                                                        noStyle
                                                        rules={ [{ required: true, message: 'Выберите товар' }] }
                                                    >
                                                        <Select
                                                            labelInValue
                                                            filterOption={ false }
                                                            onSearch={ loadOptions }
                                                            style={ { width: '100%' } }
                                                        >
                                                            { optionsProducts.map((product: IProduct) => (
                                                                <Option
                                                                    key={ product.id.toString() }
                                                                    value={ product.id.toString() }
                                                                >
                                                                    { product.name }
                                                                </Option>
                                                            )) }
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={ 10 }>
                                                    <Form.Item
                                                        name={ [name, 'quantity'] }
                                                        fieldKey={ [fieldKey, 'quantity'] }
                                                        noStyle
                                                    >
                                                        <InputNumber
                                                            placeholder="Колличество товара"
                                                            suffix={ 'поз.' }
                                                            style={ { width: '100%' } }
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={ 4 }>
                                                    <MinusCircleOutlined onClick={ () => remove(fieldKey) }/>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    )) }
                                    <Form.Item>
                                        <Row gutter={ [10, 10] }>
                                            <Col span={ 3 }>
                                                <Button
                                                    type="dashed"
                                                    onClick={ () => add() }
                                                    icon={ <PlusOutlined/> }
                                                >
                                                    Добавить товар
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </>
                            ) }
                        </Form.List>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button htmlType="submit">
                    Создать контракт
                </Button>
            </Form.Item>
        </Form>
    )
};