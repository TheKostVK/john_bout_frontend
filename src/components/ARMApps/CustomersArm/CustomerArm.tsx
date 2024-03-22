import { Table, TableColumnsType, theme } from "antd";
import React, { useEffect } from "react";
import { useLazyGetCustomersQuery } from "../../../services/customersService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setCustomers } from "../../../store/reducers/customersSlice";
import { ICustomer, IGetCustomersListResponse } from "../../../services/interface/ICustomersService";
import messageUtility from "../../utility/messageUtility";

interface ICustomerTable extends ICustomer {
    key: number;
}

const CustomerArm = () => {
    const { customers } = useSelector((state: RootState) => state.customerReducer);
    const [tableData, setTableData] = React.useState<ICustomerTable[]>([]);

    const [getCustomers] = useLazyGetCustomersQuery();

    const dispatch = useDispatch();

    /**
     * Описание столбцов таблицы.
     */
    const columns: TableColumnsType<ICustomerTable> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 50,
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: 'Адрес',
            dataIndex: 'address',
            width: 150,
        },
        {
            title: 'Контактная информация',
            dataIndex: 'contact_info',
            width: 150,
        },
        {
            title: 'Тип',
            dataIndex: 'type',
            width: 150,
        },
        {
            title: 'Валюта',
            dataIndex: 'currency',
            width: 50,
        },
    ];

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
        <div>
            <p className={ 'my-2' }>customerArm</p>

            <div>
                <Table
                    columns={ columns }
                    dataSource={ tableData }
                    pagination={ false }
                    scroll={ { x: 300, y: 740 } }
                />
            </div>
        </div>
    );
};

export default CustomerArm;