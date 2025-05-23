import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function useProfiles(role?: Profile['role']) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        let query = supabase
          .from('profiles')
          .select('*');

        if (role) {
          query = query.eq('role', role);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setProfiles(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();

    const subscription = supabase
      .channel('profiles_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public',
        table: 'profiles'
      }, fetchProfiles)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [role]);

  const createProfile = async (profileData: Omit<Profile, 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const updateProfile = async (id: string, updates: Partial<Profile>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
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

  return {
    profiles,
    loading,
    error,
    createProfile,
    updateProfile,
  };
}