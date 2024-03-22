import { customersCurrency, customersType } from "./globalTypes";

/**
 * Интерфейс модели покупателя
 */
export interface ICustomer {
    id: number,
    name: string,
    address: string,
    contact_info: string,
    disable: boolean,
    type: customersType
    currency: customersCurrency
}

/**
 * Интерфейс ответа на запрос получения списка покупателей.
 */
export interface IGetCustomersListResponse {
    success: boolean,
    data: ICustomer[],
    message?: string
}