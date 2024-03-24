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
 * Интерфейс для получения списка складов
 */
export interface IGetWarehousesResponse {
    success: boolean,
    data: IWarehouse[],
    message?: string
}