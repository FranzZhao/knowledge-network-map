import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import i18n from 'i18next';

interface LanguageState {
    language: 'en' | 'zh';
};

const initialState: LanguageState = {
    language: 'zh'
};

// action: change language
export const changeLanguage = createAsyncThunk(
    'language/changeLanguage',
    (currentLanguage: 'en' | 'zh')=>{
        let newLanguage = currentLanguage === 'en' ? 'zh' : 'en';
        i18n.changeLanguage(newLanguage);
        return ({
            language: newLanguage
        });
    }
);

// slice
export const LanguageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {},
    extraReducers: {
        [changeLanguage.fulfilled.type]: (state, action) => {
            state.language = action.payload.language;
        }
    }
});