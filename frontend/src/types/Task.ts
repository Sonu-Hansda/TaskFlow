interface Assignee {
  name: string;
  initials: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  assignee: Assignee;
  createdBy: string;
}