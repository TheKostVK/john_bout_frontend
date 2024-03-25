
// Допустимые значения типа заказчика
export type customersType = 'юридическое лицо' | 'физическое лицо' | 'организация';

// Список доступных валют
export type customersCurrency = 'RUB' | 'USD' | 'CNY';

// Список доступных статусов заказа
export type contractStatus = 'В ожидании' | 'Выполнен';

// Список доступных типов заказа
export type contractType = 'Поставка';