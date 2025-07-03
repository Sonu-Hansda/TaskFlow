import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { CalendarDays, Flag, User } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import apiClient from '@/lib/api';
import { resetTaskForm, setError, setLoading, setTaskField } from '@/store/slices/taskSlice';
import { toast } from '@/hooks/use-toast';

interface NewTaskDialogProps {
    children: React.ReactNode;
}

export const NewTaskDialog: React.FC<NewTaskDialogProps> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        assignee: '',
    });

    const dispatch = useDispatch();

    const { error, task, loading } = useSelector((state: RootState) => state.task);
    const { token } = useSelector((state: RootState) => state.auth);
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [loadingMembers, setLoadingMembers] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            await apiClient.post('/tasks/add-new', {

                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                priority: task.priority,
                assignee: task.assignee,
            }, {
                headers: {
                    "Authorization": token,
                },
            }
            );

            dispatch(resetTaskForm());
            setOpen(false);
            toast({
                title: "Added Successfully",
                description: task.title + ' added successfully',
            });

        } catch (err: any) {
            dispatch(setError(err.response?.data?.message || 'Failed to Add'));
            toast({
                title: "Failed to Add Task",
                description: error,
            });

        } finally {
            dispatch(setLoading(false));
        }
    };


    useEffect(() => {
        const fetchTeamMembers = async () => {
            setLoadingMembers(true);
            try {
                const res = await apiClient.get('/users/getAll', {
                    headers: {
                        "Authorization": token,
                    }
                });
                const users = res.data;
                setTeamMembers(users);
            } catch (err) {
                console.error('Failed to load team members:', err);
            } finally {
                setLoadingMembers(false);
            }
        };

        fetchTeamMembers();
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <CalendarDays className="w-5 h-5 mr-2 text-blue-600" />
                        Create New Task
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Task Title *</Label>
                        <Input
                            id="title"
                            placeholder="Enter task title"
                            value={task.title}
                            onChange={(e) =>
                                dispatch(setTaskField({ field: 'title', value: e.target.value }))
                            }
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter task description"
                            rows={3}
                            value={task.description}
                            onChange={(e) =>
                                dispatch(setTaskField({ field: 'description', value: e.target.value }))
                            }
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={task.dueDate}
                                onChange={(e) =>
                                    dispatch(setTaskField({ field: 'dueDate', value: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Priority</Label>
                            <Select value={task.priority}
                                onValueChange={(e) =>
                                    dispatch(setTaskField({ field: 'priority', value: e }))}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        <div className="flex items-center">
                                            <Flag className="w-4 h-4 mr-2" />
                                            {task.priority}
                                        </div>
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">
                                        <div className="flex items-center">
                                            <Flag className="w-4 h-4 mr-2 text-green-600" />
                                            Low
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="medium">
                                        <div className="flex items-center">
                                            <Flag className="w-4 h-4 mr-2 text-yellow-600" />
                                            Medium
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="high">
                                        <div className="flex items-center">
                                            <Flag className="w-4 h-4 mr-2 text-red-600" />
                                            High
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Assign To</Label>
                        <Select
                            value={task.assignee}
                            onValueChange={(value) => {
                                dispatch(setTaskField({ field: 'assignee', value }));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select team member">
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 mr-2" />
                                        {task.assignee && teamMembers.length > 0
                                            ? teamMembers.find((m) => m._id === task.assignee)?.name || 'Select assignee'
                                            : 'Select assignee'}
                                    </div>
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {teamMembers.map((member) => (
                                    <SelectItem key={member._id} value={member._id}>
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium mr-2">
                                                {member.initials || member.name.charAt(0)}
                                            </div>
                                            {member.name}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading || !task.title.trim()}>
                            {loading ? (
                                "Signing in..."
                            ) : (

                                "  Create Task"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};