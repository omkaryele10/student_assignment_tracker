import React from 'react';
import { X, Calendar, Clock, FileText, User } from 'lucide-react';
import { Assignment, StudentAssignment } from '../../types';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface AssignmentModalProps {
  assignment: Assignment | StudentAssignment;
  onClose: () => void;
}

const AssignmentModal: React.FC<AssignmentModalProps> = ({ assignment, onClose }) => {
  const { title, description, dueDate, subject, status, createdAt } = assignment;
  
  // Check if it's a student assignment with progress
  const isStudentAssignment = 'progress' in assignment;
  const studentAssignment = isStudentAssignment ? assignment as StudentAssignment : null;
  
  const formattedDueDate = new Date(dueDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const formattedCreatedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const statusProps = {
    pending: { variant: 'warning', label: 'Pending' },
    completed: { variant: 'success', label: 'Completed' },
    late: { variant: 'danger', label: 'Late' },
  }[status] as { variant: 'success' | 'warning' | 'danger'; label: string };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Badge variant="primary">{subject}</Badge>
            <Badge variant={statusProps.variant}>{statusProps.label}</Badge>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
          
          <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
            <div className="flex-1 mb-4 md:mb-0">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{description}</p>
              </div>
              
              {isStudentAssignment && studentAssignment?.feedback && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-blue-700 mb-2">Feedback</h3>
                  <p className="text-blue-600">{studentAssignment.feedback}</p>
                </div>
              )}
            </div>
            
            <div className="md:w-64">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-3">Details</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Due Date</p>
                      <p className="text-sm text-gray-600">{formattedDueDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Created On</p>
                      <p className="text-sm text-gray-600">{formattedCreatedDate}</p>
                    </div>
                  </div>
                  
                  {isStudentAssignment && studentAssignment?.grade && (
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Grade</p>
                        <p className="text-sm text-gray-600">{studentAssignment.grade}</p>
                      </div>
                    </div>
                  )}
                  
                  {isStudentAssignment && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Progress</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${studentAssignment.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-right mt-1 text-gray-500">{studentAssignment.progress}% Complete</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
          {status === 'pending' && (
            <Button variant="primary">
              Mark as Complete
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;