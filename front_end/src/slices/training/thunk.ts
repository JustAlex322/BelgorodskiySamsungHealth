
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCreateTrainig } from '../../API/trainingAPI/TtrainingAPI';
import { DataForSetTrain } from '../../API/userAPI/TuserAPI';
import { userAPI } from '../../API/userAPI/userAPI';
import { setLoading } from '../common/commonSlice';
import { trainingAPI } from './../../API/trainingAPI/trainingAPI';
import { setErrorMsg, setUserHasTraining } from './trainingSlice';

export const getSmallDataAboutTrainings = createAsyncThunk(
    "training/getSmallDataAboutTrainings",
    async (_, thunkApi) => {
        try {
            thunkApi.dispatch(setErrorMsg(null))
            const response = await trainingAPI.getSmallDataAboutTrainings();
            thunkApi.dispatch(setLoading(false));
            return response.data
        } catch (error) {
             return thunkApi.rejectWithValue(error)
        }
    }
)

export const getUserTraining = createAsyncThunk(
    "training/getUserTraining",
    async (id: number, thunkApi) => {
        try {
            thunkApi.dispatch(setErrorMsg(null))
            const response = await trainingAPI.getUserTraining(id)
            thunkApi.dispatch(setLoading(false));
            return response.data
        } catch (error) {
            thunkApi.dispatch(setLoading(false)); // ---- пока нет сервера прийдется так тестить

             return thunkApi.rejectWithValue(error)
        }
    }
)

export const getArrDaysExpires = createAsyncThunk(
    "training/getArrDaysExpires",
    async (id: number, thunkApi) => {
        try {
            thunkApi.dispatch(setErrorMsg(null))
            const response = await trainingAPI.getDataDaysExpires(id);
            thunkApi.dispatch(setLoading(false))
            return response.data
        } catch (error) {
            //@ts-ignore
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

export const setUserTrain = createAsyncThunk(
    "training/setUserTrain",
    async (body: DataForSetTrain, thunkApi) => {
        try {
            thunkApi.dispatch(setErrorMsg(null))
            const response = await userAPI.setUserTrain(body.userId, body.trainId);
            thunkApi.dispatch(setLoading(false))
            thunkApi.dispatch(setUserHasTraining(false))
            return response.data
        } catch (error) {
             return thunkApi.rejectWithValue("Что то пошло не так ...")
        }
    }
)

export const createTraining = createAsyncThunk(
    "training/createTraining",
    async (training: TCreateTrainig, thunkApi) => {
        try {
            thunkApi.dispatch(setErrorMsg(null))
            const response = await trainingAPI.createTraining(training);
            return response.data
        } catch (error) {
             thunkApi.rejectWithValue(error)
        }
    }
)

export const deactivateTraining = createAsyncThunk(
    "training/deactivateTraining",
    async (trainingId: number, thunkApi) => {
        try {
            thunkApi.dispatch(setErrorMsg(null))
            const response = await trainingAPI.deactivateTraining(trainingId);
            return response.data
        } catch (error) {
             return thunkApi.rejectWithValue("Что то пошло не так ...")
        }
    }
)

export const updateDayUserTraining = createAsyncThunk(
    "training/updateDayUserTraining",
    async (userId: number, thunkApi) => {
        try {
            thunkApi.dispatch(setErrorMsg(null))
            const response = await userAPI.updateDayUserTraining(userId);
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)