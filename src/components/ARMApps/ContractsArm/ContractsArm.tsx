import { Layout, Menu, MenuProps, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import messageUtility from "../../utility/messageUtility";
import { AppstoreAddOutlined, OrderedListOutlined } from "@ant-design/icons";
import TableContracts from "./TableContracts/TableContracts";
import { IContract, IGetContractsResponse } from "../../../services/interface/IContractsService";
import { useLazyGetContractsQuery } from "../../../services/contractsService";
import { setContracts } from "../../../store/reducers/contractsSlice";
import { FormContract } from "./FormContract/FormContract";

const { Sider } = Layout;

export interface IContractsTable extends IContract {
    key: number;
}

/**
 * АРМ для работы с контрактами
 */
const ContractsArm = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { contracts } = useSelector((state: RootState) => state.contractsReducer);

    const [currentMenuOptions, setCurrentMenuOptions] = useState<number>(0);
    const [tableData, setTableData] = React.useState<IContractsTable[]>([]);

    const [getContracts] = useLazyGetContractsQuery();

    const dispatch = useDispatch();

    /**
     * Содержимое бокового меню.
     */
    const menuItems: MenuProps['items'] = [
        {
            key: `contractsList`,
            icon: <OrderedListOutlined/>,
            label: `Список контрактов`,
        },
        {
            key: `createContract`,
            icon: <AppstoreAddOutlined/>,
            label: `Создание контракта`,
        },
    ];

    /**
     * Обработчик нажатия на боковое меню.
     */
    const onClickMenu: MenuProps['onClick'] = (e): void => {
        switch (e.key) {
            case `contractsList`:
                setCurrentMenuOptions(0);
                break;
            case `createContract`:
                setCurrentMenuOptions(1);
                break;
            default:
                break;
        }
    };

    /**
     * Получение списка контрактов.
     */
    const handleGetContracts = (): void => {
        getContracts()
            .unwrap()
            .then((contractsResp: IGetContractsResponse): void => {
                dispatch(setContracts(contractsResp.data));
            }).catch((err): void => {
            console.error(err);

            messageUtility.showMessage({
                key: 'ContractsARMGetContractsError',
                type: 'error',
                content: 'Ошибка получения списка контрактов',
            });
        });
    };

    /**
     * Обновляет данные таблицы при изменении списка контрактов.
     */
    useEffect(() => {
        let data: IContractsTable[] = [];

        contracts.map((contract: IContract, index: number): void => {
            data.push({
                key: index,
                ...contract
            });
        });

        setTableData(data);
    }, [contracts]);

    /**
     * Получение списка контрактов при первом открытии АРМа.
     */
    useEffect((): void => {
        if (contracts.length !== 0) return;

        handleGetContracts();
    }, []);

    return (
        <div className={ 'flex space-x-7' } style={ { width: '100%', height: '610px' } }>
            <Sider width={ 200 } style={ { background: colorBgContainer } }>
                <Menu
                    onClick={ onClickMenu }
                    mode="inline"
                    defaultSelectedKeys={ [`contractsList`] }
                    style={ { borderRight: 0 } }
                    items={ menuItems }
                />
            </Sider>

            <div style={ { width: '100%', height: '660px', overflowY: 'scroll' } }>
                { currentMenuOptions === 0 && <TableContracts tableData={ tableData }/> }
                { currentMenuOptions === 1 && <FormContract isCreate={ true }/> }
            </div>
        </div>
    )
        ;
};

export default ContractsArm;