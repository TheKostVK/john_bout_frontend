import { IResponseBase } from "./globalTypes";

/**
 * Интерфейс пользователя
 */
export interface IUser {
    email: string;
    password: string;
}

/**
 * Интерфейс запроса авторизации
 */
export interface ILoginRequest {
    email: string;
    password: string;
}

/**
 * Интерфейс ответа авторизации
 */
export interface ILoginResponse extends IResponseBase<IUser> {

}