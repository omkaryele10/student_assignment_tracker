import { Assignment, Notification, User } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@school.edu',
    role: 'admin',
  },
  {
    id: 'parent1',
    name: 'Parent One',
    email: 'parent1@example.com',
    role: 'parent',
    parentOf: ['student1', 'student2'],
  },
  {
    id: 'student1',
    name: 'Student One',
    email: 'student1@school.edu',
    role: 'student',
    parentId: 'parent1',
  },
  {
    id: 'student2',
    name: 'Student Two',
    email: 'student2@school.edu',
    role: 'student',
    parentId: 'parent1',
  },
];

// Mock Assignments
export const assignments: Assignment[] = [
  {
    id: 'assign1',
    title: 'Math Homework - Algebra Basics',
    description: 'Complete problems 1-20 in Chapter 3.',
    dueDate: '2025-05-15T23:59:59.999Z',
    subject: 'Mathematics',
    createdAt: '2025-05-01T10:00:00.000Z',
    createdBy: 'admin1',
    status: 'pending',
  },
  {
    id: 'assign2',
    title: 'Science Lab Report',
    description: 'Write a 3-page report on the photosynthesis experiment.',
    dueDate: '2025-05-18T23:59:59.999Z',
    subject: 'Science',
    createdAt: '2025-05-03T14:30:00.000Z',
    createdBy: 'admin1',
    status: 'pending',
  },
  {
    id: 'assign3',
    title: 'History Essay',
    description: 'Write a 5-page essay on World War II causes and effects.',
    dueDate: '2025-05-20T23:59:59.999Z',
    subject: 'History',
    createdAt: '2025-05-05T09:15:00.000Z',
    createdBy: 'admin1',
    status: 'pending',
  },
  {
    id: 'assign4',
    title: 'English Literature Analysis',
    description: 'Analyze the main themes in "To Kill a Mockingbird".',
    dueDate: '2025-05-12T23:59:59.999Z',
    subject: 'English',
    createdAt: '2025-04-28T11:45:00.000Z',
    createdBy: 'admin1',
    status: 'late',
  },
  {
    id: 'assign5',
    title: 'Geometry Problems',
    description: 'Solve the geometric problems in Worksheet 5.',
    dueDate: '2025-05-10T23:59:59.999Z',
    subject: 'Mathematics',
    createdAt: '2025-04-30T13:20:00.000Z',
    createdBy: 'admin1',
    status: 'completed',
  },
];

// Mock Student Assignments (with progress)
export const studentAssignments = assignments.map(assignment => ({
  ...assignment,
  progress: Math.floor(Math.random() * 100),
  submittedAt: assignment.status === 'completed' ? '2025-05-09T15:30:00.000Z' : undefined,
  feedback: assignment.status === 'completed' ? 'Good work! Clear understanding of concepts.' : undefined,
  grade: assignment.status === 'completed' ? 'A' : undefined,
}));

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'student1',
    message: 'Your Math Homework is due tomorrow!',
    type: 'warning',
    read: false,
    createdAt: '2025-05-14T09:00:00.000Z',
  },
  {
    id: 'notif2',
    userId: 'student1',
    message: 'Your English Literature assignment is now overdue.',
    type: 'error',
    read: true,
    createdAt: '2025-05-13T00:00:00.000Z',
  },
  {
    id: 'notif3',
    userId: 'parent1',
    message: 'Your child has an upcoming Math assignment due soon.',
    type: 'info',
    read: false,
    createdAt: '2025-05-13T10:30:00.000Z',
  },
  {
    id: 'notif4',
    userId: 'admin1',
    message: '5 assignments are due this week.',
    type: 'info',
    read: false,
    createdAt: '2025-05-12T08:15:00.000Z',
  },
];