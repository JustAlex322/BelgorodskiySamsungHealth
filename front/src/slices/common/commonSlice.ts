
import { ICommonIS } from './Types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: ICommonIS = {
    isLoading : false
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {},
});

export const { setLoading } = commonSlice.actions;

export default commonSlice.reducer;
