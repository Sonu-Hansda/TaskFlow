import React from 'react';
import { Calendar, User, Clock, Flag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  assignee: {
    name: string;
    initials: string;
  };
  createdBy: string;
}

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  };

  const statusColors = {
    'todo': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'done': 'bg-green-100 text-green-800',
  };

  const isDeadlineApproaching = () => {
    const today = new Date();
    const deadline = new Date(task.dueDate);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 flex-1 mr-2">{task.title}</h3>
        <Badge className={priorityColors[task.priority]} variant="outline">
          <Flag className="w-3 h-3 mr-1" />
          {task.priority}
        </Badge>
      </div>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            <span className={isDeadlineApproaching() ? 'text-red-600 font-medium' : ''}>
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
            {isDeadlineApproaching() && (
              <Clock className="w-3 h-3 ml-1 text-red-600" />
            )}
          </div>
          <Badge className={statusColors[task.status]} variant="secondary">
            {task.status.replace('-', ' ')}
          </Badge>
        </div>
        
        <div className="flex items-center">
          <User className="w-3 h-3 mr-1" />
          <Avatar className="w-5 h-5">
            <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};