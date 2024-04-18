import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface IFinancialState {
    financial: any[]
}

const initialState: IFinancialState = {
    financial: []
}

export const financialsSlice = createSlice({
    name: 'financial',
    initialState: initialState,
    reducers: {
        /**
         * Сохраняет финансовые отчеты.
         */
        setFinancials: (state, action: PayloadAction<any[]>): void => {
            state.financial = action.payload;
        },
        /**
         * Добавляет новый финансовый отчет.
         */
        addFinancial: (state, action: PayloadAction<any>): void => {
            state.financial.push(action.payload);
        }
    },
});

export const {
    setFinancials,
    addFinancial
} = financialsSlice.actions;

export default financialsSlice.reducer
