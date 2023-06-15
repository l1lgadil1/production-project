import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from 'app/providers/StoreProvider';
import {Profile, ValitdateProfileError} from '../../types/profile';
import {getProfileForm} from "entities/Profile";
import {validateProfileData} from "entities/Profile/model/services/validateProfileData/validateProfileData";

export const  updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValitdateProfileError[]>
>(
    'profile/updateProfileData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue,getState } = thunkApi;

        const formData = getProfileForm(getState())
        const errors = validateProfileData(formData!)

        if(errors.length){
            return rejectWithValue(errors)
        }
        try {
            const response = await extra.api.put<Profile>('/profile',formData);

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue([ValitdateProfileError.SERVER_ERROR]);
        }
    },
);
