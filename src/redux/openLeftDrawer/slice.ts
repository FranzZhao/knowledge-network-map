import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface OpenLeftDrawerState {
    drawerOpen: boolean;
};

const initialState: OpenLeftDrawerState = {
    drawerOpen: true
}

// action: left Drawer State Change
export const leftDrawerStateChange = createAsyncThunk(
    'openLeftDrawer/leftDrawerStateChange',
    (newDrawerState: boolean)=>{
        return {
            drawerOpen: newDrawerState
        };
    }
);

// slice
export const OpenLeftDrawerSlice = createSlice({
    name: 'openLeftDrawer',
    initialState,
    reducers:{},
    extraReducers:{
        [leftDrawerStateChange.fulfilled.type]: (state, action) => {
            state.drawerOpen = action.payload.drawerOpen;
        },
    }
});