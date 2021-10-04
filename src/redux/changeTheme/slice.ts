import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface ChangeThemeState {
    currentTheme: 'light' | 'dark';
    loading: boolean;
    error: string | null;
}

const initialState: ChangeThemeState = {
    currentTheme: 'dark',
    loading: false,
    error: null,
}

// action: change system theme to light or dark
export const changeCurrentTheme = createAsyncThunk(
    'changeTheme/changeCurrentTheme',
    (newTheme: 'light' | 'dark')=>{
        return newTheme;
    }
);

// slice
export const ChangeThemeSlice = createSlice({
    name: 'changeTheme',
    initialState,
    reducers: {},
    extraReducers: {
        // action发送
        [changeCurrentTheme.pending.type]: (state) => {
            state.loading = true;
        },
        // action发送成功
        [changeCurrentTheme.fulfilled.type]: (state, action) => {
            state.currentTheme = action.payload;
            state.loading = false;
            state.error = null;
        },
        // action发送失败
        [changeCurrentTheme.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});