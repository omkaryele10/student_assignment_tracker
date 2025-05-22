import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, BookOpen, Calendar, CheckSquare, ClipboardList, 
  Home, Settings, Users, GraduationCap, BookA
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { userRole } = useAuth();
  
  const navigationItems = {
    student: [
      { name: 'Dashboard', icon: Home, path: '/dashboard' },
      { name: 'Assignments', icon: ClipboardList, path: '/assignments' },
      { name: 'Completed', icon: CheckSquare, path: '/completed' },
      { name: 'Calendar', icon: Calendar, path: '/calendar' },
      { name: 'Subjects', icon: BookA, path: '/subjects' },
    ],
    parent: [
      { name: 'Dashboard', icon: Home, path: '/dashboard' },
      { name: 'My Students', icon: GraduationCap, path: '/students' },
      { name: 'Assignments', icon: ClipboardList, path: '/assignments' },
      { name: 'Calendar', icon: Calendar, path: '/calendar' },
      { name: 'Progress', icon: BarChart3, path: '/progress' },
    ],
    admin: [
      { name: 'Dashboard', icon: Home, path: '/dashboard' },
      { name: 'Students', icon: GraduationCap, path: '/students' },
      { name: 'Parents', icon: Users, path: '/parents' },
      { name: 'Assignments', icon: ClipboardList, path: '/assignments' },
      { name: 'Subjects', icon: BookOpen, path: '/subjects' },
      { name: 'Reports', icon: BarChart3, path: '/reports' },
      { name: 'Settings', icon: Settings, path: '/settings' },
    ],
  };
  
  const items = userRole ? navigationItems[userRole] : [];
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-sm h-screen sticky top-0 flex flex-col">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">EduTrack</h1>
            <p className="text-xs text-gray-500 mt-0.5">Assignment Tracker</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium
                  ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}
                  transition-colors duration-150
                `}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-md p-3">
          <h3 className="text-sm font-medium text-blue-800">Need Help?</h3>
          <p className="text-xs text-blue-600 mt-1">Contact your administrator for assistance.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;