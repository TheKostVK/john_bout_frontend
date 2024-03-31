import { Layout, Menu, type MenuProps, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { AppstoreAddOutlined, OrderedListOutlined } from "@ant-design/icons";

const { Sider } = Layout;

/**
 * АРМ главного экрана
 */
const MainDashArm = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { warehouses } = useSelector((state: RootState) => state.warehouseReducer);

    const [currentMenuOptions, setCurrentMenuOptions] = useState<number>(0);
    const [tableData, setTableData] = useState<any[]>([]);

    const dispatch = useDispatch();

    /**
     * Содержимое бокового меню.
     */
    const menuItems: MenuProps['items'] = [
        {
            key: `mainList`,
            icon: <OrderedListOutlined/>,
            label: `Главная`,
        },
    ];

    /**
     * Обработчик нажатия на боковое меню.
     */
    const onClickMenu: MenuProps['onClick'] = (e): void => {
        switch (e.key) {
            case `mainList`:
                setCurrentMenuOptions(0);
                break;
            default:
                break;
        }
    };

    return (
        <div className={ 'flex space-x-7' } style={ { width: '100%', height: '610px' } }>
            <Sider width={ 200 } style={ { background: colorBgContainer } }>
                <Menu
                    onClick={ onClickMenu }
                    mode="inline"
                    defaultSelectedKeys={ [`mainList`] }
                    style={ { borderRight: 0 } }
                    items={ menuItems }
                />
            </Sider>

            <div style={ { width: '100%', height: '660px', overflowY: 'scroll' } }>

            </div>
        </div>
    );
};

export default MainDashArm;