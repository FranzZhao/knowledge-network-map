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
    async (params: { currentOpenMapId: string, jwt: string | null }, ThunkAPI) => {
        try {
            const apiGetGraph = API.graph.replace(':mapId',params.currentOpenMapId);
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
            return ThunkAPI.rejectWithValue(error);
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
    },
});