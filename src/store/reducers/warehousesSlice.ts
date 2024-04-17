import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWarehouse } from "../../services/interface/IWarehousesService";


export interface WarehouseState {
    warehouses: IWarehouse[]
}

const initialState: WarehouseState = {
    warehouses: []
}

export const warehousesSlice = createSlice({
    name: 'warehouse',
    initialState: initialState,
    reducers: {
        /**
         * Сохраняет склады.
         */
        setWarehouses: (state, action: PayloadAction<IWarehouse[]>): void => {
            state.warehouses = action.payload;
        },
        /**
         * Добавляет склад.
         */
        addWarehouse: (state, action: PayloadAction<IWarehouse>): void => {
            state.warehouses.push(action.payload);
        }
    },
});

export const {
    setWarehouses,
    addWarehouse,
} = warehousesSlice.actions;

export default warehousesSlice.reducer
