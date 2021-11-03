import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// axios
import axios from 'axios';
// api
import { API } from '../../settings/api';
// const fs = require('fs');

// User State
interface UserState {
    userAvatar: any;
    userStatics: any;
    loading: boolean;
    error: string | null;
    token: string | null;
};

const initialUserState: UserState = {
    userAvatar: null,
    userStatics: null,
    loading: false,
    error: null,
    token: null
};

// action: login
export const userLogin = createAsyncThunk(
    'user/Login',
    async (params: {
        email: string, password: string, rememberMe: boolean
    }, thunkAPI) => {
        try {
            const { data } = await axios.post(
                API.user.login,
                {
                    e_mail: params.email,
                    password: params.password,
                    remember_me: params.rememberMe,
                }
            );
            return {
                user: data.user,
                token: data.token,
            };
        } catch (error) {
            // get the error msg return from the server
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// action: register
export const userRegister = createAsyncThunk(
    'user/Register',
    async (params: {
        username: string, email: string, password: string
    }, thunkAPI) => {
        try {
            const { data } = await axios.post(
                API.user.register,
                {
                    username: params.username,
                    e_mail: params.email,
                    password: params.password
                }
            );
            return data;
        } catch (error) {

            return thunkAPI.rejectWithValue(error);
        }
    }
);

// action: verify whether user jwt is expired
export const userJWTVerify = createAsyncThunk(
    'user/JWTVerify',
    async (params: { jwt: string | null }, thunkAPI) => {
        try {
            const { data } = await axios.get(
                API.user.jwtVerify,
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`
                    }
                },
            );
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// action: user upload user avatar
export const uploadUserAvatar = createAsyncThunk(
    'user/uploadAvatar',
    async (params: { jwt: string | null, file: any }, thunkAPI) => {
        const formData = new FormData();
        console.log(params.file[0]);
        formData.append('file', params.file[0], params.file[0].file.name);
        const file = await axios.post(
            'http://localhost:3001/user/avatar',
            {
                formData
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                    Authorization: `bearer ${params.jwt}`,
                }
            },
        );
        console.log(file);
    }
);

// get user avatar
export const getUserAvatar = createAsyncThunk(
    'user/getAvatar',
    async (params: { jwt: string | null }, thunkAPI) => {
        try {
            const userAvatarUrl = await axios.get(
                'http://localhost:3001/user/avatar',
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`,
                    }
                },
            );
            return { 
                userAvatar: userAvatarUrl.data
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// get user statics
export const getUserStatics = createAsyncThunk(
    'user/getStatics',
    async (params: { jwt: string | null }, thunkAPI) => {
        try {
            const userStatics = await axios.get(
                'http://localhost:3001/user/statics',
                {
                    headers: {
                        Authorization: `bearer ${params.jwt}`,
                    }
                },
            );
            return { 
                userStatics: userStatics.data
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// slice
export const UserSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: {
        // user login
        [userLogin.pending.type]: (state) => {
            state.loading = true;
        },
        [userLogin.fulfilled.type]: (state, action) => {
            state.token = action.payload.token;
            state.loading = false;
            state.error = null;
        },
        [userLogin.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // user register
        [userRegister.pending.type]: (state) => {
            state.loading = true;
        },
        [userRegister.fulfilled.type]: (state) => {
            state.loading = false;
            state.error = null;
        },
        [userRegister.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // user jwt verify
        [userJWTVerify.pending.type]: (state) => {
            state.loading = true;
        },
        [userJWTVerify.fulfilled.type]: (state) => {
            state.loading = false;
            state.error = null;
        },
        [userJWTVerify.rejected.type]: (state, action) => {
            state.loading = false;
            state.token = null;     // 一定要把token清空! 要不会出大事!
            state.error = action.payload;
        },
        // get user avatar
        [getUserAvatar.pending.type]: (state) => {
            state.loading = true;
        },
        [getUserAvatar.fulfilled.type]: (state, action) => {
            state.userAvatar = action.payload.userAvatar;
            state.loading = false;
            state.error = null;
        },
        [getUserAvatar.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get user statics
        [getUserStatics.pending.type]: (state) => {
            state.loading = true;
        },
        [getUserStatics.fulfilled.type]: (state, action) => {
            state.userStatics = action.payload.userStatics;
            state.loading = false;
            state.error = null;
        },
        [getUserStatics.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});