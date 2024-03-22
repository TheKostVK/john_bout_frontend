import { BaseQueryFn, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants';
import { ICustomError } from "./interface/IErrorService";

/**
 * Создает базовый запрос с использованием fetchBaseQuery.
 */
export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers: Headers, { getState }) => {
        // headers.append('Cache-Control', 'no-cache');
        return headers;
    },
}) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>;
