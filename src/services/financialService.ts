import { createApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from '../constants';
import { ICustomError } from "./interface/IErrorService";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./authService";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { IGetFinancialsRequest, IGetFinancialsResponse } from "./interface/IFinancialsService";

const API: string = `http://${BASE_URL}/financial`;

export const financialsService = createApi({
    reducerPath: "financialsService",
    baseQuery: baseQuery,
    tagTypes: ['Financials'],

    endpoints: (builder: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}, {}>, "Financials", "financialsService">) => ({
        getFinancials: builder.query<IGetFinancialsResponse, IGetFinancialsRequest>({
            query: (): string | FetchArgs => ({
                url: `${API}`,
                method: 'GET',
            }),
            providesTags: ['Financials']
        }),
    }),
});

export const {
    useLazyGetFinancialsQuery,
} = financialsService;
