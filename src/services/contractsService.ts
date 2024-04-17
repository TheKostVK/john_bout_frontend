import { createApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from '../constants';
import { ICustomError } from "./interface/IErrorService";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./authService";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
    IChangeStatusContractRequest,
    IChangeStatusContractResponse,
    ICompleteContractRequest,
    ICompleteContractResponse, ICreateContractRequest, ICreateContractResponse,
    IGetContractsResponse
} from "./interface/IContractsService";

const API: string = `http://${ BASE_URL }/supplyContracts`;

export const contractsService = createApi({
    reducerPath: "contractsService",
    baseQuery: baseQuery,
    tagTypes: ['Contracts', 'Contract'],

    endpoints: (builder: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}, {}>, "Contracts" | "Contract", "contractsService">) => ({
        getContracts: builder.query<IGetContractsResponse, void>({
            query: (): string | FetchArgs => ({
                url: `${ API }`,
                method: 'GET',
            }),
            providesTags: ['Contracts']
        }),
        completeContract: builder.mutation<ICompleteContractResponse, ICompleteContractRequest>({
            query: (body: ICompleteContractRequest): string | FetchArgs => ({
                url: `${ API }/${ body.contractId }`,
                method: 'POST',
            }),
            invalidatesTags: ['Contract']
        }),
        changeContractStatus: builder.mutation<IChangeStatusContractResponse, IChangeStatusContractRequest>({
            query: (body: IChangeStatusContractRequest): string | FetchArgs => ({
                url: `${ API }/status/${ body.contractId }`,
                method: 'POST',
                body: body.bodyStatus,
            }),
            invalidatesTags: ['Contract']
        }),
        createContract: builder.mutation<ICreateContractResponse, ICreateContractRequest>({
            query: (body: ICreateContractRequest): string | FetchArgs => ({
                url: `${ API }/`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Contract']
        }),
    }),
});

export const {
    useLazyGetContractsQuery,
    useCompleteContractMutation,
    useChangeContractStatusMutation,
    useCreateContractMutation,
} = contractsService;
