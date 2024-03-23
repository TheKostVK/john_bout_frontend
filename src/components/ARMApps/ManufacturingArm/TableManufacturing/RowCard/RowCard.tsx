import { Card, Col, Image, Row, Typography } from "antd";
import React from "react";
import { IProductTable } from "../../ManufacturingArm";

const { Title } = Typography;

/**
 * Карточка с информацией о товаре
 * @param product - товар для отображения
 */
const RowCard = ({ product }: { product: IProductTable }) => {

    return (
        <Card title={ product.name } bordered={ false }>
            <Row className={ 'mb-5' } gutter={ [16, 16] }>
                <Col span={ 6 }>
                    <div>
                        <p>Тип</p>
                        <Title level={ 4 }>{ product.product_type }</Title>
                    </div>
                    <div>
                        <p>Подтип</p>
                        <Title level={ 4 }>{ product.subtype }</Title>
                    </div>
                </Col>
                <Col span={ 10 }>
                </Col>
                <Col span={ 8 }>
                    <Card title="Изображение товара">
                        <Image
                            width={ 250 }
                            src={ product.image_url }
                            preview={ false }
                            alt={ 'Нет изображения' }
                        />
                    </Card>
                </Col>

                <Col span={ 6 }>
                    <Title level={ 4 }>Характеристики</Title>
                </Col>
                <Col span={ 10 }>
                </Col>
                <Col span={ 8 }>
                </Col>
                {
                    Object.entries(product.characteristics).map(([key, value]) => (
                        <Col span={ 6 } key={ key }>
                            <div>
                                <p>{ key }</p>
                                <Title level={ 5 }>{ value }</Title>
                            </div>
                        </Col>
                    ))
                }
            </Row>
            <Row className={ 'mb-5' } gutter={ [16, 16] }>
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
                        <Title level={ 4 }>{ product.price } руб.</Title>
                    </div>
                    <div>
                        <p>Стоимость производства одной единицы товара</p>
                        <Title level={ 4 }>{ product.production_cost } руб.</Title>
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