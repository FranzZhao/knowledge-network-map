/**
 * ! deal with the main info of KNM
 * 
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// api
import {API} from '../../settings/api';

interface KnmMapState {
    loading: boolean;
    error: string | null;
    info: [];
};

const initialKnmMapState: KnmMapState = {
    loading: false,
    error: null,
    info: [],
};

// action: get all knm map lists -> user own
export const knmList = createAsyncThunk(
    'knmMap/list',
    async (params: {jwt: string | null}, ThunkAPI) => {
        try{
            const knmMapsList = await axios.get(
                API.map,
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                },
            );
            return knmMapsList.data;
        } catch (error) {
            console.log(ThunkAPI.rejectWithValue(error));
            return ThunkAPI.rejectWithValue(error);
        }
    }
);

// action: create a new knm map
export const knmCreate = createAsyncThunk(
    'knmMap/create',
    async () => {

    }
);

// action: get a detail knm map, with full info
export const knmDetail = createAsyncThunk(
    'knmMap/detail',
    async () => {

    }
);

// action: update a knm map
export const knmUpdate = createAsyncThunk(
    'knmMap/update',
    async () => {

    }
);

// knm Map slice
export const KnmMapSlice = createSlice({
    name: 'knmMap',
    initialState: initialKnmMapState,
    reducers: {},
    extraReducers: {
        [knmList.pending.type]: (state) => {
            state.loading = true;
        },
        [knmList.fulfilled.type]: (state, action) => {
            state.info = action.payload;
            state.loading = false;
            state.error = null;
        },
        [knmList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});