import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProducts } from "../../services/interface/IProductsService";


export interface ProductsState {
    products: IProducts[]
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
        setProducts: (state, action: PayloadAction<IProducts[]>): void => {
            state.products = action.payload;
        },
    },
})

export default productsSlice.reducer
