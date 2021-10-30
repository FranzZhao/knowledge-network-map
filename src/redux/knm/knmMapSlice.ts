/**
 * ! deal with the main info of KNM
 * 
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// api
import { API } from '../../settings/api';

interface KnmMapState {
    loading: boolean;
    error: string | null;
    info: [];
    currentOpaMapInfo: {};
};

const initialKnmMapState: KnmMapState = {
    loading: false,
    error: null,
    info: [],
    currentOpaMapInfo: {},
};

// action: get all knm map lists -> user own
export const knmList = createAsyncThunk(
    'knmMap/list',
    async (params: { jwt: string | null }, ThunkAPI) => {
        try {
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
    async (params: {
        currentKnmMaps: [], jwt: string | null, title: string, tags: string[], introduction: string, emoji: string
    }, ThunkAPI) => {
        try {
            const newKnm = await axios.post(
                API.map,
                {
                    "title": params.title,
                    "tags": params.tags,
                    "introduction": params.introduction,
                    "emoji": params.emoji,
                },
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                }
            );
            const newKnmMapsInfo = [
                ...params.currentKnmMaps,
                newKnm.data
            ];
            // console.log(newKnmMapsInfo);
            return newKnmMapsInfo;
        } catch (error) {
            return ThunkAPI.rejectWithValue(error);
        }
    }
);

// action: get a detail knm map, with full info
export const knmDetail = createAsyncThunk(
    'knmMap/detail',
    async (params: { knmId: string, jwt: string | null }, ThunkAPI) => {
        try {
            const detailKnm = await axios.get(
                `${API.map}/${params.knmId}`,
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                }
            );
            // console.log(detailKnm.data);
            return detailKnm.data;
        } catch (error) {
            return ThunkAPI.rejectWithValue(error);
        }
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
        // get all knm map lists
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
        },
        // create a new knm map
        [knmCreate.pending.type]: (state) => {
            state.loading = true;
        },
        [knmCreate.fulfilled.type]: (state, action) => {
            state.info = action.payload;
            state.loading = false;
            state.error = null;
        },
        [knmCreate.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get a knm map with detail info
        [knmDetail.pending.type]: (state) => {
            state.loading = true;
        },
        [knmDetail.fulfilled.type]: (state, action) => {
            state.currentOpaMapInfo = action.payload;
            state.loading = false;
            state.error = null;
        },
        [knmDetail.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});