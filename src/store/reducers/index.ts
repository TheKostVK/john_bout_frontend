import { productsSlice } from './productsSlice'
import { productService } from "../../services/productsService";
import { customersSlice } from "./customersSlice";
import { customersService } from "../../services/customersService";
import { warehouseService } from "../../services/warehouseService";
import { warehousesSlice } from "./warehousesSlice";
import { contractsSlice } from "./contractsSlice";
import { contractsService } from "../../services/contractsService";
import { financialsSlice } from "./financialSlice";
import { financialsService } from "../../services/financialService";
import { authSlice } from "./authSlice";
import { authService } from "../../services/authService";


const reducers = {
    authReducer: authSlice.reducer,
    productReducer: productsSlice.reducer,
    customerReducer: customersSlice.reducer,
    warehouseReducer: warehousesSlice.reducer,
    contractsReducer: contractsSlice.reducer,
    financialReducer: financialsSlice.reducer,

    [authService.reducerPath]: authService.reducer,
    [productService.reducerPath]: productService.reducer,
    [customersService.reducerPath]: customersService.reducer,
    [warehouseService.reducerPath]: warehouseService.reducer,
    [contractsService.reducerPath]: contractsService.reducer,
    [financialsService.reducerPath]: financialsService.reducer,
}

export default reducers;