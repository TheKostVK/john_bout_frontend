import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from "../../services/interface/IAuthService";


export interface authState {
    user: IUser | undefined;
    isAuthenticated: boolean;
}

const initialState: authState = {
    user: undefined,
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'contracts',
    initialState: initialState,
    reducers: {
        /**
         * Сохраняет пользователя
         */
        setUser: (state, action: PayloadAction<IUser>): void => {
            state.user = action.payload;
            state.isAuthenticated = true;
        }
    },
});

export const {
    setUser
} = authSlice.actions;

export default authSlice.reducer
