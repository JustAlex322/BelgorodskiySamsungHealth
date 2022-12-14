import { createAsyncThunk } from '@reduxjs/toolkit';
import { IuserDataForSet } from '../../API/userAPI/TuserAPI';
import { userAPI } from '../../API/userAPI/userAPI';
import { setLoading } from '../common/commonSlice';
import { setUserChanedata } from './userSlice';

export const getUserData = createAsyncThunk(
    "user/getUserData",
    async (id : number,thunkApi) => {
        try {
            const response = await userAPI.getUserData(id);
            thunkApi.dispatch(setLoading(false))
            thunkApi.dispatch(setUserChanedata(false));
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue("Что то пошло не так ...")
        }
    }
)

export const setUserData = createAsyncThunk(
    "user/setUserData",
    async (userData : IuserDataForSet,thunkApi) => {
        try {
            const response = await userAPI.setUserData(userData);
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue("Что то пошло не так ...")
        }
    }
)

