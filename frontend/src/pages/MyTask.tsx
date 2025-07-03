import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { TaskCard } from '@/components/TaskCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Calendar, CheckSquare } from 'lucide-react';
import type { Task } from '@/types/Task';

export const MyTasks: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Design user authentication flow',
      description: 'Create wireframes and mockups for the login and signup process',
      dueDate: '2024-07-05',
      priority: 'high' as const,
      status: 'in-progress' as const,
      assignee: { name: 'John Doe', initials: 'JD' },
      createdBy: 'Jane Smith'
    },
    {
      id: '2',
      title: 'Implement task filtering',
      description: 'Add filters for task status, priority, and due date',
      dueDate: '2024-07-08',
      priority: 'medium' as const,
      status: 'todo' as const,
      assignee: { name: 'John Doe', initials: 'JD' },
      createdBy: 'Mike Johnson'
    },
    {
      id: '3',
      title: 'Write API documentation',
      description: 'Document all endpoints for the task management API',
      dueDate: '2024-06-30',
      priority: 'low' as const,
      status: 'done' as const,
      assignee: { name: 'John Doe', initials: 'JD' },
      createdBy: 'Sarah Wilson'
    },
    {
      id: '4',
      title: 'Fix responsive layout issues',
      description: 'Resolve mobile display problems on the dashboard',
      dueDate: '2024-07-03',
      priority: 'high' as const,
      status: 'todo' as const,
      assignee: { name: 'John Doe', initials: 'JD' },
      createdBy: 'John Doe'
    }
  ];

  const getFilteredTasks = () => {
    let filtered = tasks;

    // Filter by status
    if (filter !== 'all') {
      if (filter === 'deadline-approaching') {
        const today = new Date();
        filtered = filtered.filter(task => {
          const deadline = new Date(task.dueDate);
          const diffTime = deadline.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 3 && diffDays >= 0;
        });
      } else {
        filtered = filtered.filter(task => task.status === filter);
      }
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  const getStatusStats = () => {
    return {
      all: tasks.length,
      todo: tasks.filter(t => t.status === 'todo').length,
      'in-progress': tasks.filter(t => t.status === 'in-progress').length,
      done: tasks.filter(t => t.status === 'done').length,
      'deadline-approaching': tasks.filter(task => {
        const today = new Date();
        const deadline = new Date(task.dueDate);
        const diffTime = deadline.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3 && diffDays >= 0;
      }).length
    };
  };

  const stats = getStatusStats();

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600">Manage your assigned tasks and track progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">All Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{stats.all}</p>
              </div>
              <CheckSquare className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">To Do</p>
                <p className="text-2xl font-bold text-blue-600">{stats.todo}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{stats['in-progress']}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.done}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Due Soon</p>
                <p className="text-2xl font-bold text-red-600">{stats['deadline-approaching']}</p>
              </div>
              <Calendar className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue>
                  <div className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    {filter === 'all' ? 'All Tasks' : 
                     filter === 'deadline-approaching' ? 'Due Soon' :
                     filter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Completed</SelectItem>
                <SelectItem value="deadline-approaching">Due Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'You have no tasks assigned. Create your first task to get started!'}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};