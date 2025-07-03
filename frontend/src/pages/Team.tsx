import React from 'react';
import { Layout } from '@/components/Layout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Users,
    Mail,
    Calendar,
    CheckSquare,
    Trophy
} from 'lucide-react';

export const Team: React.FC = () => {

    const teamMembers = [
        {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            initials: 'JD',
            role: 'Frontend Developer',
            tasksAssigned: 12,
            tasksCompleted: 8,
            tasksInProgress: 3,
            tasksTodo: 1,
            joinedDate: '2024-01-15',
            isOnline: true
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            initials: 'JS',
            role: 'Project Manager',
            tasksAssigned: 18,
            tasksCompleted: 15,
            tasksInProgress: 2,
            tasksTodo: 1,
            joinedDate: '2023-11-20',
            isOnline: true
        },
        {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            initials: 'MJ',
            role: 'Backend Developer',
            tasksAssigned: 14,
            tasksCompleted: 10,
            tasksInProgress: 3,
            tasksTodo: 1,
            joinedDate: '2024-02-01',
            isOnline: false
        },
        {
            id: '4',
            name: 'Sarah Wilson',
            email: 'sarah.wilson@example.com',
            initials: 'SW',
            role: 'UI/UX Designer',
            tasksAssigned: 16,
            tasksCompleted: 12,
            tasksInProgress: 2,
            tasksTodo: 2,
            joinedDate: '2023-12-10',
            isOnline: true
        }
    ];

    const getCompletionRate = (completed: number, total: number) => {
        return total > 0 ? Math.round((completed / total) * 100) : 0;
    };

    return (
        <Layout>
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Team</h1>
                    <p className="text-gray-600">Manage your team members and track their progress</p>
                </div>

                {/* Team Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Members</p>
                                <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
                            </div>
                            <Users className="w-8 h-8 text-blue-600" />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Online Now</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {teamMembers.filter(m => m.isOnline).length}
                                </p>
                            </div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Tasks</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {teamMembers.reduce((sum, member) => sum + member.tasksAssigned, 0)}
                                </p>
                            </div>
                            <CheckSquare className="w-8 h-8 text-blue-400" />
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {teamMembers.reduce((sum, member) => sum + member.tasksCompleted, 0)}
                                </p>
                            </div>
                            <Trophy className="w-8 h-8 text-green-400" />
                        </div>
                    </Card>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {teamMembers.map((member) => (
                        <Card key={member.id} className="p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <Avatar className="w-12 h-12">
                                            <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                                                {member.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        {member.isOnline && (
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                                        <p className="text-sm text-gray-600">{member.role}</p>
                                        <div className="flex items-center mt-1">
                                            <Mail className="w-3 h-3 text-gray-400 mr-1" />
                                            <span className="text-xs text-gray-500">{member.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge variant={member.isOnline ? "default" : "secondary"}>
                                    {member.isOnline ? "Online" : "Offline"}
                                </Badge>
                            </div>

                            {/* Task Statistics */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Task Completion</span>
                                    <span className="font-medium">
                                        {getCompletionRate(member.tasksCompleted, member.tasksAssigned)}%
                                    </span>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${getCompletionRate(member.tasksCompleted, member.tasksAssigned)}%`
                                        }}
                                    ></div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 text-xs">
                                    <div className="text-center">
                                        <div className="font-semibold text-blue-600">{member.tasksTodo}</div>
                                        <div className="text-gray-500">To Do</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-semibold text-yellow-600">{member.tasksInProgress}</div>
                                        <div className="text-gray-500">In Progress</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-semibold text-green-600">{member.tasksCompleted}</div>
                                        <div className="text-gray-500">Completed</div>
                                    </div>
                                </div>
                            </div>

                            {/* Member Info */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        Joined {new Date(member.joinedDate).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center">
                                        <CheckSquare className="w-3 h-3 mr-1" />
                                        {member.tasksAssigned} total tasks
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Add Member Button */}
                <div className="mt-6 text-center">
                    <Button variant="outline" size="lg">
                        <Users className="w-4 h-4 mr-2" />
                        Invite Team Member
                    </Button>
                </div>
            </div>
        </Layout>
    );
};