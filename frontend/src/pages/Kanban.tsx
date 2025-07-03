import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { KanbanBoard } from '@/components/KanbanBoard';
import { TaskForm } from '@/components/TaskForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import type { Task } from '@/types/Task';

const mockTasks = [
  {
    id: '1',
    title: 'Design new user dashboard',
    description: 'Create wireframes and mockups for the new user dashboard interface',
    dueDate: '2024-07-05',
    priority: 'high' as const,
    status: 'in-progress' as const,
    assignee: { name: 'Jane Smith', initials: 'JS' },
    createdBy: 'John Doe'
  },
  {
    id: '2',
    title: 'Implement authentication system',
    description: 'Set up user login, registration, and password reset functionality',
    dueDate: '2024-07-08',
    priority: 'medium' as const,
    status: 'todo' as const,
    assignee: { name: 'Mike Johnson', initials: 'MJ' },
    createdBy: 'John Doe'
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all API endpoints with examples and usage instructions',
    dueDate: '2024-07-03',
    priority: 'low' as const,
    status: 'done' as const,
    assignee: { name: 'Sarah Wilson', initials: 'SW' },
    createdBy: 'Jane Smith'
  },
  {
    id: '4',
    title: 'Fix mobile responsiveness',
    description: 'Ensure all pages work properly on mobile devices',
    dueDate: '2024-07-04',
    priority: 'high' as const,
    status: 'todo' as const,
    assignee: { name: 'Alex Brown', initials: 'AB' },
    createdBy: 'John Doe'
  }
];

export const KanbanPage: React.FC = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskUpdate = (taskId: string, newStatus: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus as any } : task
      )
    );
    toast({
      title: "Task Updated",
      description: "Task status has been updated successfully.",
    });
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
    if (selectedTask) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === selectedTask.id
            ? { ...task, ...data, assignee: { name: data.assignee, initials: data.assignee.split(' ').map((n: string) => n[0]).join('') } }
            : task
        )
      );
      toast({
        title: "Task Updated",
        description: "Task has been updated successfully.",
      });
    } else {
      const newTask = {
        id: Date.now().toString(),
        ...data,
        assignee: {
          name: data.assignee,
          initials: data.assignee.split(' ').map((n: string) => n[0]).join('')
        },
        createdBy: 'John Doe',
        dueDate: data.dueDate.toISOString().split('T')[0]
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      toast({
        title: "Task Created",
        description: "New task has been created successfully.",
      });
    }
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  const handleFormCancel = () => {
    setShowTaskForm(false);
    setSelectedTask(null);
  };

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