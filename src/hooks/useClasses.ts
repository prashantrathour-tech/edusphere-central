import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Tables, TablesInsert } from '@/integrations/supabase/types';
import { toast } from 'sonner';

export type Class = Tables<'classes'>;
export type ClassInsert = TablesInsert<'classes'>;
export type ClassEnrollment = Tables<'class_enrollments'>;
export type Assignment = Tables<'assignments'>;
export type AssignmentInsert = TablesInsert<'assignments'>;

export const useClasses = () => {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all classes for the current teacher
  const { data: classes, isLoading: classesLoading, error: classesError } = useQuery({
    queryKey: ['classes', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('teacher_id', profile.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Class[];
    },
    enabled: !!profile?.id,
  });

  // Create a new class
  const createClass = useMutation({
    mutationFn: async (newClass: Omit<ClassInsert, 'teacher_id'>) => {
      if (!profile?.id) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('classes')
        .insert({
          ...newClass,
          teacher_id: profile.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      toast.success('Class created successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to create class: ' + error.message);
    },
  });

  // Update a class
  const updateClass = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Class> & { id: string }) => {
      const { data, error } = await supabase
        .from('classes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      toast.success('Class updated successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to update class: ' + error.message);
    },
  });

  // Delete a class
  const deleteClass = useMutation({
    mutationFn: async (classId: string) => {
      const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', classId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      toast.success('Class deleted successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to delete class: ' + error.message);
    },
  });

  return {
    classes: classes || [],
    classesLoading,
    classesError,
    createClass,
    updateClass,
    deleteClass,
  };
};

export const useClassDetails = (classId: string | null) => {
  const queryClient = useQueryClient();
  const { profile } = useAuth();

  // Fetch class details
  const { data: classDetails, isLoading: classLoading } = useQuery({
    queryKey: ['class', classId],
    queryFn: async () => {
      if (!classId) return null;
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('id', classId)
        .single();
      
      if (error) throw error;
      return data as Class;
    },
    enabled: !!classId,
  });

  // Fetch enrolled students with profile info
  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ['enrollments', classId],
    queryFn: async () => {
      if (!classId) return [];
      const { data, error } = await supabase
        .from('class_enrollments')
        .select(`
          *,
          profiles:student_id (
            id,
            full_name,
            email,
            avatar_url
          )
        `)
        .eq('class_id', classId)
        .eq('status', 'active');
      
      if (error) throw error;
      return data;
    },
    enabled: !!classId,
  });

  // Fetch assignments for the class
  const { data: assignments, isLoading: assignmentsLoading } = useQuery({
    queryKey: ['assignments', classId],
    queryFn: async () => {
      if (!classId) return [];
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('class_id', classId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Assignment[];
    },
    enabled: !!classId,
  });

  // Enroll a student
  const enrollStudent = useMutation({
    mutationFn: async (studentId: string) => {
      if (!classId) throw new Error('No class selected');
      
      const { data, error } = await supabase
        .from('class_enrollments')
        .insert({
          class_id: classId,
          student_id: studentId,
          status: 'active',
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments', classId] });
      toast.success('Student enrolled successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to enroll student: ' + error.message);
    },
  });

  // Unenroll a student
  const unenrollStudent = useMutation({
    mutationFn: async (enrollmentId: string) => {
      const { error } = await supabase
        .from('class_enrollments')
        .update({ status: 'dropped' })
        .eq('id', enrollmentId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments', classId] });
      toast.success('Student removed from class');
    },
    onError: (error: Error) => {
      toast.error('Failed to remove student: ' + error.message);
    },
  });

  // Create an assignment
  const createAssignment = useMutation({
    mutationFn: async (newAssignment: Omit<AssignmentInsert, 'class_id' | 'created_by'>) => {
      if (!classId || !profile?.id) throw new Error('Missing required data');
      
      const { data, error } = await supabase
        .from('assignments')
        .insert({
          ...newAssignment,
          class_id: classId,
          created_by: profile.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments', classId] });
      toast.success('Assignment created successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to create assignment: ' + error.message);
    },
  });

  // Delete an assignment
  const deleteAssignment = useMutation({
    mutationFn: async (assignmentId: string) => {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', assignmentId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments', classId] });
      toast.success('Assignment deleted');
    },
    onError: (error: Error) => {
      toast.error('Failed to delete assignment: ' + error.message);
    },
  });

  return {
    classDetails,
    classLoading,
    enrollments: enrollments || [],
    enrollmentsLoading,
    assignments: assignments || [],
    assignmentsLoading,
    enrollStudent,
    unenrollStudent,
    createAssignment,
    deleteAssignment,
  };
};

// Fetch available students (students with no enrollment in this class)
export const useAvailableStudents = (classId: string | null) => {
  return useQuery({
    queryKey: ['available-students', classId],
    queryFn: async () => {
      if (!classId) return [];
      
      // Get all students (profiles with student role)
      const { data: allStudents, error: studentsError } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          email,
          avatar_url,
          user_roles!inner (role)
        `)
        .eq('user_roles.role', 'student');
      
      if (studentsError) throw studentsError;

      // Get enrolled students for this class
      const { data: enrolled, error: enrolledError } = await supabase
        .from('class_enrollments')
        .select('student_id')
        .eq('class_id', classId)
        .eq('status', 'active');
      
      if (enrolledError) throw enrolledError;

      const enrolledIds = new Set(enrolled.map(e => e.student_id));
      
      // Filter out already enrolled students
      return (allStudents || []).filter(s => !enrolledIds.has(s.id));
    },
    enabled: !!classId,
  });
};
