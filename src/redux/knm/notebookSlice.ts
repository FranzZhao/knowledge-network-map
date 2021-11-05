import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { API } from '../../settings/api';

interface NotebookState {
    loading: boolean;
    error: null | string;
    currentNotebooksList: [];
    currentNotebookDetail: {};
    createSpecificNotebookRelationType: 'node' | 'link';
    createSpecificNotebookRelationId: string | null;
}

const initialNotebookState: NotebookState = {
    loading: false,
    error: null,
    currentNotebooksList: [],
    currentNotebookDetail: {},
    createSpecificNotebookRelationType: 'node',
    createSpecificNotebookRelationId: null,
}

// action: 获取知识节点下的所有知识笔记
export const getNodeNotebooks = createAsyncThunk(
    'notebook/getNodeNotebooks',
    async (params: {
        jwt: string | null, graphId: string, nodeId: string
    }, thunkAPI) => {
        let apiNodeNotebooks = API.notebook.node;
        apiNodeNotebooks = apiNodeNotebooks.replace(':graphId', params.graphId);
        apiNodeNotebooks = apiNodeNotebooks.replace(':nodeId', params.nodeId);

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
    }, thunkAPI) => {
        let apiLinkNotebooks = API.notebook.link;
        apiLinkNotebooks = apiLinkNotebooks.replace(':graphId', params.graphId);
        apiLinkNotebooks = apiLinkNotebooks.replace(':linkId', params.linkId);

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
    }, thunkAPI) => {
        let apiMapNotebooks = API.notebook.all;
        apiMapNotebooks = apiMapNotebooks.replace(':graphId', params.graphId);
        const allNotebooks = await axios.get(
            apiMapNotebooks,
            {
                headers: {
                    Authorization: `bearer ${params.jwt}`
                }
            },
        );
        // console.log(allNotebooks.data);
        return {
            currentNotebooksList: allNotebooks.data
        }
    }
);

