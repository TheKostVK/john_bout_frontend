import { Layout, Menu, type MenuProps, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import messageUtility from "../../utility/messageUtility";
import { IGetProductsListResponse, IProduct } from "../../../services/interface/IProductsService";
import { useLazyGetProductsQuery } from "../../../services/productsService";
import { setProducts } from "../../../store/reducers/productsSlice";
import { AppstoreAddOutlined, OrderedListOutlined } from "@ant-design/icons";
import TableManufacturing from "./TableManufacturing/TableManufacturing";
import FormProduct from "./FormProduct/FormProduct";

const { Sider } = Layout;

export interface IProductTable extends IProduct {
    key: number;
}

const ManufacturingArm = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { products } = useSelector((state: RootState) => state.productReducer);

    const [currentMenuOptions, setCurrentMenuOptions] = useState<number>(0);
    const [tableData, setTableData] = useState<IProductTable[]>([]);

    const [getProducts] = useLazyGetProductsQuery();

    const dispatch = useDispatch();

    /**
     * Содержимое бокового меню.
     */
    const menuItems: MenuProps['items'] = [
        {
            key: `productList`,
            icon: <OrderedListOutlined/>,
            label: `Список товаров`,
        },
        {
            key: `createProduct`,
            icon: <AppstoreAddOutlined/>,
            label: `Создание товара`,
        },
    ];

    /**
     * Обработчик нажатия на боковое меню.
     */
    const onClickMenu: MenuProps['onClick'] = (e): void => {
        switch (e.key) {
            case `productList`:
                setCurrentMenuOptions(0);
                break;
            case `createProduct`:
                setCurrentMenuOptions(1);
                break;
            default:
                break;
        }
    };

    /**
     * Получение списка клиентов.
     */
    const handleGetProducts = (): void => {
        getProducts()
            .unwrap()
            .then((productsResp: IGetProductsListResponse): void => {
                dispatch(setProducts(productsResp.data));
            }).catch((err) => {
            console.error(err);

            messageUtility.showMessage({
                key: 'CustomerARMGetCustomersError',
                type: 'error',
                content: 'Ошибка получения списка товаров',
            });
        });
    };

    /**
     * Обновляет данные таблицы при изменении списка клиентов.
     */
    useEffect((): void => {
        let data: IProductTable[] = [];

        products.map((product: IProduct, index: number): void => {
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
    useEffect((): void => {
        if (products.length !== 0) return;

        handleGetProducts();
    }, []);

    return (
        <div className={ 'flex space-x-7' } style={ { width: '100%', height: '610px' } }>
            <Sider width={ 200 } style={ { background: colorBgContainer } }>
                <Menu
                    onClick={ onClickMenu }
                    mode="inline"
                    defaultSelectedKeys={ [`productList`] }
                    style={ { borderRight: 0 } }
                    items={ menuItems }
                />
            </Sider>

            <div style={ { width: '100%', height: '660px', overflowY: 'scroll' } }>
                { currentMenuOptions === 0 && <TableManufacturing tableData={ tableData }/> }
                { currentMenuOptions === 1 && <FormProduct isCreate={ true }/> }
            </div>
        </div>
    );
};

export default ManufacturingArm;