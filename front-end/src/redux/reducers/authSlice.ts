import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { User } from '../../types/UserType';

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: any,
    
}

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (user: { email: string; password: string }) => {
        try {
            const res = await axiosClient.post('/auth/register', user);
            return res.data;
        } catch (error: any) {
            throw new Error(error.response.data.msg);
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (user: { email: string; password: string }) => {
        try {
            const res = await axiosClient.post('/auth/login', user);
            return res.data;
        } catch (error: any) {
            throw new Error(error.response.data.msg);
        }
    }
);

export const getUser = createAsyncThunk('users/getUser', async (id: string) => {
    try {
        const res = await axiosClient.get(`/users?userId=${id}`);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response.data.msg);
    }
});

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (user: { id: string; info: any }) => {
        try {
            const res = await axiosClient.put(`/users/${user.id}`, user.info);
            return res.data;
        } catch (error: any) {
            throw new Error(error.response.data.msg);
        }
    }
);

export const followUser = createAsyncThunk(
    'users/followUser',
    async (follow: { userIdFollowing: string; userIdFollowed: string }) => {
        try {
            await axiosClient.put(`/users/${follow.userIdFollowed}/follow`, {
                userIdFollowing: follow.userIdFollowing,
            });
            return follow.userIdFollowing;
        } catch (error: any) {
            throw new Error(error.response.data.msg);
        }
    }
);

export const deleteFollowUser = createAsyncThunk(
    'users/deleteFollowUser',
    async (request: { friendId: string; currentUserId: string }) => {
        try {
            await axiosClient.put(
                `/users/${request.friendId}/delete-requestFollow`,
                {
                    currentUserId: request.currentUserId,
                }
            );
            return request.friendId;
        } catch (error: any) {
            throw new Error(error.response.data.msg);
        }
    }
);

export const addRequestFriend = createAsyncThunk(
    'users/addRequestFriend',
    async (request: { friendId: string; userIdRequesting: string }) => {
        try {
            await axiosClient.put(`/users/${request.friendId}/requestFollow`, {
                userIdRequesting: request.userIdRequesting,
            });
            return request.friendId;
        } catch (error: any) {
            throw new Error(error.response.data.msg);
        }
    }
);

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        endLoading: (state) => {
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.rejected, (state, action) => {
            state.error = action.payload;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(followUser.fulfilled, (state, action) => {
            const newRequestFollowers = state.user?.requestFollowers?.filter(
                (item) => item !== action.payload
            );
            state.user!.requestFollowers = newRequestFollowers;
            state.user?.followers?.push(action.payload);
        });
        builder.addCase(addRequestFriend.fulfilled, (state, action) => {
            state.user?.requestFollowings?.push(action.payload);
        });
        builder.addCase(deleteFollowUser.fulfilled, (state, action) => {
            const newRequestFollowers = state.user?.requestFollowers?.filter(
                (item) => item !== action.payload
            );
            state.user!.requestFollowers = newRequestFollowers;
        });
    },
});

export const selectAuthLoading = (state: { auth: AuthState }) =>
    state.auth.loading;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
    state.auth.isAuthenticated;

export const { startLoading, endLoading, logout } = authSlice.actions;

export default authSlice.reducer;