import { productsSlice } from './productsSlice'
import { productService } from "../../services/productsService";

const reducers = {
    authReducer: productsSlice,

    [productService.reducerPath]: productService.reducer,
}

export default reducers;