// 获取特定知识笔记的详细内容
export const getNotebookDetail = createAsyncThunk(
    'notebook/getNotebookDetail',
    async (params:{
        jwt: string | null, graphId: string, target: string, targetId: string, notebookId: string
    }, thunkAPI) => {
        try {
            // 1. api format
            let apiCreateNotebook = API.notebook.normal;
            apiCreateNotebook = apiCreateNotebook.replace(':graphId', params.graphId);
            apiCreateNotebook = apiCreateNotebook.replace(':target', params.target);
            apiCreateNotebook = apiCreateNotebook.replace(':targetId', params.targetId);
            apiCreateNotebook = `${apiCreateNotebook}/${params.notebookId}`;
            // 2. get notebook detail
            const notebookDetail = await axios.get(
                apiCreateNotebook,
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                },
            );
            return {
                currentNotebookDetail: notebookDetail.data
            };
        } catch (error) { 
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// action: create notebook
export const createMapNotebook = createAsyncThunk(
    'notebook/create',
    async (params: {
        jwt: string | null, graphId: string, target: 'node' | 'link', targetId: string,
        notebookValues: any,
    }, thunkAPI) => {
        try {
            // 1. api format
            let apiCreateNotebook = API.notebook.normal;
            apiCreateNotebook = apiCreateNotebook.replace(':graphId', params.graphId);
            apiCreateNotebook = apiCreateNotebook.replace(':target', params.target);
            apiCreateNotebook = apiCreateNotebook.replace(':targetId', params.targetId);
            // 2. post request to create notebook
            const newNotebook = await axios.post(
                apiCreateNotebook,
                {
                    title: params.notebookValues.title,
                    tags: params.notebookValues.tags,
                    quotes: params.notebookValues.quote,
                    introduction: params.notebookValues.intro,
                    addPropertyName: params.notebookValues.selfDefineTitle,
                    addPropertyContent: params.notebookValues.selfDefineContain,
                    text: params.notebookValues.text,
                },
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                },
            );
            // 3. return result
            return {
                currentNotebookDetail: newNotebook.data
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


// update exist notebook detail
export const updateNotebookDetail = createAsyncThunk(
    'notebook/updateNotebook',
    async (params:{
        jwt: string | null, graphId: string, target: string, targetId: string, notebookId: string,
        notebookValues: any,
    }, thunkAPI) => {
        try {
            // 1. api format
            let apiCreateNotebook = API.notebook.normal;
            apiCreateNotebook = apiCreateNotebook.replace(':graphId', params.graphId);
            apiCreateNotebook = apiCreateNotebook.replace(':target', params.target);
            apiCreateNotebook = apiCreateNotebook.replace(':targetId', params.targetId);
            apiCreateNotebook = `${apiCreateNotebook}/${params.notebookId}`;
            // 2. get notebook detail
            const notebookDetail = await axios.patch(
                apiCreateNotebook,
                {
                    title: params.notebookValues.title,
                    tags: params.notebookValues.tags,
                    quotes: params.notebookValues.quote,
                    introduction: params.notebookValues.intro,
                    addPropertyName: params.notebookValues.selfDefineTitle,
                    addPropertyContent: params.notebookValues.selfDefineContain,
                    text: params.notebookValues.text,
                },
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                },
            );
            return {
                currentNotebookDetail: notebookDetail.data
            };
        } catch (error) { 
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// action: delete notebook
export const deleteNotebook = createAsyncThunk(
    'notebook/delete',
    async (params: {
        jwt: string | null, graphId: string, target: string, targetId: string, notebookId: string,
    }, thunkAPI) => {
        try {
            // 1. api format
            let apiCreateNotebook = API.notebook.normal;
            apiCreateNotebook = apiCreateNotebook.replace(':graphId', params.graphId);
            apiCreateNotebook = apiCreateNotebook.replace(':target', params.target);
            apiCreateNotebook = apiCreateNotebook.replace(':targetId', params.targetId);
            apiCreateNotebook = `${apiCreateNotebook}/${params.notebookId}`;
            // 2. delete notebook
            await axios.delete(
                apiCreateNotebook,
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                },
            );
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// slice
export const NotebookSlice = createSlice({
    name: 'notebook',
    initialState: initialNotebookState,
    reducers: {
        // 清空currentNotebookDetail -> want to create a new notebook
        clearDetail: (state) => {
            state.currentNotebookDetail = {};
        },
        createSpecificNotebook: (state, action) => {
            state.createSpecificNotebookRelationType = action.payload.createSpecificNotebookRelationType;
            state.createSpecificNotebookRelationId = action.payload.createSpecificNotebookRelationId;
        },
    },
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
        // 获取特定知识笔记
        [getNotebookDetail.pending.type]: (state) => {
            state.loading = true;
        },
        [getNotebookDetail.fulfilled.type]: (state, action) => {
            state.currentNotebookDetail = action.payload.currentNotebookDetail;
            state.loading = false;
            state.error = null;
        },
        [getNotebookDetail.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // 新建知识笔记
        [createMapNotebook.pending.type]: (state) => {
            state.loading = true;
        },
        [createMapNotebook.fulfilled.type]: (state, action) => {
            state.currentNotebookDetail = action.payload.currentNotebookDetail;
            state.loading = false;
            state.error = null;
        },
        [createMapNotebook.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // 更新特定知识笔记
        [updateNotebookDetail.pending.type]: (state) => {
            state.loading = true;
        },
        [updateNotebookDetail.fulfilled.type]: (state, action) => {
            state.currentNotebookDetail = action.payload.currentNotebookDetail;
            state.loading = false;
            state.error = null;
        },
        [updateNotebookDetail.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete notebook
        [deleteNotebook.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteNotebook.fulfilled.type]: (state) => {
            state.currentNotebookDetail = {};
            state.loading = false;
            state.error = null;
        },
        [deleteNotebook.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});