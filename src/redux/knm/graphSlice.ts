import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../settings/api";

interface GraphState {
    graphInfoList: [];  // all detail info of graph store in this list
    currentOpenGraphInfo: {};
    loading: boolean;
    error: string | null;
}

const initialGraphState: GraphState = {
    graphInfoList: [],
    currentOpenGraphInfo: {},
    loading: false,
    error: null,
}

// action: according current open knm map to get the detail info of the force graph
export const getGraphDetail = createAsyncThunk(
    'graph/detail',
    async (params: { currentOpenMapId: string, jwt: string | null }, thunkAPI) => {
        try {
            const apiGetGraph = API.graph.replace(':mapId', params.currentOpenMapId);
            // console.log('api => ',apiGetGraph);
            const currentOpenGraphInfo = await axios.get(
                apiGetGraph,
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                },
            );
            // console.log("graph => ",currentOpenGraphInfo.data);
            return {
                currentOpenGraphInfo: currentOpenGraphInfo.data
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// action : update graph theme
export const updateGraphTheme = createAsyncThunk(
    'graph/update',
    async (params: {
        jwt: string | null, currentOpenMapId: string, currentGraphId: string, newGraphTheme: {}
    }, thunkAPI) => {
        try {
            const apiGetGraph = `${API.graph.replace(':mapId', params.currentOpenMapId)}/${params.currentGraphId}`;
            const newGraph = await axios.patch(
                apiGetGraph,
                {
                    themeColor: params.newGraphTheme['themeColor'], // 主题颜色
                    lineStyleType: params.newGraphTheme['lineStyleType'],   //关联线样式
                    lineStyleColor: params.newGraphTheme['lineStyleColor'],     // 关联线颜色
                    lineStyleWidth: params.newGraphTheme['lineStyleWidth'],     // 关联线宽度
                    lineStyleOpacity: params.newGraphTheme['lineStyleOpacity'],   // 关联线透明度
                    lineStyleCurveness: params.newGraphTheme['lineStyleCurveness'], // 关联线曲度
                    labelFontSize: params.newGraphTheme['labelFontSize'],         //节点标签字体大小
                    labelPosition: params.newGraphTheme['labelPosition'],
                    edgeLabelFontSize: params.newGraphTheme['edgeLabelFontSize'],
                    layout: params.newGraphTheme['layout'],
                    forcePower: params.newGraphTheme['forcePower'],
                },
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                },
            );
            // console.log(newGraph);
        } catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    }
);


// knm graph slice
export const GraphSlice = createSlice({
    name: 'graph',
    initialState: initialGraphState,
    reducers: {},
    extraReducers: {
        // get graph detail
        [getGraphDetail.pending.type]: (state) => {
            state.loading = true;
        },
        [getGraphDetail.fulfilled.type]: (state, action) => {
            state.currentOpenGraphInfo = action.payload.currentOpenGraphInfo;
            state.loading = false;
            state.error = null;
        },
        [getGraphDetail.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // graph update
        [updateGraphTheme.pending.type]: (state) => {
            state.loading = true;
        },
        [updateGraphTheme.fulfilled.type]: (state, action) => {
            // state.currentOpenGraphInfo = action.payload.currentOpenGraphInfo;
            state.loading = false;
            state.error = null;
        },
        [updateGraphTheme.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});