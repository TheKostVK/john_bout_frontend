import { createApi, FetchArgs } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from '../constants';
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ICustomError } from "./interface/IErrorService";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./authService";
import { ICreateProductResponse, IGetProductsListResponse, IProductCreateRequest } from "./interface/IProductsService";

const API: string = `http://${BASE_URL}/products`;

export const productService = createApi({
    reducerPath: "productService",
    baseQuery: baseQuery,
    tagTypes: ['Products'],

    endpoints: (builder: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}, {}>, "Products", "productService">) => ({
        getProducts: builder.query<IGetProductsListResponse, void>({
            query: (): string | FetchArgs => ({
                url: `${API}`,
                method: 'GET',
            }),
            providesTags: ['Products']
        }),
        createProduct: builder.mutation<ICreateProductResponse, IProductCreateRequest>({
            query: (product: IProductCreateRequest): string | FetchArgs => ({
                url: `${API}`,
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Products']
        }),
    }),
});

export const {
    useLazyGetProductsQuery,
    useCreateProductMutation
} = productService;
