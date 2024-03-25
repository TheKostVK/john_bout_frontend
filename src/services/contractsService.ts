import { createApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from '../constants';
import { ICustomError } from "./interface/IErrorService";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./authService";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { IGetContractsResponse } from "./interface/IContractsService";

const API: string = `http://${BASE_URL}/supplyContracts`;

export const contractsService = createApi({
    reducerPath: "contractsService",
    baseQuery: baseQuery,
    tagTypes: ['Contracts'],

    endpoints: (builder: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}, {}>, "Contracts", "contractsService">) => ({
        getContracts: builder.query<IGetContractsResponse, void>({
            query: (): string | FetchArgs => ({
                url: `${API}`,
                method: 'GET',
            }),
            providesTags: ['Contracts']
        }),
    }),
});

export const {
    useLazyGetContractsQuery
} = contractsService;
