import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import messageUtility from "../../../utility/messageUtility";
import {
    ICreateCustomerRequest,
    ICreateCustomerResponse,
    ICustomer
} from "../../../../services/interface/ICustomersService";
import { useCreateCustomersMutation } from "../../../../services/customersService";
import { addCustomer, setCustomers } from "../../../../store/reducers/customersSlice";
import { customerCurrency, customerType } from "../../../../constants";

const { Option } = Select;

interface Props {
    isCreate: boolean;
    initialValues?: ICustomer;
}

/**
 * Форма создания покупателя
 * @param isCreate - флаг создания
 * @param initialValues - значения по умолчанию
 */
const FormCustomer: React.FC<Props> = ({ isCreate = true, initialValues }) => {
    const [form] = Form.useForm();

    const { customers } = useSelector((state: RootState) => state.customerReducer);

    const [createCustomer] = useCreateCustomersMutation();

    const dispatch = useDispatch();

    /**
     * Обработчик создания покупателя.
     */
    const onFinish = (values: ICreateCustomerRequest) => {
        messageUtility.showMessage({
            key: 'createCustomer',
            type: 'loading',
            duration: 0,
            content: 'Создание покупателя...'
        });

        createCustomer(values).unwrap().then((response: ICreateCustomerResponse) => {
            if (response.success) {

                dispatch(addCustomer(response.data));

                messageUtility.showMessage({
                    key: 'createCustomer',
                    type: 'success',
                    content: 'Покупатель успешно создан'
                });
            }
        }).catch((error): void => {
            messageUtility.showMessage({
                key: 'createCustomer',
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
                <Col span={ 6 }>
                    <Form.Item
                        name="type"
                        label="Тип покупателя"
                        rules={ [{ required: true, message: 'Выберите тип покупателя' }] }
                    >
                        <Select placeholder="Выберите тип склада">
                            { customerType.map((type) => (
                                <Option key={ type.value } value={ type.value }>{ type.text }</Option>
                            )) }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={ 8 }>
                    <Form.Item
                        name="name"
                        label="Имя покупателя"
                        rules={ [{ required: true, message: 'Введите название покупателя' }] }
                    >
                        <Input placeholder="Название покупателя"/>
                    </Form.Item>
                </Col>
                <Col span={ 10 }>
                    <Form.Item
                        name="address"
                        label="Адрес покупателя"
                        rules={ [{ required: true, message: 'Введите адрес покупателя' }] }
                    >
                        <Input placeholder="Адрес покупателя"/>
                    </Form.Item>
                </Col>
                <Col span={ 6 }>
                    <Form.Item
                        name="contactInfo"
                        label="Контакная информация"
                        rules={ [{ required: true, message: 'Введите контактную информацию покупателя' }] }
                    >
                        <Input placeholder="Контакная информация покупателя"/>
                    </Form.Item>
                </Col>
                <Col span={ 8 }>
                    <Form.Item
                        name="currency"
                        label="Валюта покупателя"
                        rules={ [{ required: true, message: 'Выберите валюту покупателя' }] }
                        initialValue={ customerCurrency[0].value }
                    >
                        <Select placeholder="Выберите валюту покупателя">
                            { customerCurrency.map((type) => (
                                <Option key={ type.value } value={ type.value }>{ type.text }</Option>
                            )) }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={ 10 }>

                </Col>
            </Row>
            <Form.Item>
                <Button htmlType="submit">
                    Создать склад
                </Button>
            </Form.Item>
        </Form>
    )
};

export default FormCustomer;