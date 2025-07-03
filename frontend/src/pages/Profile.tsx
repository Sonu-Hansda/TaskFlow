import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, Bell, Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@taskflow.com',
    phone: '+91 8793456423',
    location: 'Ranchi, Jharkhand',
    bio: 'Product Manager passionate about building great user experiences and leading cross-functional teams.',
    joinDate: '03-07-',
    avatar: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    teamUpdates: false,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
  };

  const stats = [
    { label: 'Tasks Completed', value: '147', color: 'bg-green-100 text-green-800' },
    { label: 'Active Projects', value: '8', color: 'bg-blue-100 text-blue-800' },
    { label: 'Team Members', value: '12', color: 'bg-purple-100 text-purple-800' },
    { label: 'Days Active', value: '342', color: 'bg-orange-100 text-orange-800' },
  ];

  return (
    <Layout>
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="text-xl bg-blue-100 text-blue-600">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{profile.name}</CardTitle>
                <p className="text-gray-600">{profile.email}</p>
                <Badge variant="secondary" className="mt-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  Joined {new Date(profile.joinDate).toLocaleDateString()}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <Badge className={`${stat.color} mb-1`}>
                        {stat.value}
                      </Badge>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        />
                      </div>

                      <Button type="submit" className="w-full md:w-auto">
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications({ ...notifications, emailNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-gray-600">Receive push notifications</p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications({ ...notifications, pushNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Task Reminders</Label>
                        <p className="text-sm text-gray-600">Get reminded about upcoming deadlines</p>
                      </div>
                      <Switch
                        checked={notifications.taskReminders}
                        onCheckedChange={(checked) => 
                          setNotifications({ ...notifications, taskReminders: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Team Updates</Label>
                        <p className="text-sm text-gray-600">Notifications about team activities</p>
                      </div>
                      <Switch
                        checked={notifications.teamUpdates}
                        onCheckedChange={(checked) => 
                          setNotifications({ ...notifications, teamUpdates: checked })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Active Sessions
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};