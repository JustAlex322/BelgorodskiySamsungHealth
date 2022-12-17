
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IsmallDataAboutDietsArr } from '../../API/dietsAPI/TdietsAPI';
import { IdietsState } from './Types';
import { getSmallDataAboutDiets, getSmallDataUserTraing } from './thunk';
import { IsmallDataAboutDiets } from './../../API/dietsAPI/TdietsAPI';

const initialState : IdietsState = {
    smallDataAboutDiets : [],
    smallDataAboutUserDiet : null,
    userHasDiet : false
}

const dietsSlice = createSlice({
    name : "diets",
    initialState,
    reducers: {
        setUserHasDiet : (state, action : PayloadAction<boolean>) => {
            state.userHasDiet = action.payload
        }
    },

    extraReducers: builder => {
        builder
            .addCase(getSmallDataAboutDiets.fulfilled.type, (state, action: PayloadAction<IsmallDataAboutDietsArr>) => {
                state.smallDataAboutDiets = action.payload
            })
            .addCase(getSmallDataUserTraing.fulfilled.type, (state, action: PayloadAction<IsmallDataAboutDiets>) => {
                state.smallDataAboutUserDiet = action.payload
            })
            
    }
})

export const {setUserHasDiet} = dietsSlice.actions

export default dietsSlice.reducer