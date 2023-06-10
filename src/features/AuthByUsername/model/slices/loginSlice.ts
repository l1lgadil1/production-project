import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoginSchema} from "../types/LoginSchema";
import {loginByUsername} from "features/AuthByUsername/model/services/loginByUsername/loginByUsername";

const initialState: LoginSchema = {
    username: 'string',
    password: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(loginByUsername.pending, (state, action) => {
            // Add user to the state array
            state.error = undefined;
            state.isLoading = true;
        })
        builder.addCase(loginByUsername.fulfilled, (state, action) => {
            state.error = undefined;
            state.isLoading = false;
        })
        builder.addCase(loginByUsername.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading=false
        })

    },
});

// Action creators are generated for each case reducer function
export const {actions: loginActions} = loginSlice;
export const {reducer: loginReducer} = loginSlice;

