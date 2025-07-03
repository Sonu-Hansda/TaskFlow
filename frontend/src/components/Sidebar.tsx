import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Calendar,
  CheckSquare,
  Users,
  BarChart3,
  Plus,
  User,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewTaskDialog } from './NewTaskDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const navItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/' },
    { icon: CheckSquare, label: 'My Tasks', path: '/tasks' },
    { icon: Calendar, label: 'Kanban Board', path: '/kanban' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  if (isMobile && isOpen) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-200 ease-in-out">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
              <p className="text-xs text-gray-600 mt-1">Collaborative Task Management</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <NewTaskDialog>
              <Button className="w-full mb-3" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </NewTaskDialog>
            <div className="flex items-center text-sm text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span>John Doe</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop Sidebar
  if (!isMobile) {
    return (
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
          <p className="text-sm text-gray-600 mt-1">Collaborative Task Management</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <NewTaskDialog>
            <Button className="w-full mb-3" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </NewTaskDialog>
          <Button onClick={handleLogout} className="w-full mb-3 bg-transparent text-black border-gray-500 border hover:border-red-400 hover:text-red-400 hover:bg-transparent cursor-pointer" size="sm">
            Logout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-30 md:hidden bg-white shadow-md"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
};