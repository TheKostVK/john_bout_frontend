import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICustomer } from "../../services/interface/ICustomersService";


export interface CustomersState {
    customers: ICustomer[]
}

const initialState: CustomersState = {
    customers: []
}

export const customersSlice = createSlice({
    name: 'customers',
    initialState: initialState,
    reducers: {
        /**
         * Хранит покупателей.
         */
        setCustomers: (state, action: PayloadAction<ICustomer[]>): void => {
            state.customers = action.payload;
        },
    },
});

export const {
    setCustomers
} = customersSlice.actions;

export default customersSlice.reducer
