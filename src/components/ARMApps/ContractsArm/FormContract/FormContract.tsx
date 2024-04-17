import { FC } from 'react'
import { IProduct } from "../../../../services/interface/IProductsService";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { ICreateContractRequest, ICreateContractResponse } from "../../../../services/interface/IContractsService";
import messageUtility from "../../../utility/messageUtility";
import { useCreateContractMutation } from "../../../../services/contractsService";
import { addContract } from "../../../../store/reducers/contractsSlice";

interface Props {
    isCreate: boolean;
    initialValues?: IProduct;
}

/**
 * Форма создания контракта
 * @param isCreate - флаг создания
 * @param initialValues - значения по умолчанию
 */
export const FormContract: FC<Props> = ({ isCreate = true, initialValues }) => {
    const [form] = Form.useForm();

    const { products } = useSelector((state: RootState) => state.productReducer);
    const { warehouses } = useSelector((state: RootState) => state.warehouseReducer);

    const [createContract] = useCreateContractMutation();

    const dispatch = useDispatch();

    /**
     * Обработчик создания контракта.
     */
    const onFinish = (values: ICreateContractRequest): void => {
        messageUtility.showMessage({
            key: 'createContract',
            type: 'loading',
            duration: 0,
            content: 'Создание контракта...'
        });

        createContract(values).unwrap().then((response: ICreateContractResponse): void => {
            if (response.success) {
                dispatch(addContract(response.data));

                messageUtility.showMessage({
                    key: 'createContract',
                    type: 'success',
                    content: 'Товар успешно создан'
                });
            }
        }).catch((error): void => {
            messageUtility.showMessage({
                key: 'createContract',
                type: 'error',
                content: `Статус: ${ error.status }. Ошибка: ${ error.message }`
            });
        });

        form.resetFields();
    };

    return (
        <Form
            form={ form }
            onFinish={ onFinish }
            initialValues={ initialValues }
            layout="vertical"
            style={ { width: '98%' } }
        >

        </Form>
    )
};