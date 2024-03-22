import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from "../../services/interface/IProductsService";


export interface ProductsState {
    products: IProduct[]
}

const initialState: ProductsState = {
    products: []
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        /**
         * Хранит товары.
         */
        setProducts: (state, action: PayloadAction<IProduct[]>): void => {
            state.products = action.payload;
        },
    },
});

export const {
    setProducts,
} = productsSlice.actions;

export default productsSlice.reducer
