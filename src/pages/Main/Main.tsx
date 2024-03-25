import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, theme, ThemeConfig } from 'antd';
import AppHeader from "../../components/AppHeader/AppHeader";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { DEFAULT_MODULE, LS_KEYS, MODULES_ENUM } from "../../constants";
import MainDashArm from "../../components/ARMApps/MainDashArm/MainDashArm";
import CustomerArm from "../../components/ARMApps/CustomersArm/CustomerArm";
import ManufacturingArm from "../../components/ARMApps/ManufacturingArm/ManufacturingArm";
import WarehouseArm from "../../components/ARMApps/WarehouseArm/WarehouseArm";
import messageUtility from "../../components/utility/messageUtility";
import { useLazyGetWarehousesQuery } from "../../services/warehouseService";
import { useDispatch } from "react-redux";
import { IGetWarehousesResponse } from "../../services/interface/IWarehousesService";
import { setWarehouses } from "../../store/reducers/warehousesSlice";
import { useLazyGetProductsQuery } from "../../services/productsService";
import { setProducts } from "../../store/reducers/productsSlice";
import { IGetProductsListResponse } from "../../services/interface/IProductsService";
import { useLazyGetCustomersQuery } from "../../services/customersService";
import { setCustomers } from "../../store/reducers/customersSlice";
import { IGetCustomersListResponse } from "../../services/interface/ICustomersService";

const { Content, Footer } = Layout;


const Main: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG, colorBgBase },
    } = theme.useToken();

    const navigate: NavigateFunction = useNavigate();

    const [moduleId, setModuleId] = useState<number>(Number(localStorage.getItem(LS_KEYS.moduleId)) || DEFAULT_MODULE);

    const [getWarehouses] = useLazyGetWarehousesQuery();
    const [getProducts] = useLazyGetProductsQuery();
    const [getCustomers] = useLazyGetCustomersQuery();

    const dispatch = useDispatch();

    /**
     * Получение списка клиентов.
     */
    const handleGetCustomers = () => {
        getCustomers()
            .unwrap()
            .then((customersResp: IGetCustomersListResponse) => {
                dispatch(setCustomers(customersResp.data));
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
     * Получение списка клиентов.
     */
    const handleGetWarehouses = (): void => {
        getWarehouses()
            .unwrap()
            .then((warehousesResp: IGetWarehousesResponse): void => {
                dispatch(setWarehouses(warehousesResp.data));
            }).catch((err) => {
            console.error(err);

            messageUtility.showMessage({
                key: 'CustomerARMGetCustomersError',
                type: 'error',
                content: 'Ошибка получения списка складов',
            });
        });
    };

    /**
     * Получение всех данных при первом рендере приложения.
     */
    useEffect(() => {
        handleGetCustomers();
        handleGetProducts();
        handleGetWarehouses();
    }, []);

    /**
     * Проверяет текущий модуль и обрабатывает ситуации, когда необходимо изменить рабочую область.
     */
    const checkModule = (): void => {
        const patch: string = window.location.pathname.substring(0, 17);

        const newModuleId: number =
            patch === '/customers' ? MODULES_ENUM.customers :
                patch === '/manufacturing' ? MODULES_ENUM.manufacturing :
                    patch === '/warehouse' ? MODULES_ENUM.warehouse :
                        patch === '/contracts' ? MODULES_ENUM.contracts :
                            patch === '/' ? MODULES_ENUM.dash :
                                DEFAULT_MODULE;

        localStorage.setItem(LS_KEYS.moduleId, newModuleId.toString());
        setModuleId(newModuleId);
    };

    useEffect(checkModule, [navigate]);

    return (
        <Layout style={ { minHeight: '100vh', background: colorBgBase, } }>
            <AppHeader/>

            <Content style={ { padding: '0 24px', marginTop: '24px' } }>
                <Layout
                    style={ {
                        minHeight: '80vh',
                        padding: '5px 0',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG
                    } }
                >
                    <div
                        style={ { margin: '24px', minWidth: '95%' } }
                    >
                        { moduleId === MODULES_ENUM.dash && <MainDashArm/> }
                        { moduleId === MODULES_ENUM.customers && <CustomerArm/> }
                        { moduleId === MODULES_ENUM.manufacturing && <ManufacturingArm/> }
                        { moduleId === MODULES_ENUM.warehouse && <WarehouseArm/> }
                    </div>
                </Layout>
            </Content>
            <Footer style={ { textAlign: 'center', background: colorBgBase } }>
                УВЗ ©{ new Date().getFullYear() }
            </Footer>
        </Layout>
    );
};

export default Main;