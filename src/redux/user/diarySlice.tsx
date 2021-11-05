import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from '../../settings/api';

interface DiaryState {
    userDiariesList: [];
    currentOpenDiary: {} | null;
    loading: boolean;
    saveDiaryLoading: boolean;
    deleteDiaryLoading: boolean;
    error: string | null;
}

const initialDiaryState: DiaryState = {
    userDiariesList: [],
    currentOpenDiary: null,
    loading: false,
    saveDiaryLoading: false,
    deleteDiaryLoading: false,
    error: null,
};

// action: get user diary list
export const getUserDiariesList = createAsyncThunk(
    'diary/getDiariesList',
    async (params: { jwt: string | null }, thunkAPI) => {
        try {
            const DiariesList = await axios.get(
                API.user.diary,
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                },
            );
            return {
                userDiariesList: DiariesList.data
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// action: get specific diary
export const getDiaryDetail = createAsyncThunk(
    'diary/getDiaryDetail',
    async (params: { jwt: string | null, diaryId: string }, thunkAPI) => {
        try {
            const currentOpenDiary = await axios.get(
                `${API.user.diary}/${params.diaryId}`,
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`,
                    }
                }
            );
            // console.log(currentOpenDiary.data);
            return {
                currentOpenDiary: currentOpenDiary.data
            };

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// action: create a new diary
export const createNewDiary = createAsyncThunk(
    'diary/create',
    async (params: { jwt: string | null, diaryInfo: any }, thunkAPI) => {
        try {
            const newDiary = await axios.post(
                API.user.diary,
                {
                    title: params.diaryInfo['title'],
                    tags: params.diaryInfo['tags'],
                    text: params.diaryInfo['text'],
                },
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`,
                    }
                }
            );
            // console.log(newDiary.data);
            return {
                currentOpenDiary: newDiary.data
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// action: update a specific diary
export const updateSpecificDiary = createAsyncThunk(
    'diary/update',
    async (params: {
        jwt: string | null, diaryId: string, diaryInfo: any
    }, thunkAPI) => {
        try {
            const newDiary = await axios.patch(
                `${API.user.diary}/${params.diaryId}`,
                {
                    title: params.diaryInfo['title'],
                    tags: params.diaryInfo['tags'],
                    text: params.diaryInfo['text'],
                },
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`,
                    }
                }
            );
            // console.log(newDiary.data);
            return {
                currentOpenDiary: newDiary.data
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// action: delete diary
export const deleteDiary = createAsyncThunk(
    'diary/delete',
    async (params: {
        jwt: string | null, diaryId: string,
    }, thunkAPI) => {
        try {
            await axios.delete(
                `${API.user.diary}/${params.diaryId}`,
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`,
                    }
                }
            );
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const DiarySlice = createSlice({
    name: 'diary',
    initialState: initialDiaryState,
    reducers: {
        clearCurrentOpenDiary: (state) => {
            state.currentOpenDiary = null;
        }
    },
    extraReducers: {
        // get user diaries list
        [getUserDiariesList.pending.type]: (state) => {
            state.loading = true;
        },
        [getUserDiariesList.fulfilled.type]: (state, action) => {
            state.userDiariesList = action.payload.userDiariesList;
            state.loading = false;
            state.error = null;
        },
        [getUserDiariesList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get specific diaries list
        [getDiaryDetail.pending.type]: (state) => {
            state.loading = true;
        },
        [getDiaryDetail.fulfilled.type]: (state, action) => {
            state.currentOpenDiary = action.payload.currentOpenDiary;
            state.loading = false;
            state.error = null;
        },
        [getDiaryDetail.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // create a new diary
        [createNewDiary.pending.type]: (state) => {
            state.saveDiaryLoading = true;
        },
        [createNewDiary.fulfilled.type]: (state, action) => {
            state.currentOpenDiary = action.payload.currentOpenDiary;
            state.saveDiaryLoading = false;
            state.error = null;
        },
        [createNewDiary.rejected.type]: (state, action) => {
            state.saveDiaryLoading = false;
            state.error = action.payload;
        },
        // update diary
        [updateSpecificDiary.pending.type]: (state) => {
            state.saveDiaryLoading = true;
        },
        [updateSpecificDiary.fulfilled.type]: (state, action) => {
            state.currentOpenDiary = action.payload.currentOpenDiary;
            state.saveDiaryLoading = false;
            state.error = null;
        },
        [updateSpecificDiary.rejected.type]: (state, action) => {
            state.saveDiaryLoading = false;
            state.error = action.payload;
        },
        // delete diary
        [deleteDiary.pending.type]: (state) => {
            state.deleteDiaryLoading = true;
        },
        [deleteDiary.fulfilled.type]: (state, action) => {
            state.currentOpenDiary = null;
            state.deleteDiaryLoading = false;
            state.error = null;
        },
        [deleteDiary.rejected.type]: (state, action) => {
            state.deleteDiaryLoading = false;
            state.error = action.payload;
        },
    },
});