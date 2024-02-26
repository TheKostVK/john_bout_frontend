import { Menu, type MenuProps } from "antd";
import React from "react";
import { Layout } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const AppHeader = () => {
    const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${ key }`,
    }));

    return (
        <Header style={ { display: 'flex', alignItems: 'center' } }>
            <div className="demo-logo"/>

            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={ ['2'] }
                items={[
                    {
                        key: 1,
                        label: `Покупатели`,
                    },
                    {
                        key: 2,
                        label: `Производство`,
                    },
                    {
                        key: 3,
                        label: `Склад`,
                    },
                    {
                        key: 4,
                        label: `Контракты`,
                    },
                ]}
                style={ { flex: 1, minWidth: 0 } }
            />
        </Header>
    )
}

export default AppHeader;