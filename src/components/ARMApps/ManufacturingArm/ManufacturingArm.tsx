import { Card, Table, TableColumnsType } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import messageUtility from "../../utility/messageUtility";
import { IGetProductsListResponse, IProduct } from "../../../services/interface/IProductsService";
import { useLazyGetProductsQuery } from "../../../services/productsService";
import { setProducts } from "../../../store/reducers/productsSlice";
import { Typography } from 'antd';
import RowCard from "./RowCard/RowCard";

const { Title } = Typography;

export interface IProductTable extends IProduct {
    key: number;
}

const ManufacturingArm = () => {
    const { products } = useSelector((state: RootState) => state.productReducer);
    const [tableData, setTableData] = React.useState<IProductTable[]>([]);

    const [getProducts] = useLazyGetProductsQuery();

    const dispatch = useDispatch();

    /**
     * Описание столбцов таблицы.
     */
    const columns: TableColumnsType<IProductTable> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 50,
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: 'Тип',
            dataIndex: 'product_type',
            width: 150,
        },
        {
            title: 'Количество',
            dataIndex: 'quantity',
            width: 120,
        },
        {
            title: 'Зарезервировано',
            dataIndex: 'reserved_quantity',
            width: 120,
        },
        {
            title: 'Склад',
            dataIndex: 'storage_location',
            width: 150,
        },
        {
            title: 'Цена за единицу',
            dataIndex: 'price',
            width: 150,
        },
    ];

    /**
     * Получение списка клиентов.
     */
    const handleGetProducts = () => {
        getProducts()
            .unwrap()
            .then((productsResp: IGetProductsListResponse) => {
                dispatch(setProducts(productsResp.data));
            }).catch((err) => {
            console.error(err);

            messageUtility.showMessage({
                key: 'CustomerARMGetCustomersError',
                type: 'error',
                content: 'Ошибка получения списка клиентов',
            });
        });
    };

    /**
     * Обновляет данные таблицы при изменении списка клиентов.
     */
    useEffect(() => {
        let data: IProductTable[] = [];

        products.map((product: IProduct, index: number) => {
            data.push({
                key: index,
                ...product
            });
        });

        setTableData(data);
    }, [products]);

    /**
     * Получение списка клиентов при первом открытии АРМа.
     */
    useEffect(() => {
        if (products.length !== 0) return;

        handleGetProducts();
    }, []);

    // https://www.imfdb.org/images/3/35/AK-12M1_2023.jpg

    return (
        <div>
            <p className={ 'my-2' }>manufacturingArm</p>

            <div>
                <Table
                    columns={ columns }
                    dataSource={ tableData }
                    pagination={ false }
                    scroll={ { x: 300, y: 650 } }
                    expandable={ {
                        expandedRowRender: (product: IProductTable) => {
                            return (
                                <RowCard product={ product }/>
                            );
                        },
                        rowExpandable: (product: IProductTable) => product.name !== 'Нет данных',
                    } }
                />
            </div>
        </div>
    );
};

export default ManufacturingArm;