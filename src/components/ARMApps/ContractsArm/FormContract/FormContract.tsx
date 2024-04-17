import React, { FC } from 'react'
import { IProduct } from "../../../../services/interface/IProductsService";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ICreateContractRequest, ICreateContractResponse } from "../../../../services/interface/IContractsService";
import messageUtility from "../../../utility/messageUtility";
import { useCreateContractMutation } from "../../../../services/contractsService";
import { addContract } from "../../../../store/reducers/contractsSlice";
import { Option } from "antd/lib/mentions";
import { ICustomer } from "../../../../services/interface/ICustomersService";
import { contractStatus, contractType, customerCurrency } from "../../../../constants";

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
    const { warehouses } = useSelector((state: RootState) => state.warehouseReducer);

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

        createContract(values).unwrap().then((response: ICreateContractResponse): void => {
            if (response.success) {
                dispatch(addContract(response.data));

                messageUtility.showMessage({
                    key: 'createContract',
                    type: 'success',
                    content: 'Товар успешно создан'
                });
            }
        }).catch((error): void => {
            messageUtility.showMessage({
                key: 'createContract',
                type: 'error',
                content: `Статус: ${ error.status }. Ошибка: ${ error.message }`
            });
        });

        form.resetFields();
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
            </Row>
            <Form.Item>
                <Button htmlType="submit">
                    Создать контракт
                </Button>
            </Form.Item>
        </Form>
    )
};