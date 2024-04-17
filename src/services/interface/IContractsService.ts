import { contractStatus, contractType, customersCurrency, IResponseBase } from "./globalTypes";

/**
 * Интерфейс контракта
 */
export interface IContract {
    id: number,
    customer_id: number,
    contract_date: string,
    disable: boolean,
    products_sales: {
        id: number,
        quantity: number
    }[],
    description: string,
    contract_type: contractType,
    currency: customersCurrency,
    contract_status: contractStatus,
    production_cost: number,
    contract_amount: number
}

/**
 * Интерфейс получения списка контрактов
 */
export interface IGetContractsResponse extends IResponseBase<any> {

}

/**
 * Интерфейс запроса на завершение контракта
 */
export interface ICompleteContractRequest {
    contractId: number,
}

/**
 * Интерфейс ответа на запрос завершения контракта
 */
export interface ICompleteContractResponse extends IResponseBase<any> {

}

/**
 * Интерфейс запроса на изменение статуса контракта
 */
export interface IChangeStatusContractRequest {
    contractId: number,
    bodyStatus: {
        newStatus: contractStatus,
    }

}

/**
 * Интерфейс ответа на запрос изменения статуса контракта
 */
export interface IChangeStatusContractResponse extends IResponseBase<any> {

}

/**
 * Интерфейс запроса на создание контракта
 */
export interface ICreateContractRequest extends Omit<IContract, 'id' | 'disable' | 'production_cost'> {

}

/**
 * Интерфейс ответа на запрос создания контракта
 */
export interface ICreateContractResponse extends IResponseBase<IContract> {

}
