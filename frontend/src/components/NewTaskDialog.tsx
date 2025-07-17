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
import type { RootState, AppDispatch } from '@/store/store';
import { createTask, resetTaskForm, type CreateTaskData } from '@/store/slices/taskSlice';
import { toast } from '@/hooks/use-toast';
import apiClient from '@/lib/api';

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

    const dispatch = useDispatch<AppDispatch>();

    const { loading } = useSelector((state: RootState) => state.task);
    const { token } = useSelector((state: RootState) => state.auth);
    const [teamMembers, setTeamMembers] = useState<any[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const taskData: CreateTaskData = {
            ...formData,
            status: 'todo',
            priority: formData.priority as 'low' | 'medium' | 'high',
        };

        const resultAction = await dispatch(createTask(taskData));
        if (createTask.fulfilled.match(resultAction)) {
            toast({
                title: "Added Successfully",
                description: formData.title + ' added successfully',
            });
            dispatch(resetTaskForm());
            setFormData({
                title: '',
                description: '',
                dueDate: '',
                priority: 'medium',
                assignee: '',
            });
            setOpen(false);
        } else {
            toast({
                title: "Failed to Add Task",
                description: (resultAction.payload as any)?.message || 'An error occurred',
                variant: 'destructive'
            });
        }
    };


    useEffect(() => {
        const fetchTeamMembers = async () => {
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
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter task description"
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Priority</Label>
                            <Select value={formData.priority}
                                onValueChange={(value) => setFormData({ ...formData, priority: value as 'low' | 'medium' | 'high' })}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        <div className="flex items-center">
                                            <Flag className="w-4 h-4 mr-2" />
                                            {formData.priority}
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
                            value={formData.assignee}
                            onValueChange={(value) => setFormData({ ...formData, assignee: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select team member">
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 mr-2" />
                                        {formData.assignee && teamMembers.length > 0
                                            ? teamMembers.find((m) => m._id === formData.assignee)?.name || 'Select assignee'
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
                        <Button type="submit" disabled={loading === 'pending' || !formData.title.trim()}>
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
