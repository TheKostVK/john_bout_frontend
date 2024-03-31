import { createApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from '../constants';
import { ICustomError } from "./interface/IErrorService";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import {
    ICreateCustomerRequest,
    ICreateCustomerResponse,
    IGetCustomersListResponse
} from "./interface/ICustomersService";
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
        createCustomers: builder.mutation<ICreateCustomerResponse, ICreateCustomerRequest>({
            query: (customer: ICreateCustomerRequest) => ({
                url: `${API}`,
                method: 'POST',
                body: customer
            }),
            invalidatesTags: ['Customers']
        }),
    }),
});

export const {
    useLazyGetCustomersQuery,
    useCreateCustomersMutation
} = customersService;
