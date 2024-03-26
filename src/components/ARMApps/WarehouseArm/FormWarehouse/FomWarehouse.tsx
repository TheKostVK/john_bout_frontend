import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
    ICreateWarehouseResponse,
    IWarehouse,
    IWarehouseCreate
} from "../../../../services/interface/IWarehousesService";
import { useCreateWarehouseMutation } from "../../../../services/warehouseService";
import messageUtility from "../../../utility/messageUtility";
import { warehouseType } from "../../../../constants";
import { setWarehouses } from "../../../../store/reducers/warehousesSlice";

const { Option } = Select;

interface Props {
    isCreate: boolean;
    initialValues?: IWarehouse;
}

/**
 * Форма создания склада
 * @param isCreate - флаг создания
 * @param initialValues - значения по умолчанию
 */
const FormWarehouse: React.FC<Props> = ({ isCreate = true, initialValues }) => {
    const [form] = Form.useForm();

    const { warehouses } = useSelector((state: RootState) => state.warehouseReducer);

    const [createWarehouse] = useCreateWarehouseMutation();

    const dispatch = useDispatch();

    /**
     * Обработчик создания склада.
     */
    const onFinish = (values: IWarehouseCreate) => {
        messageUtility.showMessage({
            key: 'createWarehouse',
            type: 'loading',
            duration: 0,
            content: 'Создание склада...'
        });

        values.current_capacity = 0;

        console.log(values)

        createWarehouse(values).unwrap().then((response: ICreateWarehouseResponse) => {
            if (response.success) {

                dispatch(setWarehouses([...warehouses, response.data]));

                messageUtility.showMessage({
                    key: 'createWarehouse',
                    type: 'success',
                    content: 'Склад успешно создан'
                });
            }
        }).catch((error) => {
            messageUtility.showMessage({
                key: 'createWarehouse',
                type: 'error',
                content: `Статус: ${ error.status }. Ошибка: ${ error.data.error }`
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
                        label="Тип склада"
                        rules={ [{ required: true, message: 'Выберите тип склада' }] }
                    >
                        <Select placeholder="Выберите тип склада">
                            { warehouseType.map((type) => (
                                <Option key={ type.value } value={ type.text }>{ type.text }</Option>
                            )) }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={ 8 }>
                    <Form.Item
                        name="name"
                        label="Название"
                        rules={ [{ required: true, message: 'Введите название склада' }] }
                    >
                        <Input placeholder="Название склада"/>
                    </Form.Item>
                </Col>
                <Col span={ 10 }>
                    <Form.Item
                        name="address"
                        label="Адрес склада"
                        rules={ [{ required: true, message: 'Введите адрес склада' }] }
                    >
                        <Input placeholder="Адрес склада"/>
                    </Form.Item>
                </Col>
                <Col span={ 6 }>
                    <Form.Item
                        name="capacity"
                        label="Вместимость склада"
                        rules={ [{ required: true, message: 'Введите адрес склада' }] }
                    >
                        <Input placeholder="Вместимость склада" suffix={ 'поз.' }/>
                    </Form.Item>
                </Col>
                <Col span={ 8 }>

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

export default FormWarehouse;