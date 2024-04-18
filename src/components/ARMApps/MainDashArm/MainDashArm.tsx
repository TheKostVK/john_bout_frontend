import { Layout, Menu, type MenuProps, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { AppstoreAddOutlined, OrderedListOutlined } from "@ant-design/icons";
import { IFinancial, IGetFinancialsResponse } from "../../../services/interface/IFinancialsService";
import TableDashArm, { IFinancialTable } from "./TableDashArm/TableDashArm";
import { useLazyGetFinancialsQuery } from "../../../services/financialService";
import { setFinancials } from "../../../store/reducers/financialSlice";
import messageUtility from "../../utility/messageUtility";

const { Sider } = Layout;

/**
 * АРМ главного экрана
 */
const MainDashArm = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { financial } = useSelector((state: RootState) => state.financialReducer);

    const [currentMenuOptions, setCurrentMenuOptions] = useState<number>(0);
    const [tableData, setTableData] = useState<any[]>([]);

    const [getFinancials] = useLazyGetFinancialsQuery();

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

    /**
     * Получение списка финансовых отчетов.
     */
    const handleGetFinancials = (): void => {
        getFinancials({})
            .unwrap()
            .then((financialsResp: IGetFinancialsResponse): void => {
                dispatch(setFinancials(financialsResp.data));
            }).catch((err): void => {
            console.error(err);

            messageUtility.showMessage({
                key: 'FinancialsARMGetProductsError',
                type: 'error',
                content: 'Ошибка получения списка финансовых отчетов',
            });
        });
    };

    /**
     * Обновляет данные таблицы при изменении списка финансовых отчетов.
     */
    useEffect((): void => {
        let data: IFinancialTable[] = [];

        financial.map((product: IFinancial, index: number): void => {
            data.push({
                key: index,
                ...product
            });
        });

        setTableData(data);
    }, [financial]);

    /**
     * Получение списка финансовых отчетов при первом открытии АРМа.
     */
    useEffect((): void => {
        if (financial.length !== 0) return;

        handleGetFinancials();
    }, []);

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
                { currentMenuOptions === 0 && <TableDashArm tableData={ tableData }/> }
            </div>
        </div>
    );
};

export default MainDashArm;