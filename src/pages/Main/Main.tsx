import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, type MenuProps, theme } from 'antd';
import AppHeader from "../../components/AppHeader/AppHeader";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { DEFAULT_MODULE, LS_KEYS, MODULES_ENUM } from "../../constants";
import MainDashArm from "../../components/ARMApps/MainDashArm/MainDashArm";
import CustomerArm from "../../components/ARMApps/CustomersArm/CustomerArm";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import ManufacturingArm from "../../components/ARMApps/ManufacturingArm/ManufacturingArm";

const { Content, Footer, Sider } = Layout;


const Main: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate: NavigateFunction = useNavigate();

    const [moduleId, setModuleId] = useState<number>(Number(localStorage.getItem(LS_KEYS.moduleId)) || DEFAULT_MODULE);

    const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
            const key = String(index + 1);

            return {
                key: `sub${ key }`,
                icon: React.createElement(icon),
                label: `subnav ${ key }`,

                children: new Array(4).fill(null).map((_, j) => {
                    const subKey: number = index * 4 + j + 1;
                    return {
                        key: subKey,
                        label: `option${ subKey }`,
                    };
                }),
            };
        },
    );

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
        <Layout style={ { height: '100vh', width: '100vw' } }>
            <AppHeader/>

            <Content style={ { padding: '0 48px' } }>
                <Breadcrumb style={ { margin: '16px 0' } }>
                    <Breadcrumb.Item>{ window.location.pathname.substring(0, 17) }</Breadcrumb.Item>
                </Breadcrumb>

                <Layout
                    style={ {
                        height: '90%',
                        padding: '24px 0',
                        overflow: "scroll",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG
                    } }
                >
                    <Sider width={ 200 } style={ { background: colorBgContainer } }>
                        <Menu
                            mode="inline"
                            style={ { borderRight: 0 } }
                            items={ items2 }
                        />
                    </Sider>

                    <div
                        style={ { margin: '24px', height: "auto", minWidth: '400px', overflow: "scroll" } }
                    >
                        { moduleId === MODULES_ENUM.dash && <MainDashArm/> }
                        { moduleId === MODULES_ENUM.customers && <CustomerArm/> }
                        { moduleId === MODULES_ENUM.manufacturing && <ManufacturingArm/> }
                    </div>
                </Layout>
            </Content>
            <Footer style={ { textAlign: 'center' } }>
                TheKost ©{ new Date().getFullYear() }
            </Footer>
        </Layout>
    );
};

export default Main;