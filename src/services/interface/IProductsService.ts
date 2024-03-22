/**
 * Интерфейс модели товара
 */
export interface IProduct {
    id: number,
    name: string,
    characteristics: any[],
    disable: boolean,
    quantity: number,
    storage_location: number,
    product_type: string,
    subtype: string,
    occupied_space: number,
    price: number,
    reserved_quantity: number,
    image_url: string,
    production_cost: number
}

/**
 * Интерфейс ответа на запрос получения списка товаров.
 */
export interface IGetProductsListResponse {
    success: boolean,
    data: IProduct[],
    message?: string
}