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
    knmList: [];
    currentOpenMapInfo: {};
};

const initialKnmMapState: KnmMapState = {
    loading: false,
    error: null,
    knmList: [],
    currentOpenMapInfo: {},
};

// action: get all knm map lists -> user own
/**
 * ! 可使用getKnmList的地方: 对MongoDB中的map表进行修改时才能够调用此方法, 有以下几个情况
 * 1. create - create knm => drawer上点击"新建知识地图"之后, 更新redux中的knmList
 * 2. update - 在KNMDetailPage的Graph Info面板中更新信息后, 更新redux中的knmList
 * 3. initial - 在初始化项目的时候, 即刚刚进入项目的时候, 使用getKnmList获取 => index.tsx中
 * ! 其余场景, 均从redux中获取
 */
export const getKnmList = createAsyncThunk(
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
export const getKnmDetail = createAsyncThunk(
    'knmMap/detail',
    async (params: { knmId: string, jwt: string | null, currentKnmList: [] }, ThunkAPI) => {
        try {
            const detailKnm = params.currentKnmList.find(knm => knm['_id']===params.knmId);
            return detailKnm; 
            // const detailKnm = await axios.get(
            //     `${API.map}/${params.knmId}`,
            //     {
            //         headers: {
            //             Authorization: `bearer ${params.jwt}`
            //         }
            //     }
            // );
            // return detailKnm.data;
        } catch (error) {
            return ThunkAPI.rejectWithValue(error);
        }
    }
);

// action: update a knm map
export const knmUpdate = createAsyncThunk(
    'knmMap/update',
    async (params: {
        knmId: string,
        jwt: string | null,
        updateKnmInfo: any,
        knmList: [],
        currentOpenMapInfo: {},
    }, ThunkAPI) => {
        try {
            // update current open map info
            const newKnmInfo = await axios.patch(
                `${API.map}/${params.knmId}`,
                {
                    title: params.updateKnmInfo.title,
                    tags: params.updateKnmInfo.tags,
                    introduction: params.updateKnmInfo.introduction,
                    emoji: params.updateKnmInfo.emoji,
                    state: params.updateKnmInfo.state,
                },
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                }
            );
            // update system nav & current open map
            let newKnmList: any[] = [];
            let newCurrentOpenMap = params.currentOpenMapInfo;
            params.knmList.map((knm: {}, index) => {
                if (knm['_id'] === params.knmId) {
                    // update current open map
                    newCurrentOpenMap = {
                        ...newCurrentOpenMap,
                        title: params.updateKnmInfo.title,
                        tags: params.updateKnmInfo.tags,
                        introduction: params.updateKnmInfo.introduction,
                        emoji: params.updateKnmInfo.emoji,
                        state: params.updateKnmInfo.state,
                    }
                    // update knm
                    newKnmList.push(newCurrentOpenMap);
                } else {
                    newKnmList.push(knm);
                }
            });
            // console.log('knm list => ', newKnmList);
            // console.log('current open knm => ', newCurrentOpenMap);
            return ({
                knmList: newKnmList,
                currentOpenMapInfo: newCurrentOpenMap,
            });
        } catch (error) {
            return ThunkAPI.rejectWithValue(error);
        }
    }
);

// knm Map slice
export const KnmMapSlice = createSlice({
    name: 'knmMap',
    initialState: initialKnmMapState,
    reducers: {},
    extraReducers: {
        // get all knm map lists
        [getKnmList.pending.type]: (state) => {
            state.loading = true;
        },
        [getKnmList.fulfilled.type]: (state, action) => {
            state.knmList = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getKnmList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // create a new knm map
        [knmCreate.pending.type]: (state) => {
            state.loading = true;
        },
        [knmCreate.fulfilled.type]: (state, action) => {
            state.knmList = action.payload;
            state.loading = false;
            state.error = null;
        },
        [knmCreate.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get a knm map with detail info
        [getKnmDetail.pending.type]: (state) => {
            state.loading = true;
        },
        [getKnmDetail.fulfilled.type]: (state, action) => {
            state.currentOpenMapInfo = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getKnmDetail.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // update a knm map with detail info
        [knmUpdate.pending.type]: (state) => {
            state.loading = true;
        },
        [knmUpdate.fulfilled.type]: (state, action) => {
            state.knmList = action.payload.knmList;
            state.currentOpenMapInfo = action.payload.currentOpenMapInfo;
            state.loading = false;
            state.error = null;
        },
        [knmUpdate.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});