import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IContract } from "../../services/interface/IContractsService";


export interface ContractsState {
    contracts: IContract[]
}

const initialState: ContractsState = {
    contracts: []
}

export const contractsSlice = createSlice({
    name: 'contracts',
    initialState: initialState,
    reducers: {
        /**
         * Сохраняет контракты.
         */
        setContracts: (state, action: PayloadAction<IContract[]>): void => {
            state.contracts = action.payload;
        },
    },
});

export const {
    setContracts
} = contractsSlice.actions;

export default contractsSlice.reducer
