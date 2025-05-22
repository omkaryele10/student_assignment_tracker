import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';

const AppLayout: React.FC = () => {
  const { userRole } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
        <footer className="bg-white p-4 text-center text-sm text-gray-500 border-t">
          Assignment Tracker © {new Date().getFullYear()} | {userRole?.charAt(0).toUpperCase() + userRole?.slice(1)} Portal
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;