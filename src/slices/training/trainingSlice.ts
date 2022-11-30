import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ItrainigData, IsmallDataAboutTrainings, TrainingDataArr } from './../../API/trainingAPI/TtrainingAPI';
import { CONST, ItrainitState } from './Types';
import { getSmallDataAboutTrainings, getUserTraining } from './thunk';
import { useAppSelector } from '../../app/hooks';


const initialState: ItrainitState = {
    smallDataTrainings : [],
    smallUserTraining : null,
    today : CONST.NO_DATA
};

const trainingSlice = createSlice({
    name: 'training',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setSmallData: (state, action: PayloadAction<TrainingDataArr>) => {
            state.smallDataTrainings = action.payload;
        },

    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {                                                        //для санок!!!!
        builder
            .addCase(getSmallDataAboutTrainings.fulfilled.type, (state, action: PayloadAction<IsmallDataAboutTrainings>) => {
                state.smallDataTrainings = action.payload.trainingArr
            })
            .addCase(getUserTraining.fulfilled.type, (state, action: PayloadAction<ItrainigData>) => {
                //state.smallUserTraining = action.payload
                state.smallUserTraining = {id : 1, name : "Набор массы", countDays : 9}
                state.today = Math.round(2 / 9 * 100)
            })
    },
});

export const { setSmallData } = trainingSlice.actions;

export const selectSmallUserTraining = (state : RootState) => state.training.smallUserTraining


export default trainingSlice.reducer;
