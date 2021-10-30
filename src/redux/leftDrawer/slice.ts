import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface LeftDrawerState {
    drawerOpen: boolean;
};

const initialState: LeftDrawerState = {
    drawerOpen: true
}

// action: left Drawer State Change
export const leftDrawerStateChange = createAsyncThunk(
    'leftDrawer/leftDrawerStateChange',
    (newDrawerState: boolean)=>{
        return {
            drawerOpen: newDrawerState
        };
    }
);

// slice
export const LeftDrawerSlice = createSlice({
    name: 'leftDrawer',
    initialState,
    reducers:{},
    extraReducers:{
        [leftDrawerStateChange.fulfilled.type]: (state, action) => {
            state.drawerOpen = action.payload.drawerOpen;
        },
    }
});