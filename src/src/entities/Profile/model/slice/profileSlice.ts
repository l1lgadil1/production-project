import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {USER_LOCALSTORAGE_KEY} from 'shared/const/localstorage';
import {Profile, ProfileSchema} from "entities/Profile";

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error:undefined,
    data:undefined
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
});

// Action creators are generated for each case reducer function
export const {actions: userActions} = profileSlice;
export const {reducer: userReducer} = profileSlice;
