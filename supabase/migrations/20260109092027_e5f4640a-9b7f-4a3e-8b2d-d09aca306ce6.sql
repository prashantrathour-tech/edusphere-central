-- Create classes table
CREATE TABLE public.classes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  academic_year TEXT NOT NULL DEFAULT '2024-2025',
  grade_level TEXT,
  room_number TEXT,
  schedule JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create class enrollments table (links students to classes)
CREATE TABLE public.class_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'dropped', 'completed')),
  UNIQUE(class_id, student_id)
);

-- Create parent-student links table
CREATE TABLE public.parent_student_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  relationship TEXT NOT NULL DEFAULT 'parent',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(parent_id, student_id)
);

-- Create assignments table
CREATE TABLE public.assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'homework' CHECK (type IN ('homework', 'quiz', 'test', 'project', 'exam')),
  max_score NUMERIC NOT NULL DEFAULT 100,
  due_date TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_by UUID NOT NULL REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create grades table
CREATE TABLE public.grades (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  score NUMERIC,
  feedback TEXT,
  graded_by UUID REFERENCES public.profiles(id),
  graded_at TIMESTAMP WITH TIME ZONE,
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(assignment_id, student_id)
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'excused')),
  notes TEXT,
  recorded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(class_id, student_id, date)
);

-- Enable RLS on all tables
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_student_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is a teacher for a class
CREATE OR REPLACE FUNCTION public.is_class_teacher(_user_id UUID, _class_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.classes c
    JOIN public.profiles p ON c.teacher_id = p.id
    WHERE c.id = _class_id AND p.user_id = _user_id
  )
$$;

-- Helper function to check if user is enrolled in a class
CREATE OR REPLACE FUNCTION public.is_enrolled_student(_user_id UUID, _class_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.class_enrollments ce
    JOIN public.profiles p ON ce.student_id = p.id
    WHERE ce.class_id = _class_id AND p.user_id = _user_id AND ce.status = 'active'
  )
$$;

-- Helper function to check if user is parent of student
CREATE OR REPLACE FUNCTION public.is_parent_of(_user_id UUID, _student_profile_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.parent_student_links psl
    JOIN public.profiles p ON psl.parent_id = p.id
    WHERE psl.student_id = _student_profile_id AND p.user_id = _user_id
  )
$$;

-- Classes policies
CREATE POLICY "Teachers can manage their own classes" ON public.classes
  FOR ALL USING (
    teacher_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Students can view enrolled classes" ON public.classes
  FOR SELECT USING (
    public.is_enrolled_student(auth.uid(), id)
  );

CREATE POLICY "Parents can view children's classes" ON public.classes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.class_enrollments ce
      WHERE ce.class_id = id AND public.is_parent_of(auth.uid(), ce.student_id)
    )
  );

CREATE POLICY "Admins can manage all classes" ON public.classes
  FOR ALL USING (
    public.has_role(auth.uid(), 'org_admin') OR public.has_role(auth.uid(), 'system_owner')
  );

-- Class enrollments policies
CREATE POLICY "Teachers can manage enrollments for their classes" ON public.class_enrollments
  FOR ALL USING (
    public.is_class_teacher(auth.uid(), class_id)
  );

CREATE POLICY "Students can view their enrollments" ON public.class_enrollments
  FOR SELECT USING (
    student_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Parents can view children's enrollments" ON public.class_enrollments
  FOR SELECT USING (
    public.is_parent_of(auth.uid(), student_id)
  );

CREATE POLICY "Admins can manage all enrollments" ON public.class_enrollments
  FOR ALL USING (
    public.has_role(auth.uid(), 'org_admin') OR public.has_role(auth.uid(), 'system_owner')
  );

-- Parent-student links policies
CREATE POLICY "Parents can view their own links" ON public.parent_student_links
  FOR SELECT USING (
    parent_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Students can view their parent links" ON public.parent_student_links
  FOR SELECT USING (
    student_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage parent-student links" ON public.parent_student_links
  FOR ALL USING (
    public.has_role(auth.uid(), 'org_admin') OR public.has_role(auth.uid(), 'system_owner')
  );

-- Assignments policies
CREATE POLICY "Teachers can manage assignments for their classes" ON public.assignments
  FOR ALL USING (
    public.is_class_teacher(auth.uid(), class_id)
  );

CREATE POLICY "Students can view published assignments" ON public.assignments
  FOR SELECT USING (
    public.is_enrolled_student(auth.uid(), class_id) AND published_at IS NOT NULL
  );

CREATE POLICY "Parents can view children's assignments" ON public.assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.class_enrollments ce
      WHERE ce.class_id = class_id 
        AND public.is_parent_of(auth.uid(), ce.student_id)
    ) AND published_at IS NOT NULL
  );

CREATE POLICY "Admins can manage all assignments" ON public.assignments
  FOR ALL USING (
    public.has_role(auth.uid(), 'org_admin') OR public.has_role(auth.uid(), 'system_owner')
  );

-- Grades policies
CREATE POLICY "Teachers can manage grades for their class assignments" ON public.grades
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.assignments a
      WHERE a.id = assignment_id AND public.is_class_teacher(auth.uid(), a.class_id)
    )
  );

CREATE POLICY "Students can view their own grades" ON public.grades
  FOR SELECT USING (
    student_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Parents can view children's grades" ON public.grades
  FOR SELECT USING (
    public.is_parent_of(auth.uid(), student_id)
  );

CREATE POLICY "Admins can manage all grades" ON public.grades
  FOR ALL USING (
    public.has_role(auth.uid(), 'org_admin') OR public.has_role(auth.uid(), 'system_owner')
  );

-- Attendance policies
CREATE POLICY "Teachers can manage attendance for their classes" ON public.attendance
  FOR ALL USING (
    public.is_class_teacher(auth.uid(), class_id)
  );

CREATE POLICY "Students can view their own attendance" ON public.attendance
  FOR SELECT USING (
    student_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Parents can view children's attendance" ON public.attendance
  FOR SELECT USING (
    public.is_parent_of(auth.uid(), student_id)
  );

CREATE POLICY "Admins can manage all attendance" ON public.attendance
  FOR ALL USING (
    public.has_role(auth.uid(), 'org_admin') OR public.has_role(auth.uid(), 'system_owner')
  );

-- Add updated_at triggers
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON public.assignments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON public.grades
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_attendance_updated_at BEFORE UPDATE ON public.attendance
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();