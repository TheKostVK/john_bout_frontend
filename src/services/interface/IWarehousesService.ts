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
export interface IWarehouseCreate extends Omit<IWarehouse, "id"> {}

/**
 * Интерфейс ответа на создание склада
 */
export interface ICreateWarehouseResponse {
    success: boolean,
    data: IWarehouse,
    message?: string
}

/**
 * Интерфейс для получения списка складов
 */
export interface IGetWarehousesResponse {
    success: boolean,
    data: IWarehouse[],
    message?: string
}