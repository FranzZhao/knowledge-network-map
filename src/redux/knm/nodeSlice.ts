import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../settings/api";

interface NodeState {
    loading: boolean;
    error: string | null;
    currentNodesList: [];
};

const initialNodeState: NodeState = {
    loading: false,
    error: null,
    currentNodesList: [],
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
            // console.log(newNodeInfo);
        } catch (error) {
            return ThunkAPI.rejectWithValue(error);
        }
    }
);

// action: create a new node
export const createNode = createAsyncThunk(
    'node/create',
    async (params: { jwt: string | null, nodeInfo: {}, graphId: string }, ThunkAPI) => {
        try {
            const apiNodeCreate = API.node.replace(':graphId', params.graphId);
            const newNode = await axios.post(
                apiNodeCreate,
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
            // console.log("new node => ",newNode);
        } catch (error) {
            return ThunkAPI.rejectWithValue(error);
        }
    }
);

// action: get all node from specific map
export const findAllMapNodes = createAsyncThunk(
    'node/findAll',
    async (params: {
        jwt: string | null, graphId: string
    }, ThunkAPI) => {
        try {
            const apiFindNodes = API.node.replace(':graphId', params.graphId);
            const mapNodes = await axios.get(
                apiFindNodes,
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                },
            );
            // console.log(mapNodes);
            return {
                currentNodesList: mapNodes.data
            };
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
        // create node
        [createNode.pending.type]: (state) => {
            state.loading = true;
        },
        [createNode.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        [createNode.rejected.type]: (state, action) => {
            state.currentNodesList = [];
            state.loading = false;
            state.error = action.payload;
        },
        // update node
        [updateNodeInfo.pending.type]: (state) => {
            state.loading = true;
        },
        [updateNodeInfo.fulfilled.type]: (state, action) => {
            state.currentNodesList = [];
            state.loading = false;
            state.error = null;
        },
        [updateNodeInfo.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // find all node
        [findAllMapNodes.pending.type]: (state) => {
            state.loading = true;
        },
        [findAllMapNodes.fulfilled.type]: (state, action) => {
            state.currentNodesList = action.payload.currentNodesList;
            state.loading = false;
            state.error = null;
        },
        [findAllMapNodes.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});