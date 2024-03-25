import { Layout, Menu, MenuProps, TableColumnsType, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useLazyGetCustomersQuery } from "../../../services/customersService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setCustomers } from "../../../store/reducers/customersSlice";
import { ICustomer, IGetCustomersListResponse } from "../../../services/interface/ICustomersService";
import messageUtility from "../../utility/messageUtility";
import { AppstoreAddOutlined, OrderedListOutlined } from "@ant-design/icons";
import TableCustomers from "./TableCustomers/TableCustomers";

const { Sider } = Layout;

export interface ICustomerTable extends ICustomer {
    key: number;
}

const CustomerArm = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { customers } = useSelector((state: RootState) => state.customerReducer);

    const [currentMenuOptions, setCurrentMenuOptions] = useState<number>(0);
    const [tableData, setTableData] = React.useState<ICustomerTable[]>([]);

    const [getCustomers] = useLazyGetCustomersQuery();

    const dispatch = useDispatch();

    /**
     * Содержимое бокового меню.
     */
    const menuItems: MenuProps['items'] = [
        {
            key: `customersList`,
            icon: <OrderedListOutlined/>,
            label: `Список клиентов`,
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
     * Обновляет данные таблицы при изменении списка клиентов.
     */
    useEffect(() => {
        let data: ICustomerTable[] = [];

        customers.map((customer: ICustomer, index: number) => {
            data.push({
                key: index,
                ...customer
            });
        });

        setTableData(data);
    }, [customers]);

    /**
     * Получение списка клиентов при первом открытии АРМа.
     */
    useEffect(() => {
        if (customers.length !== 0) return;

        handleGetCustomers();
    }, []);

    return (
        <div className={ 'flex space-x-7' } style={ { width: '100%', height: '610px' } }>
            <Sider width={ 200 } style={ { background: colorBgContainer } }>
                <Menu
                    onClick={ onClickMenu }
                    mode="inline"
                    defaultSelectedKeys={ [`customersList`] }
                    style={ { borderRight: 0 } }
                    items={ menuItems }
                />
            </Sider>

            <div style={ { width: '100%', height: '660px', overflowY: 'scroll' } }>
                { currentMenuOptions === 0 && <TableCustomers tableData={ tableData }/> }
            </div>
        </div>
    )
        ;
};

export default CustomerArm;