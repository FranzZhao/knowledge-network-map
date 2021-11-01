import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { API } from '../../settings/api';

interface NotebookState {
    loading: boolean;
    error: null | string;
    currentNotebooksList: [];
    currentNotebookDetail: {};
}

const initialNotebookState: NotebookState = {
    loading: false,
    error: null,
    currentNotebooksList: [],
    currentNotebookDetail: {},
}

// action: 获取知识节点下的所有知识笔记
export const getNodeNotebooks = createAsyncThunk(
    'notebook/getNodeNotebooks',
    async (params: {
        jwt: string | null, graphId: string, nodeId: string
    }, ThunkAPI) => {
        let apiNodeNotebooks = API.notebook.node;
        apiNodeNotebooks = apiNodeNotebooks.replace(':graphId',params.graphId);
        apiNodeNotebooks = apiNodeNotebooks.replace(':nodeId',params.nodeId);

        const nodeNotebooks = await axios.get(
            apiNodeNotebooks,
            {
                headers: {
                    Authorization: `bearer ${params.jwt}`
                }
            },
        );
        // console.log(nodeNotebooks.data);
        return {
            currentNotebooksList: nodeNotebooks.data
        }
    }
);

// action: 获取知识关联下的所有知识笔记
export const getLinkNotebooks = createAsyncThunk(
    'notebook/getLinkNotebooks',
    async (params: {
        jwt: string | null, graphId: string, linkId: string
    }, ThunkAPI) => {
        let apiLinkNotebooks = API.notebook.link;
        apiLinkNotebooks = apiLinkNotebooks.replace(':graphId',params.graphId);
        apiLinkNotebooks = apiLinkNotebooks.replace(':linkId',params.linkId);

        const linkNotebooks = await axios.get(
            apiLinkNotebooks,
            {
                headers: {
                    Authorization: `bearer ${params.jwt}`
                }
            },
        );
        // console.log(linkNotebooks.data);
        return {
            currentNotebooksList: linkNotebooks.data
        }
    }
);

// action: 获取知识地图下的所有知识笔记
export const getMapNotebooks = createAsyncThunk(
    'notebook/getMapNotebooks',
    async (params: {
        jwt: string | null, graphId: string
    }, ThunkAPI) => {
        let apiMapNotebooks = API.notebook.all;
        apiMapNotebooks = apiMapNotebooks.replace(':graphId',params.graphId);
        const allNotebooks = await axios.get(
            apiMapNotebooks,
            {
                headers: {
                    Authorization: `bearer ${params.jwt}`
                }
            },
        );
        console.log(allNotebooks.data);
        return {
            currentNotebooksList: allNotebooks.data
        }
    }
);

// slice
export const NotebookSlice = createSlice({
    name: 'notebook',
    initialState: initialNotebookState,
    reducers: {},
    extraReducers: {
        // 获取知识地图下的所有知识笔记
        [getMapNotebooks.pending.type]: (state) => {
            state.loading = true;
        },
        [getMapNotebooks.fulfilled.type]: (state, action) => {
            state.currentNotebooksList = action.payload.currentNotebooksList;
            state.currentNotebookDetail = {};
            state.loading = false;
            state.error = null;
        },
        [getMapNotebooks.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // 获取知识节点下的所有知识笔记
        [getNodeNotebooks.pending.type]: (state) => {
            state.loading = true;
        },
        [getNodeNotebooks.fulfilled.type]: (state, action) => {
            state.currentNotebooksList = action.payload.currentNotebooksList;
            state.currentNotebookDetail = {};
            state.loading = false;
            state.error = null;
        },
        [getNodeNotebooks.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // 获取知识关联下的所有知识笔记
        [getLinkNotebooks.pending.type]: (state) => {
            state.loading = true;
        },
        [getLinkNotebooks.fulfilled.type]: (state, action) => {
            state.currentNotebooksList = action.payload.currentNotebooksList;
            state.currentNotebookDetail = {};
            state.loading = false;
            state.error = null;
        },
        [getLinkNotebooks.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});