import { createApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from '../constants';
import { ICustomError } from "./interface/IErrorService";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { IGetCustomersListResponse } from "./interface/ICustomersService";
import { baseQuery } from "./authService";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const API: string = `http://${BASE_URL}/customers`;

export const customersService = createApi({
    reducerPath: "customersService",
    baseQuery: baseQuery,
    tagTypes: ['Customers'],

    endpoints: (builder: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}, {}>, "Customers", "customersService">) => ({
        getCustomers: builder.query<IGetCustomersListResponse, void>({
            query: (): string | FetchArgs => ({
                url: `${API}`,
                method: 'GET',
            }),
            providesTags: ['Customers']
        }),
    }),
});

export const {
    useLazyGetCustomersQuery,
} = customersService;
