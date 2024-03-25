import { Card, Col, Divider, Image, Row, Typography } from "antd";
import React from "react";
import { IProductTable } from "../../ManufacturingArm";

const { Title, Text, Paragraph } = Typography;

/**
 * Карточка с информацией о товаре
 * @param product - товар для отображения
 */
const RowCard = ({ product }: { product: IProductTable }) => {

    return (
        <Card title={ product.name } bordered={ false }>
            <Row gutter={ [10, 10] }>
                <Col span={ 24 }>
                    <Card title="Изображение товара и краткое описание">
                        <div className="flex justify-center">
                            <Image
                                width={ 250 }
                                src={ product.image_url }
                                preview={ false }
                                alt={ 'Нет изображения' }
                                className="w-full max-w-xs mb-5"
                            />
                        </div>
                        <Paragraph className="text-gray-700 text-justify">
                            { product.product_description }
                        </Paragraph>
                    </Card>
                </Col>

                <Col span={ 8 }>
                    <p>Тип</p>
                    <Title level={ 4 }>{ product.product_type }</Title>
                </Col>
                <Col span={ 8 }>
                    <p>Подтип</p>
                    <Title level={ 4 }>{ product.product_subtype }</Title>
                </Col>
                <Col span={ 8 }>

                </Col>

                <Divider/>

                <Col span={ 6 }>
                    <Title level={ 4 }>Характеристики</Title>
                </Col>
                <Col span={ 10 }>
                </Col>
                <Col span={ 8 }>
                </Col>
                {
                    Object.entries(product.characteristics).map(([key, characteristic]) => (
                        <Col span={ 6 } key={ key }>
                            <div>
                                <p>{ characteristic.name }</p>
                                <Title level={ 5 }>{ characteristic.value }</Title>
                            </div>
                        </Col>
                    ))
                }
            </Row>

            <Divider/>
            <Row gutter={ [16, 16] }>
                <Col span={ 6 }>
                    <Title level={ 4 }>Производство и склад</Title>
                </Col>
                <Col span={ 10 }>
                </Col>
                <Col span={ 6 }>
                </Col>

                <Col span={ 6 }>
                    <div>
                        <p>Стоимость одной единицы товара</p>
                        <Title level={ 4 }>{ Number(product.price).toLocaleString('ru-RU', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }) } руб.</Title>
                    </div>
                    <div><p>Стоимость производства одной единицы товара</p>
                        <Title level={ 4 }>{ Number(product.production_cost).toLocaleString('ru-RU', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }) } руб.</Title>
                    </div>
                </Col>
                <Col span={ 10 }>
                    <div>
                        <p>Место хранения</p>
                        <Title level={ 4 }>{ product.storage_location }</Title>
                    </div>
                    <div>
                        <p>Занимаемое место одной единицей товара</p>
                        <Title level={ 4 }>{ product.occupied_space }</Title>
                    </div>
                </Col>
                <Col span={ 6 }>
                    <div>
                        <p>Количество товара на складе</p>
                        <Title level={ 4 }>{ product.quantity }</Title>
                    </div>
                    <div>
                        <p>Зарезервировано</p>
                        <Title level={ 4 }>{ product.reserved_quantity }</Title>
                    </div>
                </Col>
            </Row>
        </Card>
    )
};

export default RowCard;