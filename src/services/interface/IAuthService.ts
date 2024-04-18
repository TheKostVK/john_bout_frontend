import { IResponseBase } from "./globalTypes";

/**
 * Интерфейс пользователя
 */
export interface IUser {
    username: string;
    password: string;
}

/**
 * Интерфейс запроса авторизации
 */
export interface ILoginRequest {
    username: string;
    password: string;
}

/**
 * Интерфейс ответа авторизации
 */
export interface ILoginResponse extends IResponseBase<IUser> {

}