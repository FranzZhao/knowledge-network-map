import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../settings/api";

interface LinkState {
    loading: boolean;
    error: string | null;
};

const initialLinkState: LinkState = {
    loading: false,
    error: null,
};

// action: update node info
export const updateLinkInfo = createAsyncThunk(
    'link/update',
    async (params: { jwt: string | null, linkInfo: {}, graphId: string, linkId: string }, ThunkAPI) => {
        try {
            const apiLinkUpdate = `${API.link.replace(':graphId', params.graphId)}/${params.linkId}`;
            const newLinkInfo = await axios.patch(
                apiLinkUpdate,
                {
                    name: params.linkInfo['linkName'],
                    tags: params.linkInfo['linkTags'],
                    introduction: params.linkInfo['linkIntro'],
                    source: params.linkInfo['linkStart'],
                    target: params.linkInfo['linkEnd'],
                },
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                },
            );
            console.log(newLinkInfo);
        } catch (error) {
            return ThunkAPI.rejectWithValue(error);
        }
    }
);

// action: create a new node
export const createLink = createAsyncThunk(
    'link/create',
    async (params: { jwt: string | null, linkInfo: {}, graphId: string }, ThunkAPI) => {
        try {
            const apiLinkCreate = API.link.replace(':graphId', params.graphId);
            const newNode = await axios.post(
                apiLinkCreate,
                {
                    name: params.linkInfo['linkName'],
                    tags: params.linkInfo['linkTags'],
                    introduction: params.linkInfo['linkIntro'],
                    source: params.linkInfo['linkStart'],
                    target: params.linkInfo['linkEnd'],
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


// slice
export const LinkSlice = createSlice({
    name: 'link',
    initialState: initialLinkState,
    reducers: {},
    extraReducers: {
        // create node
        [createLink.pending.type]: (state) => {
            state.loading = true;
        },
        [createLink.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        [createLink.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // update node
        [updateLinkInfo.pending.type]: (state) => {
            state.loading = true;
        },
        [updateLinkInfo.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        [updateLinkInfo.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});