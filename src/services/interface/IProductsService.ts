/**
 * Интерфейс модели товара
 */
export interface IProduct {
    id: number,
    name: string,
    characteristics: { name: string, value: string }[],
    disable: boolean,
    quantity: number,
    storage_location: number,
    product_type: string,
    product_subtype: string,
    occupied_space: number,
    price: number,
    reserved_quantity: number,
    image_url: string,
    production_cost: number,
    product_description: string
}

/**
 * Интерфейс создания товара
 */
export interface IProductCreateRequest extends Omit<IProduct, "id"> {}

/**
 * Интерфейс ответа на запрос получения списка товаров.
 */
export interface IGetProductsListResponse {
    success: boolean,
    data: IProduct[],
    message?: string
}

/**
 * Интерфейс ответа на создание товара
 */
export interface ICreateProductResponse {
    success: boolean,
    data: IProduct,
    message?: string
}