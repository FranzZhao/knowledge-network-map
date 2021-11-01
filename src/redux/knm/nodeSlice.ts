import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../settings/api";

interface NodeState {
    loading: boolean;
    error: string | null;
};

const initialNodeState: NodeState = {
    loading: false,
    error: null,
};

// action: update node info
export const updateNodeInfo = createAsyncThunk(
    'node/update',
    async (params: { jwt: string | null, nodeInfo: {}, graphId: string, nodeId: string }, ThunkAPI) => {
        try {
            const apiNodeUpdate = `${API.node.replace(':graphId', params.graphId)}/${params.nodeId}`;
            const newNodeInfo = await axios.patch(
                apiNodeUpdate,
                {
                    name: params.nodeInfo['nodeName'],
                    tags: params.nodeInfo['nodeTags'],
                    introduction: params.nodeInfo['nodeIntro'],
                    size: params.nodeInfo['nodeSize'],
                    color: params.nodeInfo['nodeColor'],
                },
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                },
            );
            console.log(newNodeInfo);
        } catch (error) {
            return ThunkAPI.rejectWithValue(error);
        }
    }
);


// slice
export const NodeSlice = createSlice({
    name: 'node',
    initialState: initialNodeState,
    reducers: {},
    extraReducers: {
        [updateNodeInfo.pending.type]: (state) => {
            state.loading = true;
        },
        [updateNodeInfo.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        [updateNodeInfo.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});