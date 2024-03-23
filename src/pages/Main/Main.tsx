import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, theme, ThemeConfig } from 'antd';
import AppHeader from "../../components/AppHeader/AppHeader";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { DEFAULT_MODULE, LS_KEYS, MODULES_ENUM } from "../../constants";
import MainDashArm from "../../components/ARMApps/MainDashArm/MainDashArm";
import CustomerArm from "../../components/ARMApps/CustomersArm/CustomerArm";
import ManufacturingArm from "../../components/ARMApps/ManufacturingArm/ManufacturingArm";

const { Content, Footer } = Layout;


const Main: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG, colorBgBase },
    } = theme.useToken();

    const navigate: NavigateFunction = useNavigate();

    const [moduleId, setModuleId] = useState<number>(Number(localStorage.getItem(LS_KEYS.moduleId)) || DEFAULT_MODULE);

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

            <Content style={ { padding: '0 48px' } }>
                <Breadcrumb style={ { margin: '16px 0' } }>
                    <Breadcrumb.Item>{ window.location.pathname.substring(0, 17) }</Breadcrumb.Item>
                </Breadcrumb>

                <Layout
                    style={ {
                        minHeight: '70vh',
                        padding: '24px 0',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG
                    } }
                >
                    <div
                        style={ { margin: '24px', minWidth: '96%' } }
                    >
                        { moduleId === MODULES_ENUM.dash && <MainDashArm/> }
                        { moduleId === MODULES_ENUM.customers && <CustomerArm/> }
                        { moduleId === MODULES_ENUM.manufacturing && <ManufacturingArm/> }
                    </div>
                </Layout>
            </Content>
            <Footer style={ { textAlign: 'center', background: colorBgBase} }>
                УВЗ ©{ new Date().getFullYear() }
            </Footer>
        </Layout>
    );
};

export default Main;