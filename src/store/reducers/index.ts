import { productsSlice } from './productsSlice'
import { productService } from "../../services/productsService";
import { customersSlice } from "./customersSlice";
import { customersService } from "../../services/customersService";
import { warehouseService } from "../../services/warehouseService";
import { warehousesSlice } from "./warehousesSlice";
import { contractsSlice } from "./contractsSlice";
import { contractsService } from "../../services/contractsService";

const reducers = {
    productReducer: productsSlice.reducer,
    customerReducer: customersSlice.reducer,
    warehouseReducer: warehousesSlice.reducer,
    contractsReducer: contractsSlice.reducer,

    [productService.reducerPath]: productService.reducer,
    [customersService.reducerPath]: customersService.reducer,
    [warehouseService.reducerPath]: warehouseService.reducer,
    [contractsService.reducerPath]: contractsService.reducer,
}

export default reducers;