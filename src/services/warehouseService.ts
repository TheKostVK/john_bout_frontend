import { createApi, FetchArgs } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from '../constants';
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ICustomError } from "./interface/IErrorService";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./authService";
import { ICreateWarehouseResponse, IGetWarehousesResponse, IWarehouseCreateRequest } from "./interface/IWarehousesService";

const API: string = `http://${BASE_URL}/warehouses`;

export const warehouseService = createApi({
    reducerPath: "warehouseService",
    baseQuery: baseQuery,
    tagTypes: ['Warehouses'],

    endpoints: (builder: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}, {}>, "Warehouses", "warehouseService">) => ({
        getWarehouses: builder.query<IGetWarehousesResponse, void>({
            query: (): string | FetchArgs => ({
                url: `${API}`,
                method: 'GET',
            }),
            providesTags: ['Warehouses']
        }),
        createWarehouse: builder.mutation<ICreateWarehouseResponse, IWarehouseCreateRequest>({
            query: (warehouse: IWarehouseCreateRequest): string | FetchArgs => ({
                url: `${API}`,
                method: 'POST',
                body: warehouse
            }),
        }),
    }),
});

export const {
    useLazyGetWarehousesQuery,
    useCreateWarehouseMutation
} = warehouseService;
