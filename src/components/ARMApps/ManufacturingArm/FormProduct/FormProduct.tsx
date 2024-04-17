import React, { useState } from "react";
import { Button, Form, Input, Select, Row, Col, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { IWarehouse } from "../../../../services/interface/IWarehousesService";
import { useCreateProductMutation } from "../../../../services/productsService";
import {
    ICreateProductResponse,
    IProduct,
    IProductCreateRequest
} from "../../../../services/interface/IProductsService";
import messageUtility from "../../../utility/messageUtility";
import { addProduct, setProducts } from "../../../../store/reducers/productsSlice";
import { typeToSubtypes } from "../../../../constants";

const { Option } = Select;
const { TextArea } = Input;

interface Props {
    isCreate: boolean;
    initialValues?: IProduct;
}

/**
 *   "Боеприпасы различного калибра": ["5.45x39 мм", "7.62x39 мм", "7.62x54 ммR", "9x19 мм", "9x21 мм", "12.7x108 мм", "12.7x55 мм", "14.5x114 мм", "23x115 мм"],
 *     "Ракеты класса воздух-земля": ["Х-29Л", "Х-29ТД", "Х-38МЛ", "Х-25МТ", "Х-31П", "Х-31А", "Х-35", "Х-55", "Х-59М", "Х-59МК2", "Х-58УШЭ", "Х-38", "Х-29Т", "Х-31П", "Х-32", "Х-59MK2", "Х-59MK2Э", "Х-25MT", "Х-31А", "Х-31П", "Х-35"],
 *     "Ракеты класса воздух-воздух": ["Р-27", "Р-27Т", "Р-27Э", "Р-27ЭТ", "Р-60", "Р-60М", "Р-73", "Р-73М", "Р-77", "Р-77М", "Р-74", "Р-74М", "Р-74М2", "Р-27Э", "Р-27ЭТ", "Р-73", "Р-73М", "Р-74", "Р-74М", "Р-77", "Р-77М"],
 *     "Ракеты класса земля-воздух": ["9М311", "9М311-1", "9М311-1E", "9М311-1F", "9М330-2", "9М331-2", "9М331-3", "9М333-2", "9М333-3", "9М338-2", "9М342-2", "9М342-3", "9М311-2", "9М311-2E", "9М311-2F"],
 *     "Межконтинентальные ракеты": ["РС-24", "РС-26", "РС-28", "Р-36", "Р-36M", "РС-18", "РС-18B", "РС-18U", "РС-18У", "РС-20", "РС-20Б", "РС-20В", "РС-20ВЫ", "РС-20К", "РС-20КВ", "РС-20П", "РС-20ПВ", "РС-20Р", "РС-20РВ", "РС-20У", "РС-20УВ", "РС-22", "РС-22А", "РС-22Б", "РС-22Г", "РС-24", "РС-24А", "РС-24Б", "РС-24В", "РС-24Г", "РС-28", "РС-28А", "РС-28Б", "РС-28В", "РС-28Г"]
 */

/**
 * Форма создания продукта
 * @param isCreate - флаг создания
 * @param initialValues - значения по умолчанию
 */
const FormProduct: React.FC<Props> = ({ isCreate = true, initialValues }) => {
    const [form] = Form.useForm();

    const { products } = useSelector((state: RootState) => state.productReducer);
    const { warehouses } = useSelector((state: RootState) => state.warehouseReducer);

    const [selectedType, setSelectedType] = useState<string | undefined>(initialValues?.product_type);
    const [subtypes, setSubtypes] = useState<string[]>([]);
    const [availableWarehouses, setAvailableWarehouses] = useState<IWarehouse[]>([]);

    const [createProduct] = useCreateProductMutation();

    const dispatch = useDispatch();

    /**
     * Проверка на корректность ссылки
     * @param _
     * @param value - строка для проверки
     */
    const validateURL = (_: any, value: string) => {
        if (!value) {
            return Promise.reject('Введите URL изображения товара');
        }
        const urlRegex: RegExp = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!urlRegex.test(value)) {
            return Promise.reject('Введите корректный URL изображения товара');
        }
        return Promise.resolve();
    };

    /**
     * Обработчик создания товара.
     */
    const onFinish = (values: IProductCreateRequest): void => {
        messageUtility.showMessage({
            key: 'createProduct',
            type: 'loading',
            duration: 0,
            content: 'Создание товара...'
        });

        createProduct(values).unwrap().then((response: ICreateProductResponse): void => {
            if (response.success) {

                dispatch(addProduct(response.data));

                messageUtility.showMessage({
                    key: 'createProduct',
                    type: 'success',
                    content: 'Товар успешно создан'
                });
            }
        }).catch((error): void => {
            messageUtility.showMessage({
                key: 'createProduct',
                type: 'error',
                content: `Статус: ${ error.status }. Ошибка: ${ error.message }`
            });
        });

        form.resetFields();
    };

    /**
     * Обработчик смены типа товара.
     */
    const handleTypeChange = (value: string): void => {
        setSelectedType(value);
        setSubtypes(typeToSubtypes[value] || []);
        form.setFieldsValue({ subtype: undefined });

        // Фильтруем склады в соответствии с выбранным типом товара
        const filteredWarehouses: IWarehouse[] = warehouses.filter((warehouse: IWarehouse) => {
            if (value === 'Военные самолеты') {
                return warehouse.warehouse_type === 'Авиационный ангар';
            } else if (value === 'Тяжелая техника') {
                return warehouse.warehouse_type === 'Ангар для техники';
            } else {
                return warehouse.warehouse_type === 'Обычный';
            }
        });

        setAvailableWarehouses(filteredWarehouses);
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
                <Col span={ 8 }>
                    <Form.Item
                        name="name"
                        label="Название"
                        rules={ [{ required: true, message: 'Введите название товара' }] }
                    >
                        <Input placeholder="Название товара"/>
                    </Form.Item>
                </Col>
                <Col span={ 6 }>
                    <Form.Item
                        name="product_type"
                        label="Тип"
                        rules={ [{ required: true, message: 'Выберите тип товара' }] }
                    >
                        <Select placeholder="Выберите тип товара" onChange={ handleTypeChange }>
                            { Object.keys(typeToSubtypes).map((type: string) => (
                                <Option key={ type } value={ type }>{ type }</Option>
                            )) }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={ 10 }>
                    <Form.Item
                        name="product_subtype"
                        label="Подтип"
                        rules={ [{ required: true, message: 'Выберите подтип товара' }] }
                    >
                        <Select placeholder="Выберите подтип товара" disabled={ !selectedType }>
                            { selectedType && typeToSubtypes[selectedType].map((subtype: string) => (
                                <Option key={ subtype } value={ subtype }>{ subtype }</Option>
                            )) }
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row className={ 'mb-2' } gutter={ [10, 10] }>
                <Col span={ 24 }>
                    <Form.Item
                        name="imgUrl"
                        label="URL изображения товара"
                        rules={ [{ validator: validateURL }] }
                    >
                        <Input placeholder="URL изображения товара"/>
                    </Form.Item>
                </Col>
            </Row>

            <Row className={ 'mb-2' } gutter={ [10, 10] }>
                <Col span={ 24 }>
                    <Form.Item
                        name="product_description"
                        label="Описание товара"
                        rules={ [{ required: true, message: 'Введите описание товара' }] }
                    >
                        <TextArea
                            autoSize={{ minRows: 1, maxRows: 6 }}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row className={ 'mb-2' } gutter={ [10, 10] }>
                <Col span={ 8 }>
                    <Form.Item
                        name="quantity"
                        label="Количество товара на складе"
                        rules={ [{ required: true, message: 'Введите количество товара' }] }
                    >
                        <Input type="number" placeholder="Количество товара" suffix={ 'шт.' }/>
                    </Form.Item>
                </Col>
                <Col span={ 8 }>
                    <Form.Item
                        name="occupied_space"
                        label="Занимаемое место товаром"
                        rules={ [{ required: true, message: 'Введите занимаемое место товаром' }] }
                    >
                        <Input type="number" placeholder="Занимаемое место" suffix={ 'поз.' }/>
                    </Form.Item>
                </Col>
                <Col span={ 8 }>
                    <Form.Item
                        name="storage_location"
                        label="Склад хранения товара"
                        rules={ [{ required: true, message: 'Введите номер склада для хранения товара' }] }
                    >
                        <Select placeholder={ 'Выберите склад' } disabled={ !selectedType || !subtypes }>
                            { availableWarehouses.map((warehouse: IWarehouse) => (
                                <Option key={ `warehouse-${ warehouse.id }` } value={ warehouse.id }>
                                    { warehouse.name }
                                </Option>
                            )) }
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="characteristics"
                label="Характеристики"
            >
                <Form.List name="characteristics">
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
                                                name={ [name, 'name'] }
                                                fieldKey={ [fieldKey, 'name'] }
                                                noStyle
                                            >
                                                <Input placeholder="Имя характеристики"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={ 10 }>
                                            <Form.Item
                                                name={ [name, 'value'] }
                                                fieldKey={ [fieldKey, 'value'] }
                                                noStyle
                                            >
                                                <Input placeholder="Значение характеристики"/>
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
                                            disabled={ subtypes.length === 0 }
                                        >
                                            Добавить характеристику
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </>
                    ) }
                </Form.List>
            </Form.Item>

            <Row className={ 'mb-2' } gutter={ [10, 10] }>
                <Col span={ 8 }>
                    <Form.Item
                        name="production_cost"
                        label="Стоимость производства одной единицы товара"
                        rules={ [{ required: true, message: 'Введите стоимость производства' }] }
                        getValueFromEvent={ (value) => (typeof value === 'number' ? parseFloat(`${ value }`).toFixed(2) : value) }
                        normalize={ (value) => (value === '0.00' ? undefined : value) }
                    >
                        <InputNumber
                            style={ { width: '100%' } }
                            placeholder="Стоимость производства"
                            formatter={ (value: any) => (
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
                <Col span={ 8 }>
                    <Form.Item
                        name="price"
                        label="Стоимость продажи одной единицы товара"
                        rules={ [{ required: true, message: 'Введите стоимость продажи' }] }
                        getValueFromEvent={ (value) => (typeof value === 'number' ? parseFloat(`${ value }`).toFixed(2) : value) }
                        normalize={ (value) => (value === '0.00' ? undefined : value) }
                    >
                        <InputNumber
                            style={ { width: '100%' } }
                            placeholder="Стоимость продажи"
                            formatter={ (value: any) => (
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
                <Col span={ 8 }>

                </Col>
            </Row>

            <Form.Item>
                <Button htmlType="submit">
                    Создать товар
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormProduct;
