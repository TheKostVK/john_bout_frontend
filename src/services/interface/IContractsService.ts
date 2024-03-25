import { contractStatus, contractType, customersCurrency } from "./globalTypes";

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
    production_cost: 200000000,
    contract_amount: 300000000
}

/**
 * Интерфейс получения списка контрактов
 */
export interface IGetContractsResponse {
    success: boolean,
    data: IContract[],
    message?: string
}