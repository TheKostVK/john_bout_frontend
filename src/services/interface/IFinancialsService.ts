import { IResponseBase } from "./globalTypes";

/**
 * Интерфейс финансового отчета
 */
export interface IFinancial {
    id: number,
    report_date: string,
    disable: boolean,
    income: number,
    expenditure: number,
    profit: number,
    current_balance: number
}

/**
 * Интерфейс запроса на получение финансовых отчетов
 */
export interface IGetFinancialsRequest {

}

/**
 * Интерфейс ответа на запрос получения списка финансовых отчетов
 */
export interface IGetFinancialsResponse extends IResponseBase<IFinancial[]> {

}
