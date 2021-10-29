import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// axios
import axios from 'axios';

// User State
interface UserState {
    loading: boolean;
    error: string | null;
    token: string | null;
};

const initialUserState: UserState = {
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
                'http://localhost:3001/user/login',
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
                'http://localhost:3001/user/register',
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
                'http://localhost:3001/user/jwt',
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
    },
});