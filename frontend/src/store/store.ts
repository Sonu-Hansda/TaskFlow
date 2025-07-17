import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import taskReducer from '@/store/slices/taskSlice';
import userReducer from '@/store/slices/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
