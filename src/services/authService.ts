import { BaseQueryFn, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants';
import { ICustomError } from "./interface/IErrorService";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ILoginRequest, ILoginResponse } from "./interface/IAuthService";

const API: string = `http://${ BASE_URL }/auth`;

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

export const authService = createApi({
    reducerPath: "authService",
    baseQuery: baseQuery,
    tagTypes: ['User'],

    endpoints: (builder: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}, {}>, "User", "authService">) => ({
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (body: ILoginRequest): string | FetchArgs => ({
                url: `${ API }/login`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['User']
        }),
    }),
});

export const {
    useLoginMutation
} = authService;