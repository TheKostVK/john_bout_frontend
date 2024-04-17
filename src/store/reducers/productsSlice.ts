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
         * Сохраняет товары.
         */
        setProducts: (state, action: PayloadAction<IProduct[]>): void => {
            state.products = action.payload;
        },
        /**
         * Добавляет товар.
         */
        addProduct: (state, action: PayloadAction<IProduct>): void => {
            state.products.push(action.payload);
        }
    },
});

export const {
    setProducts,
    addProduct,
} = productsSlice.actions;

export default productsSlice.reducer
