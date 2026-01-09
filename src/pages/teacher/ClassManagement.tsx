import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  BookOpen, 
  Users, 
  ClipboardList, 
  BarChart3,
  Calendar,
  Search,
  Plus,
  CheckCircle,
  Trash2,
  Clock,
  FileText,
  ArrowLeft
} from 'lucide-react';
import { useClasses, useClassDetails } from '@/hooks/useClasses';
import { CreateClassDialog } from '@/components/teacher/CreateClassDialog';
import { EnrollStudentDialog } from '@/components/teacher/EnrollStudentDialog';
import { CreateAssignmentDialog } from '@/components/teacher/CreateAssignmentDialog';
import { format } from 'date-fns';

const ClassManagement = () => {
  const navigate = useNavigate();
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { classes, classesLoading, deleteClass } = useClasses();
  const { 
    classDetails, 
    classLoading, 
    enrollments, 
    enrollmentsLoading, 
    assignments, 
    assignmentsLoading,
    unenrollStudent,
    deleteAssignment 
  } = useClassDetails(selectedClassId);

  const navItems = [
    { label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" />, path: '/teacher' },
    { label: 'My Classes', icon: <BookOpen className="h-5 w-5" />, path: '/teacher/classes' },
    { label: 'Students', icon: <Users className="h-5 w-5" />, path: '/teacher/students' },
    { label: 'Assignments', icon: <ClipboardList className="h-5 w-5" />, path: '/teacher/assignments' },
    { label: 'Attendance', icon: <CheckCircle className="h-5 w-5" />, path: '/teacher/attendance' },
    { label: 'Analytics', icon: <BarChart3 className="h-5 w-5" />, path: '/teacher/analytics' },
    { label: 'Schedule', icon: <Calendar className="h-5 w-5" />, path: '/teacher/schedule' },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredEnrollments = enrollments.filter((enrollment: any) =>
    enrollment.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enrollment.profiles?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Class list view
  if (!selectedClassId) {
    return (
      <DashboardLayout navItems={navItems}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Classes</h1>
              <p className="text-muted-foreground">
                Manage your classes, students, and assignments
              </p>
            </div>
            <CreateClassDialog />
          </div>

          {classesLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-border">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : classes.length === 0 ? (
            <Card className="border-border border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No classes yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Create your first class to start managing students and assignments.
                </p>
                <CreateClassDialog />
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((classItem) => (
                <Card
                  key={classItem.id}
                  className="border-border cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => setSelectedClassId(classItem.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{classItem.name}</CardTitle>
                        <CardDescription>{classItem.subject}</CardDescription>
                      </div>
                      <Badge variant="secondary">{classItem.academic_year}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      {classItem.grade_level && (
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {classItem.grade_level}
                        </span>
                      )}
                      {classItem.room_number && (
                        <span>{classItem.room_number}</span>
                      )}
                    </div>
                    {classItem.description && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {classItem.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  // Class detail view
  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6">
        {/* Class Header */}
        <div className="flex items-start justify-between">
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="mb-2 -ml-2"
              onClick={() => setSelectedClassId(null)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Classes
            </Button>
            {classLoading ? (
              <Skeleton className="h-8 w-64 mb-2" />
            ) : (
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{classDetails?.name}</h1>
                <Badge variant="secondary">{classDetails?.academic_year}</Badge>
              </div>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>{classDetails?.subject}</span>
              {classDetails?.grade_level && (
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {classDetails.grade_level}
                </span>
              )}
              {classDetails?.room_number && (
                <span>{classDetails.room_number}</span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => {
                deleteClass.mutate(selectedClassId);
                setSelectedClassId(null);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Class
            </Button>
          </div>
        </div>

        <Tabs defaultValue="students" className="space-y-4">
          <TabsList>
            <TabsTrigger value="students">
              Students ({enrollments.length})
            </TabsTrigger>
            <TabsTrigger value="assignments">
              Assignments ({assignments.length})
            </TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Enrolled Students</CardTitle>
                    <CardDescription>
                      Manage students in this class
                    </CardDescription>
                  </div>
                  <EnrollStudentDialog classId={selectedClassId} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {enrollmentsLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-32 mb-2" />
                            <Skeleton className="h-3 w-48" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filteredEnrollments.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      {searchQuery ? 'No students found' : 'No students enrolled yet'}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredEnrollments.map((enrollment: any) => (
                        <div
                          key={enrollment.id}
                          className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={enrollment.profiles?.avatar_url} />
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {getInitials(enrollment.profiles?.full_name || 'U')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">{enrollment.profiles?.full_name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {enrollment.profiles?.email}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Enrolled: {format(new Date(enrollment.enrolled_at), 'MMM d, yyyy')}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => unenrollStudent.mutate(enrollment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Class Assignments</CardTitle>
                    <CardDescription>
                      Create and manage assignments
                    </CardDescription>
                  </div>
                  <CreateAssignmentDialog classId={selectedClassId} />
                </div>
              </CardHeader>
              <CardContent>
                {assignmentsLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 rounded-lg border border-border">
                        <Skeleton className="h-5 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </div>
                ) : assignments.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No assignments yet</p>
                    <p className="text-sm text-muted-foreground">
                      Create your first assignment for this class
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="flex items-center justify-between rounded-lg border border-border p-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{assignment.title}</h4>
                            <Badge variant="outline" className="capitalize">
                              {assignment.type}
                            </Badge>
                          </div>
                          {assignment.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {assignment.description}
                            </p>
                          )}
                          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Max Score: {assignment.max_score}</span>
                            {assignment.due_date && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Due: {format(new Date(assignment.due_date), 'MMM d, yyyy h:mm a')}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => deleteAssignment.mutate(assignment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClassManagement;
