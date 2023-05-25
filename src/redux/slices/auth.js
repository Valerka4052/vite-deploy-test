import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchUser = createAsyncThunk('auth/fetchUser', async (params) => {
    console.log('params',params);
    const { data } = await axios.post('/auth/login', params);
    // console.log(data);
    return data
});
export const registerUser = createAsyncThunk('auth/registerUser', async (params) => {
    console.log('params',params);
    const { data } = await axios.post('/auth/register', params);
    // console.log('data', data);
    return data
});
export const authMe = createAsyncThunk('auth/refreshUser', async () => {
    const { data } = await axios.get('/auth/me');
    // console.log('data', data);
    return data
});


export const authSlise = createSlice({
    name: 'auth',
    initialState: {
        data: null,
        status: 'loading'
    },
    reducers: {
        logout: (state) => {
            console.log('action');
            return { ...state, data: null };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
            state.status = 'loaded';
            state.data = payload;
        })
        builder.addCase(fetchUser.rejected, (state) => {
            state.status = 'error';
            state.data = null;
        })
        builder.addCase(authMe.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(authMe.fulfilled, (state, { payload }) => {
            state.status = 'loaded';
            state.data = payload;
        })
        builder.addCase(authMe.rejected, (state) => {
            state.status = 'error';
            state.data = null;
        })
        builder.addCase(registerUser.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(registerUser.fulfilled, (state, { payload }) => {
            state.status = 'loaded';
            state.data = payload;
        })
        builder.addCase(registerUser.rejected, (state) => {
            state.status = 'error';
            state.data = null;
        })
    },
});
export const { logout } = authSlise.actions;