import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import AppLayout from './components/layout/AppLayout';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Protected route component
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode;
  allowedRoles?: string[];
}> = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Role-specific dashboard selector
const DashboardSelector: React.FC = () => {
  const { userRole } = useAuth();
  
  switch (userRole) {
    case 'student':
      return <StudentDashboard />;
    case 'parent':
      return <ParentDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardSelector />} />
            
            {/* Student routes */}
            <Route path="assignments" element={
              <ProtectedRoute allowedRoles={['student', 'parent', 'admin']}>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-6">Assignments</h1>
                  <p>Assignments page content will go here.</p>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="completed" element={
              <ProtectedRoute allowedRoles={['student']}>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-6">Completed Assignments</h1>
                  <p>Completed assignments page content will go here.</p>
                </div>
              </ProtectedRoute>
            } />
            
            {/* Parent routes */}
            <Route path="students" element={
              <ProtectedRoute allowedRoles={['parent', 'admin']}>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-6">Students</h1>
                  <p>Students page content will go here.</p>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="progress" element={
              <ProtectedRoute allowedRoles={['parent']}>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-6">Progress Tracking</h1>
                  <p>Progress tracking page content will go here.</p>
                </div>
              </ProtectedRoute>
            } />
            
            {/* Admin routes */}
            <Route path="parents" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-6">Parents</h1>
                  <p>Parents management page content will go here.</p>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="subjects" element={
              <ProtectedRoute allowedRoles={['student', 'admin']}>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-6">Subjects</h1>
                  <p>Subjects page content will go here.</p>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="reports" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-6">Reports</h1>
                  <p>Reports page content will go here.</p>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="settings" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-6">Settings</h1>
                  <p>Settings page content will go here.</p>
                </div>
              </ProtectedRoute>
            } />
            
            {/* Common routes */}
            <Route path="calendar" element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-6">Calendar</h1>
                  <p>Calendar page content will go here.</p>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="profile" element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-6">Profile</h1>
                  <p>Profile page content will go here.</p>
                </div>
              </ProtectedRoute>
            } />
            
            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;