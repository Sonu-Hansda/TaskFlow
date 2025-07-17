import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import apiClient from '@/lib/api';
import type { Task } from '@/types/Task';

interface TaskState {
    tasks: Task[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: 'idle',
    error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await apiClient.get('/tasks/get-all');
    return response.data;
});

export type CreateTaskData = Omit<Task, 'id' | 'createdBy' | 'assignee'> & { assignee?: string };

export const createTask = createAsyncThunk('tasks/createTask', async (taskData: CreateTaskData) => {
    const response = await apiClient.post('/tasks/add-new', taskData);
    return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task: Task) => {
    const response = await apiClient.put(`/tasks/${task.id}`, task);
    return response.data;
});

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        resetTaskForm: (state) => {
            state.loading = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message || 'Failed to fetch tasks';
            })
            .addCase(createTask.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.loading = 'succeeded';
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message || 'Failed to create task';
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update task';
            });
    },
});

export const { resetTaskForm } = taskSlice.actions;

export default taskSlice.reducer;
