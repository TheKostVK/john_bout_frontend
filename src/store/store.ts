import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { productService } from "../services/productsService";
import { customersService } from "../services/customersService";
import { warehouseService } from "../services/warehouseService";

const rootReducer = combineReducers(reducers);

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(
                    productService.middleware,
                    customersService.middleware,
                    warehouseService.middleware
                )
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
