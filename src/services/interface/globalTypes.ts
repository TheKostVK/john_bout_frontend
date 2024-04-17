
export interface IResponseBase<T> {
    success: boolean,
    data: T,
    message?: string
}


// Допустимые значения типа заказчика
export type customersType = 'юридическое лицо' | 'физическое лицо' | 'организация';

// Список доступных валют
export type customersCurrency = 'RUB' | 'USD' | 'CNY';

// Список доступных статусов заказа
export type contractStatus = 'Ожидает подтверждения' | 'В процессе выполнения' | 'Выполнен' | 'Отменен';

// Список доступных типов заказа
export type contractType = 'Поставка';