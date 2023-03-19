import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { PostType } from '../../types/PostType';

export interface PostState {
    postList: PostType[];
}

export const createPost = createAsyncThunk(
    'post/createPost',
    async (post: PostType) => {
        try {
            const res = await axiosClient.post('/posts', post);
            return res.data;
        } catch (error: any) {
            throw new Error(error.response.data.msg);
        }
    }
);

export const updatePost = createAsyncThunk(
    'post/updatePost',
    async (postUpdate: { id: string; content: PostType }) => {
        try {
            const res = await axiosClient.put(
                `/posts/${postUpdate.id}`,
                postUpdate.content
            );
            return postUpdate;
        } catch (error: any) {
            throw new Error(error.response.data.msg);
        }
    }
);

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (id: { postId: string; userId: string }) => {
        try {
            await axiosClient.delete(`/posts/${id.postId}`, {
                data: { userId: id.userId },
            });
            return id.postId;
        } catch (error: any) {
            throw new Error(error.response.data.msg);
        }
    }
);

export const getPostList = createAsyncThunk(
    'post/getPostList',
    async (id: string) => {
        try {
            const res = await axiosClient.get(`/posts/timeline/${id}`);
            return res.data;
        } catch (error: any) {
            throw new Error(error.response.data.msg);
        }
    }
);

const initialState: PostState = {
    postList: [],
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPostList.fulfilled, (state, action) => {
            state.postList = action.payload;
        });
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.postList = [...state.postList, action.payload];
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.postList = state.postList.filter(
                (post) => post._id !== action.payload
            );
        });
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.postList = state.postList.map((post) =>
                post._id === action.payload.id
                    ? { ...post, ...action.payload.content }
                    : post
            );
        });
    },
});

const postReducer = postSlice.reducer;

export const postSelector = (state: { postList: PostState }) => state.postList;

export const {} = postSlice.actions;

export default postReducer;