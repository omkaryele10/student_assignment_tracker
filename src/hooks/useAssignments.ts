import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Assignment = Database['public']['Tables']['assignments']['Row'];
type StudentAssignment = Database['public']['Tables']['student_assignments']['Row'];

export function useAssignments(studentId?: string) {
  const [assignments, setAssignments] = useState<(Assignment & { student_assignment?: StudentAssignment })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        let query = supabase
          .from('assignments')
          .select(`
            *,
            student_assignment:student_assignments(*)
          `);

        if (studentId) {
          query = query.eq('student_assignments.student_id', studentId);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setAssignments(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();

    // Subscribe to changes
    const subscription = supabase
      .channel('assignments_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public',
        table: 'assignments'
      }, fetchAssignments)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [studentId]);

  const createAssignment = async (assignmentData: Omit<Assignment, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('assignments')
        .insert(assignmentData)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const updateAssignment = async (id: string, updates: Partial<Assignment>) => {
    try {
      const { data, error } = await supabase
        .from('assignments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const updateStudentAssignment = async (
    assignmentId: string,
    studentId: string,
    updates: Partial<StudentAssignment>
  ) => {
    try {
      const { data, error } = await supabase
        .from('student_assignments')
        .update(updates)
        .eq('assignment_id', assignmentId)
        .eq('student_id', studentId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  return {
    assignments,
    loading,
    error,
    createAssignment,
    updateAssignment,
    updateStudentAssignment,
  };
}