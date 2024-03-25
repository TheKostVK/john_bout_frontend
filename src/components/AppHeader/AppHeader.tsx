import { Menu, type MenuProps } from "antd";
import React from "react";
import { Layout } from 'antd';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LS_KEYS } from "../../constants";

const { Header, Content, Footer, Sider } = Layout;

const AppHeader = () => {
    const currentModuleId: string = localStorage.getItem(LS_KEYS.moduleId) || '';

    const navigate: NavigateFunction = useNavigate();

    return (
        <Header style={ { display: 'flex', alignItems: 'center' } }>
            <div className="demo-logo"/>

            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={ [currentModuleId] }
                items={[
                    {
                        key: 0,
                        label: `ИнфПанель`,
                        onClick: () => navigate('/'),
                    },
                    {
                        key: 1,
                        label: `Покупатели`,
                        onClick: () => navigate('/customers'),
                    },
                    {
                        key: 2,
                        label: `Производство`,
                        onClick: () => navigate('/manufacturing'),
                    },
                    {
                        key: 3,
                        label: `Склад`,
                        onClick: () => navigate('/warehouse'),
                    },
                    {
                        key: 4,
                        label: `Контракты`,
                        onClick: () => navigate('/contracts'),
                    },
                ]}
                style={ { flex: 1, minWidth: 0 } }
            />
        </Header>
    )
}

export default AppHeader;