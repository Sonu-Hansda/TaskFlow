import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface User {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    bio?: string;
    joinDate?: string;
    avatar?: string;
    notifications?: {
        emailNotifications: boolean;
        pushNotifications: boolean;
        taskReminders: boolean;
        teamUpdates: boolean;
    };
}

interface AuthState {
    userInfo: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}


const loadState = (): AuthState => {
    try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        return {
            userInfo: user ? JSON.parse(user) : null,
            token: token || null,
            isAuthenticated: !!token,
            loading: false,
            error: null,
        };
    } catch (err) {
        return {
            userInfo: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,
        };
    }
};

const initialState: AuthState = loadState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.userInfo = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.userInfo = null;
            state.token = null;
            state.isAuthenticated = false;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setCredentials, logout, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
