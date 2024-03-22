import { Layout, Menu, type MenuProps, theme } from "antd";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

const { Content, Footer, Sider } = Layout;


const MainDashArm = () => {


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
            const key = String(index + 1);

            return {
                key: `sub${ key }`,
                icon: React.createElement(icon),
                label: `subnav ${ key }`,

                children: new Array(4).fill(null).map((_, j) => {
                    const subKey = index * 4 + j + 1;
                    return {
                        key: subKey,
                        label: `option${ subKey }`,
                    };
                }),
            };
        },
    );

    return (
        <div>
            <p>mainDashArm</p>
        </div>
    )
};

export default MainDashArm;