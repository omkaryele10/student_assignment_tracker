import React from 'react';
import { 
  CalendarClock, CheckCircle, Clock, FileWarning, 
  BookOpen, ArrowUpRight, BarChart4 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import StatCard from '../components/dashboard/StatCard';
import AssignmentList from '../components/assignments/AssignmentList';
import { studentAssignments } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Filter assignments for the current student
  const pendingAssignments = studentAssignments.filter(a => a.status === 'pending');
  const completedAssignments = studentAssignments.filter(a => a.status === 'completed');
  const lateAssignments = studentAssignments.filter(a => a.status === 'late');
  
  // Calculate stats
  const totalAssignments = studentAssignments.length;
  const completionRate = Math.round((completedAssignments.length / totalAssignments) * 100);
  
  // Calculate upcoming due dates
  const upcomingAssignments = pendingAssignments
    .filter(a => new Date(a.dueDate) > new Date())
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);
  
  // Get subjects
  const subjects = Array.from(new Set(studentAssignments.map(a => a.subject)));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {currentUser?.name}
        </h1>
        <p className="text-sm text-gray-500 mt-1 sm:mt-0">
          Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Assignments" 
          value={totalAssignments} 
          icon={BookOpen}
          color="blue"
        />
        <StatCard 
          title="Pending" 
          value={pendingAssignments.length} 
          icon={Clock}
          color="yellow"
        />
        <StatCard 
          title="Completed" 
          value={completedAssignments.length} 
          icon={CheckCircle}
          color="green"
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
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAssignments.length > 0 ? (
                  upcomingAssignments.map((assignment) => {
                    const dueDate = new Date(assignment.dueDate);
                    const today = new Date();
                    const diffTime = dueDate.getTime() - today.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    const formattedDueDate = dueDate.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    });
                    
                    return (
                      <div key={assignment.id} className="flex items-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                        <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600 mr-4">
                          <CalendarClock className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {assignment.title}
                            </p>
                            <span className="ml-2 flex-shrink-0">
                              <span className="inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 px-2 py-0.5">
                                {assignment.subject}
                              </span>
                            </span>
                          </div>
                          <div className="mt-1 flex justify-between">
                            <p className="text-xs text-gray-500">
                              Due {formattedDueDate}
                            </p>
                            <p className={`text-xs ${
                              diffDays <= 1 ? 'text-red-600' : diffDays <= 3 ? 'text-yellow-600' : 'text-gray-500'
                            }`}>
                              {diffDays === 0 
                                ? 'Due today!' 
                                : diffDays === 1 
                                  ? 'Due tomorrow!' 
                                  : `${diffDays} days left`}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No upcoming deadlines</p>
                  </div>
                )}
                
                {upcomingAssignments.length > 0 && (
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    View all assignments
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                  <span className="text-sm font-medium text-blue-600">{completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Subjects</h4>
                <div className="space-y-2">
                  {subjects.map((subject) => {
                    const subjectAssignments = studentAssignments.filter(a => a.subject === subject);
                    const completedSubjectAssignments = subjectAssignments.filter(a => a.status === 'completed');
                    const subjectCompletionRate = Math.round((completedSubjectAssignments.length / subjectAssignments.length) * 100);
                    
                    return (
                      <div key={subject}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-600">{subject}</span>
                          <span className="text-xs text-gray-600">{subjectCompletionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${subjectCompletionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-auto">
                <button className="flex items-center justify-center w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100">
                  <BarChart4 className="h-4 w-4 mr-2" />
                  View Detailed Progress
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <AssignmentList 
        assignments={pendingAssignments} 
        title="Pending Assignments" 
      />
    </div>
  );
};

export default StudentDashboard;