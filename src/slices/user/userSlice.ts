
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IuserIS } from './Types';
import { getUserData, setUserData} from './thunk';

const initialState: IuserIS = {
    name : "",
    weight : 0,
    height : 0,
    countOfCompletedTrainers : 0,
    userChangedata : false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // setLoading: (state, action: PayloadAction<boolean>) => {
        //     state.isLoading = action.payload;
        // },

    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(getUserData.fulfilled.type , (state, action: PayloadAction<IuserIS>) => {
                state.name = action.payload.name
                state.weight = action.payload.weight
                state.height = action.payload.height
                state.countOfCompletedTrainers = action.payload.countOfCompletedTrainers
            })
            .addCase(setUserData.fulfilled.type , (state, action: PayloadAction<IuserIS>) => {
                state.userChangedata = true
            })
    },
    
});

//export const { setLoading } = userSlice.actions;

export default userSlice.reducer;
