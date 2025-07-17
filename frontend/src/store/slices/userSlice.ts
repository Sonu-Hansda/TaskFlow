import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import apiClient from '@/lib/api';
import type { User } from './authSlice';

interface UserState {
    profile: User | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    profile: null,
    loading: 'idle',
    error: null,
};

export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async () => {
    const response = await apiClient.get('/users/profile');
    return response.data;
});

export const updateUserProfile = createAsyncThunk('user/updateProfile', async (profileData: Partial<User>) => {
    const response = await apiClient.put('/users/profile', profileData);
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = 'succeeded';
                state.profile = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message || 'Failed to fetch profile';
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = 'succeeded';
                state.profile = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message || 'Failed to update profile';
            });
    },
});

export default userSlice.reducer;
