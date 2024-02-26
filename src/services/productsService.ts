import { createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from '../constants';
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { ICustomError } from "./interface/IErrorService";
import { IGetProductsListResponse } from "./interface/IProductsService";

const API = `https://${BASE_URL}/api/modules`;

/**
 * Создает базовый запрос с использованием fetchBaseQuery.
 */
export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
}) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>;

export const productService = createApi({
    reducerPath: "productService",
    baseQuery,
    tagTypes: ['Products'],

    endpoints: (builder: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}, {}>, "Products", "productService">) => ({
        getProducts: builder.query<IGetProductsListResponse, string>({
            query: (): string | FetchArgs => ({
                url: `${API}/products`,
                method: 'GET',
            }),
            providesTags: ['Products']
        }),
    }),
});

export const {
    useGetProductsQuery,
} = productService;