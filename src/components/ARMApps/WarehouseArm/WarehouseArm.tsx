import { Layout, Menu, type MenuProps, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import messageUtility from "../../utility/messageUtility";
import { AppstoreAddOutlined, OrderedListOutlined } from "@ant-design/icons";
import { useLazyGetWarehousesQuery } from "../../../services/warehouseService";
import { IGetWarehousesResponse, IWarehouse } from "../../../services/interface/IWarehousesService";
import { setWarehouses } from "../../../store/reducers/warehousesSlice";
import TableWarehouses from "./TableWarehouses/TableWarehouses";

const { Sider } = Layout;

export interface IWarehouseTable extends IWarehouse {
    key: number;
}

const WarehouseArm = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { warehouses } = useSelector((state: RootState) => state.warehouseReducer);

    const [currentMenuOptions, setCurrentMenuOptions] = useState<number>(0);
    const [tableData, setTableData] = useState<IWarehouseTable[]>([]);

    const [getWarehouses] = useLazyGetWarehousesQuery();

    const dispatch = useDispatch();

    /**
     * Содержимое бокового меню.
     */
    const menuItems: MenuProps['items'] = [
        {
            key: `productList`,
            icon: <OrderedListOutlined/>,
            label: `Список складов`,
        },
        {
            key: `createProduct`,
            icon: <AppstoreAddOutlined/>,
            label: `Создание склада`,
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
     * Обновляет данные таблицы при изменении списка клиентов.
     */
    useEffect((): void => {
        let data: IWarehouseTable[] = [];

        warehouses.map((warehouse: IWarehouse, index: number): void => {
            data.push({
                key: index,
                ...warehouse
            });
        });

        setTableData(data);
    }, [warehouses]);

    /**
     * Получение списка клиентов при первом открытии АРМа.
     */
    useEffect((): void => {
        if (warehouses.length !== 0) return;

        handleGetWarehouses();
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
                { currentMenuOptions === 0 && <TableWarehouses tableData={ tableData }/> }
            </div>
        </div>
    );
};

export default WarehouseArm;