import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const ferchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data
});

export const postSlise = createSlice({
  name: 'posts',
    initialState: {
        posts: {
            items: [],
            status:'loadig',
        },
        tags:{
            items: [],
            status:'loadig',
        }
  },
  reducers: {},
    extraReducers: (builder) => {
         builder.addCase(ferchPosts.pending, (state) => {
            state.posts.status = 'loading';
    })
        builder.addCase(ferchPosts.fulfilled, (state, { payload }) => {
           state.posts.status = 'loaded';
            state.posts.items = payload;
        })
        builder.addCase(ferchPosts.rejected, (state) => {
           state.posts.status = 'error';
            state.posts.items = [];
    })
    //     builder.addCase(ferchPosts.fulfilled, (state, action) => {
    //   state.statusByName[action.meta.arg] = 'fulfilled'
    //   state.dataByName[action.meta.arg] = action.payload
    // })
    //    builder.addCase(ferchPosts.rejected, (state, action) => {
    //   state.statusByName[action.meta.arg] = 'rejected'
    // })
  },
})

// export const postSlise.reducer