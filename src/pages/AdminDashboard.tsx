import React from 'react';
import { 
  Users, GraduationCap, BookOpen, ClipboardList,
  PlusCircle, ArrowUpRight, BarChart4
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import StatCard from '../components/dashboard/StatCard';
import Button from '../components/ui/Button';
import { assignments, users } from '../data/mockData';
import Avatar from '../components/ui/Avatar';

const AdminDashboard: React.FC = () => {
  // Calculate stats
  const studentCount = users.filter(u => u.role === 'student').length;
  const parentCount = users.filter(u => u.role === 'parent').length;
  const subjectCount = Array.from(new Set(assignments.map(a => a.subject))).length;
  
  // Get upcoming deadlines
  const pendingAssignments = assignments.filter(a => a.status === 'pending');
  const completedAssignments = assignments.filter(a => a.status === 'completed');
  const lateAssignments = assignments.filter(a => a.status === 'late');
  
  // Get recent students
  const recentStudents = users
    .filter(u => u.role === 'student')
    .slice(0, 3);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Assignment
          </Button>
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Manage Users
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Students" 
          value={studentCount}
          icon={GraduationCap}
          color="blue"
        />
        <StatCard 
          title="Parents" 
          value={parentCount}
          icon={Users}
          color="purple"
        />
        <StatCard 
          title="Subjects" 
          value={subjectCount}
          icon={BookOpen}
          color="green"
        />
        <StatCard 
          title="Assignments" 
          value={assignments.length}
          icon={ClipboardList}
          color="yellow"
          change={{ value: 5, positive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Assignment Status Overview</CardTitle>
              <Button variant="outline" size="sm">
                <BarChart4 className="h-4 w-4 mr-2" />
                Detailed Reports
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">All Assignments</span>
                  <span className="text-sm font-medium text-gray-500">{assignments.length} total</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="flex h-full">
                    <div 
                      className="bg-green-500 h-full" 
                      style={{ width: `${(completedAssignments.length / assignments.length) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-yellow-500 h-full" 
                      style={{ width: `${(pendingAssignments.length / assignments.length) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-red-500 h-full" 
                      style={{ width: `${(lateAssignments.length / assignments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex items-center text-xs">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                    <span>Completed ({completedAssignments.length})</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="h-2 w-2 bg-yellow-500 rounded-full mr-1"></span>
                    <span>Pending ({pendingAssignments.length})</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="h-2 w-2 bg-red-500 rounded-full mr-1"></span>
                    <span>Late ({lateAssignments.length})</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Subject Distribution</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(assignments.map(a => a.subject))).map(subject => {
                      const subjectAssignments = assignments.filter(a => a.subject === subject);
                      const percentage = Math.round((subjectAssignments.length / assignments.length) * 100);
                      
                      return (
                        <div key={subject}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-600">{subject}</span>
                            <span className="text-xs text-gray-600">{subjectAssignments.length} ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="border border-gray-100 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-green-500"></div>
                      <div className="ml-3">
                        <p className="text-xs font-medium text-gray-800">New assignment created</p>
                        <p className="text-xs text-gray-500">Math Homework - Algebra Basics</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-blue-500"></div>
                      <div className="ml-3">
                        <p className="text-xs font-medium text-gray-800">Assignment completed</p>
                        <p className="text-xs text-gray-500">Student One completed Geometry Problems</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-red-500"></div>
                      <div className="ml-3">
                        <p className="text-xs font-medium text-gray-800">Assignment past due</p>
                        <p className="text-xs text-gray-500">English Literature Analysis is now overdue</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map(student => (
                <div key={student.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                  <Avatar name={student.name} size="md" />
                  
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-800">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.email}</p>
                  </div>
                  
                  <button className="text-gray-400 hover:text-gray-500">
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" fullWidth>
              View All Students
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingAssignments.slice(0, 5).map(assignment => {
                const dueDate = new Date(assignment.dueDate);
                
                return (
                  <div key={assignment.id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">{assignment.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{assignment.subject}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-gray-800">
                          {dueDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {dueDate.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" fullWidth>
              Manage All Assignments
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button fullWidth>
                Add Assignment
              </Button>
              <Button variant="secondary" fullWidth>
                Add Student
              </Button>
              <Button variant="outline" fullWidth>
                Create Report
              </Button>
              <Button variant="outline" fullWidth>
                Send Notification
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="bg-blue-50 rounded-md p-4 w-full">
              <h3 className="text-sm font-medium text-blue-800 mb-1">Need help?</h3>
              <p className="text-xs text-blue-600">
                Check out the admin guide or contact technical support for assistance.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;