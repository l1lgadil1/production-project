import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UISchema} from "@/features/UI";

const initialState: UISchema = {
    scroll: {}
};

export const UISlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setScroll: (state, {payload}: PayloadAction<{ path: string, position: number }>) => {
            state.scroll[payload.path] = payload.position;
        }
    },
    extraReducers: (builder) => {

    },
});

// Action creators are generated for each case reducer function
export const {actions: UISliceActions} = UISlice;
export const {reducer: UISliceReducers} = UISlice;
