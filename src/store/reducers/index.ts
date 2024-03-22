import { productsSlice } from './productsSlice'
import { productService } from "../../services/productsService";
import { customersSlice } from "./customersSlice";
import { customersService } from "../../services/customersService";

const reducers = {
    productReducer: productsSlice.reducer,
    customerReducer: customersSlice.reducer,

    [productService.reducerPath]: productService.reducer,
    [customersService.reducerPath]: customersService.reducer
}

export default reducers;