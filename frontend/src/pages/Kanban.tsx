import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '@/components/Layout';
import { KanbanBoard } from '@/components/KanbanBoard';
import { TaskForm } from '@/components/TaskForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { Task } from '@/types/Task';
import { fetchTasks, createTask, updateTask } from '@/store/slices/taskSlice';
import type { RootState, AppDispatch } from '@/store/store';

export const KanbanPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.task);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleTaskUpdate = (taskId: string, newStatus: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      dispatch(updateTask({ ...task, status: newStatus as 'todo' | 'in-progress' | 'done' }));
    }
  };

  const handleTaskCreate = () => {
    setSelectedTask(null);
    setShowTaskForm(true);
  };

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleTaskSubmit = (data: any) => {
    const taskData = {
      ...data,
      dueDate: data.dueDate.toISOString(),
    };
    if (selectedTask) {
      console.log("Update task logic to be implemented");
    } else {
      dispatch(createTask(taskData));
    }
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  const handleFormCancel = () => {
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  if (loading === 'pending') {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (error) {
    return <Layout><div>Error: {error}</div></Layout>;
  }

  return (
    <Layout>
      <KanbanBoard
        tasks={tasks}
        onTaskUpdate={handleTaskUpdate}
        onTaskCreate={handleTaskCreate}
        onTaskClick={handleTaskClick}
      />

      <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
        <DialogContent className="max-w-2xl">
          <TaskForm
            onSubmit={handleTaskSubmit}
            onCancel={handleFormCancel}
            initialData={selectedTask ? {
              ...selectedTask,
              dueDate: new Date(selectedTask.dueDate),
              assignee: selectedTask.assignee.name
            } : undefined}
            isEdit={!!selectedTask}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};
