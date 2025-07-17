import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CheckSquare,
  Clock,
  Users,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { NewTaskDialog } from '@/components/NewTaskDialog';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTasks } from '@/store/slices/taskSlice';
import type { RootState, AppDispatch } from '@/store/store';
import { toast } from '@/hooks/use-toast';

export const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, error } = useSelector((state: RootState) => state.task);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Failed to fetch Tasks",
        description: error,
        variant: "destructive",
      });
    }
  }, [error]);

  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: CheckSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Team Members',
      value: '12',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
  ];

  const upcomingDeadlines = tasks
    .filter(task => task.status !== 'done' && new Date(task.dueDate) > new Date())
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return (
    <Layout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your projects.</p>
          </div>
          <NewTaskDialog>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </NewTaskDialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckSquare className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={
                          task.priority === 'high' ? 'destructive' :
                            task.priority === 'medium' ? 'default' : 'secondary'
                        }>
                          {task.priority}
                        </Badge>
                        <Badge variant={
                          task.status === 'done' ? 'default' :
                            task.status === 'in-progress' ? 'secondary' : 'outline'
                        }>
                          {task.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 border-l-4 border-orange-200 bg-orange-50 rounded">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <div className="flex items-center mt-1">
                          <Calendar className="w-3 h-3 mr-1 text-gray-500" />
                          <span className="text-xs text-gray-600">{new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Badge variant={
                        task.priority === 'high' ? 'destructive' :
                          task.priority === 'medium' ? 'default' : 'secondary'
                      }>
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};
