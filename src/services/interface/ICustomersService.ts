import { customersCurrency, customersType, IResponseBase } from "./globalTypes";

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
 * Интерфейс создания нового покупателя.
 */
export interface ICreateCustomerRequest extends Omit<ICustomer, "id"> {}

/**
 * Интерфейс ответа на запрос создания нового покупателя.
 */
export interface ICreateCustomerResponse extends IResponseBase<ICustomer>{

}

/**
 * Интерфейс ответа на запрос получения списка покупателей.
 */
export interface IGetCustomersListResponse extends IResponseBase<ICustomer[]>{

}