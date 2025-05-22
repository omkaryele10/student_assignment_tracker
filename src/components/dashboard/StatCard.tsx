import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    positive?: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title,
  value,
  icon: Icon,
  change,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
            
            {change && (
              <div className="flex items-center mt-2">
                <span className={`text-xs font-medium ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {change.positive ? '+' : ''}{change.value}%
                </span>
                <span className="text-xs text-gray-500 ml-1">from last period</span>
              </div>
            )}
          </div>
          
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;