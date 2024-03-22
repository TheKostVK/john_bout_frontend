/**
 * URL адрес для веб-апи.
 */
export const BASE_URL: string = 'localhost:5000';

/**
 * Перечисление модулей.
 */
export enum MODULES_ENUM {
    dash = 0,
    customers = 1,
    manufacturing = 2,
    warehouse = 3,
    contracts = 4,
}

/**
 * Значение по умолчанию для модуля.
 */
export const DEFAULT_MODULE: number = 0;

/**
 * Список ключей localStorage.
 */
export const LS_KEYS = {
    moduleId: 'moduleId',
};