import { IResponseBase } from "./globalTypes";

/**
 * Интерфейс склада
 */
export interface IWarehouse {
    id: number,
    name: string,
    address: string,
    current_capacity: number,
    capacity: number,
    disable: boolean,
    warehouse_type: string
}

/**
 * Интерфейс создания склада
 */
export interface IWarehouseCreateRequest extends Omit<IWarehouse, "id"> {}

/**
 * Интерфейс ответа на создание склада
 */
export interface ICreateWarehouseResponse extends IResponseBase<IWarehouse>{

}

/**
 * Интерфейс для получения списка складов
 */
export interface IGetWarehousesResponse extends IResponseBase<IWarehouse[]>{

}