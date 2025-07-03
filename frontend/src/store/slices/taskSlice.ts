import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';


export interface Task {
    _id?: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    priority: 'low' | 'medium' | 'high';
    assignee: string;
}

interface TaskState {
    tasks: Task[];
    task: Task;
    loading: boolean;
    error: string | null;
}


const initialState: TaskState = {
    tasks: [],
    task: {
        title: '',
        description: '',
        dueDate: '',
        status: 'todo',
        priority: 'medium',
        assignee: '',
    },
    loading: false,
    error: null,
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {

        setTaskField: (
            state,
            action: PayloadAction<{ field: keyof Task; value: string }>
        ) => {
            const { field, value } = action.payload;

            if (field === 'priority') {
                if (value === 'low' || value === 'medium' || value === 'high') {
                    state.task.priority = value;
                } else {
                    console.warn(`Invalid priority value: ${value}`);
                    return;
                }
            } else {
                state.task[field] = value;
            }
        },

        resetTaskForm: (state) => {
            state.task = initialState.task;
            state.loading = false;
            state.error = null;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },

    },
});

export const { setTaskField, resetTaskForm, setLoading, setError, setTasks } =
    taskSlice.actions;

export default taskSlice.reducer;