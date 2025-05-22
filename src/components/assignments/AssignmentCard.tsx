import React from 'react';
import { Calendar, Clock, FileText } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import { Assignment } from '../../types';

interface AssignmentCardProps {
  assignment: Assignment;
  onViewDetails?: (id: string) => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ 
  assignment,
  onViewDetails
}) => {
  const { id, title, description, dueDate, subject, status } = assignment;
  
  const formattedDueDate = new Date(dueDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  
  const daysLeft = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const statusProps = {
    pending: { variant: 'warning', label: 'Pending' },
    completed: { variant: 'success', label: 'Completed' },
    late: { variant: 'danger', label: 'Late' },
  }[status] as { variant: 'success' | 'warning' | 'danger'; label: string };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="primary" className="mb-2">{subject}</Badge>
          <Badge variant={statusProps.variant}>{statusProps.label}</Badge>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-1">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formattedDueDate}</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="h-4 w-4 mr-2" />
          <span>
            {status === 'late' 
              ? 'Past due' 
              : status === 'completed' 
                ? 'Completed' 
                : daysLeft <= 0 
                  ? 'Due today' 
                  : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end bg-white">
        <button 
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          onClick={() => onViewDetails && onViewDetails(id)}
        >
          <FileText className="h-4 w-4 mr-1" />
          View Details
        </button>
      </CardFooter>
    </Card>
  );
};

export default AssignmentCard;