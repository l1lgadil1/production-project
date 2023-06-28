import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AddNewCommentSchema} from "../types/addNewComment";

const initialState: AddNewCommentSchema = {
};

export const addNewCommentSlice = createSlice({
    name: 'addNewComment',
    initialState,
    reducers: {
        setText:(state,action:PayloadAction<string>)=>{
            state.text = action.payload
        }
    },
    extraReducers: (builder) => {

    },
});

// Action creators are generated for each case reducer function
export const { actions: addNewCommentActions } = addNewCommentSlice;
export const { reducer: addNewCommentReducers } = addNewCommentSlice;
