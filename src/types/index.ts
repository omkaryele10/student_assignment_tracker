export type UserRole = 'student' | 'parent' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  parentOf?: string[]; // Array of student IDs (for parent role)
  parentId?: string; // Parent ID (for student role)
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  subject: string;
  createdAt: string;
  createdBy: string;
  status: 'pending' | 'completed' | 'late';
  attachments?: string[];
}

export interface StudentAssignment extends Assignment {
  progress: number; // 0-100
  submittedAt?: string;
  feedback?: string;
  grade?: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}