import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IContract } from "../../services/interface/IContractsService";
import { contractStatus } from "../../services/interface/globalTypes";


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
        /**
         * Добавляет новый контракт.
         */
        addContract: (state, action: PayloadAction<IContract>): void => {
            state.contracts.push(action.payload);
        },
        /**
         * Обновляет статус контракта по его id
         */
        updateStatusContract: (state, action: PayloadAction<{
            contractID: number,
            newStatus: contractStatus
        }>): void => {
            const { contractID, newStatus } = action.payload;

            const updateContract: IContract | undefined = state.contracts.find((contract: IContract): boolean => contract.id === contractID);

            if (!updateContract) return;

            updateContract.contract_status = newStatus;

            if (newStatus === 'Выполнен' || newStatus === 'Отменен') updateContract.disable = true;
        },
    },
});

export const {
    setContracts,
    addContract,
    updateStatusContract
} = contractsSlice.actions;

export default contractsSlice.reducer
