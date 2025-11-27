import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  ClipboardList, 
  BarChart3,
  Calendar,
  Award,
  Clock,
  CheckCircle
} from 'lucide-react';

const Student = () => {
  const navItems = [
    { label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" />, path: '/student' },
    { label: 'My Classes', icon: <BookOpen className="h-5 w-5" />, path: '/student/classes' },
    { label: 'Assignments', icon: <ClipboardList className="h-5 w-5" />, path: '/student/assignments' },
    { label: 'Grades', icon: <Award className="h-5 w-5" />, path: '/student/grades' },
    { label: 'Attendance', icon: <CheckCircle className="h-5 w-5" />, path: '/student/attendance' },
    { label: 'Schedule', icon: <Calendar className="h-5 w-5" />, path: '/student/schedule' },
  ];

  const stats = [
    { title: 'Overall Grade', value: '85%', icon: <Award className="h-5 w-5" />, color: 'text-primary' },
    { title: 'Attendance', value: '92%', icon: <CheckCircle className="h-5 w-5" />, color: 'text-primary' },
    { title: 'Pending Tasks', value: '4', icon: <ClipboardList className="h-5 w-5" />, color: 'text-muted' },
    { title: 'Classes Today', value: '3', icon: <BookOpen className="h-5 w-5" />, color: 'text-muted' },
  ];

  const upcomingAssignments = [
    { title: 'Linear Algebra Problem Set', subject: 'Mathematics', due: '2 days', priority: 'high' },
    { title: 'Newton\'s Laws Lab Report', subject: 'Physics', due: '5 days', priority: 'medium' },
    { title: 'English Essay on Shakespeare', subject: 'Literature', due: '1 week', priority: 'low' },
  ];

  const courseProgress = [
    { name: 'Advanced Mathematics', progress: 75, grade: 'A' },
    { name: 'Physics 101', progress: 82, grade: 'A' },
    { name: 'Data Structures', progress: 68, grade: 'B+' },
    { name: 'English Literature', progress: 90, grade: 'A+' },
  ];

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Track your academic progress and assignments
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Assignments */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>Deadlines approaching soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAssignments.map((assignment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{assignment.title}</h4>
                        <Badge
                          variant={
                            assignment.priority === 'high'
                              ? 'destructive'
                              : assignment.priority === 'medium'
                              ? 'secondary'
                              : 'default'
                          }
                        >
                          {assignment.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Due in {assignment.due}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Progress */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>Your performance in each course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courseProgress.map((course, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-sm">{course.name}</h4>
                        <p className="text-xs text-muted-foreground">Current Grade: {course.grade}</p>
                      </div>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Student;
