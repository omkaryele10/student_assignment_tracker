import React from 'react';
import { 
  GraduationCap, ClipboardList, CheckCircle, FileWarning, 
  ArrowUpRight, UserCircle, BarChart4 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import StatCard from '../components/dashboard/StatCard';
import { studentAssignments, users } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import Avatar from '../components/ui/Avatar';

const ParentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Get children of current parent
  const children = users.filter(
    user => user.role === 'student' && currentUser?.parentOf?.includes(user.id)
  );
  
  // Calculate stats
  const totalAssignments = studentAssignments.length;
  const pendingAssignments = studentAssignments.filter(a => a.status === 'pending');
  const completedAssignments = studentAssignments.filter(a => a.status === 'completed');
  const lateAssignments = studentAssignments.filter(a => a.status === 'late');
  
  // Get upcoming deadlines
  const upcomingDeadlines = pendingAssignments
    .filter(a => new Date(a.dueDate) > new Date())
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {currentUser?.name}
        </h1>
        <p className="text-sm text-gray-500 mt-1 sm:mt-0">
          Monitor your children's academic progress
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Students" 
          value={children.length} 
          icon={GraduationCap}
          color="blue"
        />
        <StatCard 
          title="Total Assignments" 
          value={totalAssignments} 
          icon={ClipboardList}
          color="purple"
        />
        <StatCard 
          title="Completed" 
          value={completedAssignments.length} 
          icon={CheckCircle}
          color="green"
          change={{ value: 12, positive: true }}
        />
        <StatCard 
          title="Overdue" 
          value={lateAssignments.length} 
          icon={FileWarning}
          color="red"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>My Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {children.map((student) => {
                  const studentPendingAssignments = studentAssignments.filter(a => a.status === 'pending');
                  const studentCompletedAssignments = studentAssignments.filter(a => a.status === 'completed');
                  const completionRate = Math.round((studentCompletedAssignments.length / studentAssignments.length) * 100);
                  
                  return (
                    <div key={student.id} className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <Avatar name={student.name} size="lg" />
                      
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                          
                          <button className="inline-flex items-center px-2.5 py-1.5 border border-blue-300 text-xs font-medium rounded-full text-blue-700 bg-blue-50 hover:bg-blue-100">
                            View Details
                            <ArrowUpRight className="h-3 w-3 ml-1" />
                          </button>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Pending</p>
                            <p className="text-lg font-semibold text-gray-900">{studentPendingAssignments.length}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Completed</p>
                            <p className="text-lg font-semibold text-gray-900">{studentCompletedAssignments.length}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Progress</p>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${completionRate}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium text-gray-700">{completionRate}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((assignment) => {
                  const dueDate = new Date(assignment.dueDate);
                  const today = new Date();
                  const diffTime = dueDate.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={assignment.id} className="flex items-start p-2 rounded-md hover:bg-gray-50">
                      <div className={`flex-shrink-0 h-2 w-2 mt-2 rounded-full ${
                        diffDays <= 1 ? 'bg-red-500' : diffDays <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div className="ml-3 flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{assignment.title}</p>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{assignment.subject}</span>
                          <span>
                            {diffDays === 0 
                              ? 'Due today' 
                              : diffDays === 1 
                                ? 'Due tomorrow' 
                                : `Due in ${diffDays} days`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  View all assignments
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle>Contact Teacher</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4 p-3 border border-gray-200 rounded-lg">
                <Avatar name="Admin User" size="md" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">admin@school.edu</p>
                </div>
              </div>
              
              <button className="w-full flex items-center justify-center px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100">
                <UserCircle className="h-4 w-4 mr-2" />
                Send Message
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;