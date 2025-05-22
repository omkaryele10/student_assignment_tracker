export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          role: 'student' | 'parent' | 'admin'
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          role: 'student' | 'parent' | 'admin'
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: 'student' | 'parent' | 'admin'
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assignments: {
        Row: {
          id: string
          title: string
          description: string | null
          due_date: string
          subject: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          due_date: string
          subject: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          due_date?: string
          subject?: string
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      student_assignments: {
        Row: {
          id: string
          student_id: string
          assignment_id: string
          status: 'pending' | 'completed' | 'late'
          progress: number
          feedback: string | null
          grade: string | null
          submitted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          assignment_id: string
          status: 'pending' | 'completed' | 'late'
          progress?: number
          feedback?: string | null
          grade?: string | null
          submitted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          assignment_id?: string
          status?: 'pending' | 'completed' | 'late'
          progress?: number
          feedback?: string | null
          grade?: string | null
          submitted_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}