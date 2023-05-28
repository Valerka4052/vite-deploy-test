import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const ferchPosts = createAsyncThunk('posts/fetchPosts', async ({page, itemsPerPage}) => {
  const { data } = await axios.get('/posts', { params: { page: page, limit: itemsPerPage } });
  console.log('postData ===>', data);
  return data
});
export const deletePost = createAsyncThunk('posts/deletePosts', async (id) => {
  const { data } = await axios.delete(`/posts/${id}`);
  console.log(data);
    return data.id
});

export const postSlise = createSlice({
  name: 'posts',
  initialState: {
    posts: {
      items: [],
      postsArrayLength:0,
      status: 'loadig',
    },
    tags: {
      items: [],
      status: 'loadig',
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ferchPosts.pending, (state) => {
      state.posts.status = 'loading';
    })
    builder.addCase(ferchPosts.fulfilled, (state, { payload }) => {
      state.posts.status = 'loaded';
      state.posts.items = payload.data;
      state.posts.postsArrayLength = payload.count;
    })
    builder.addCase(ferchPosts.rejected, (state) => {
      state.posts.status = 'error';
    })
    builder.addCase(deletePost.pending, (state) => {
      state.posts.status = 'loading';
    })
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      state.posts.status = 'loaded';
      const newItems = state.posts.items.filter(item => item._id !== payload);
      state.posts.items = newItems;
     
    })
    builder.addCase(deletePost.rejected, (state) => {
      state.posts.status = 'error';
      state.posts.items = [];
    })
  },
});

