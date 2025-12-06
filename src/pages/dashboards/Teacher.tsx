import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  ClipboardList, 
  BarChart3,
  Calendar,
  Plus,
  CheckCircle,
  Clock
} from 'lucide-react';

const Teacher = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" />, path: '/teacher' },
    { label: 'My Classes', icon: <BookOpen className="h-5 w-5" />, path: '/teacher/classes' },
    { label: 'Students', icon: <Users className="h-5 w-5" />, path: '/teacher/students' },
    { label: 'Assignments', icon: <ClipboardList className="h-5 w-5" />, path: '/teacher/assignments' },
    { label: 'Attendance', icon: <CheckCircle className="h-5 w-5" />, path: '/teacher/attendance' },
    { label: 'Analytics', icon: <BarChart3 className="h-5 w-5" />, path: '/teacher/analytics' },
    { label: 'Schedule', icon: <Calendar className="h-5 w-5" />, path: '/teacher/schedule' },
  ];

  const classes = [
    { name: 'Advanced Mathematics', students: 32, subject: 'Mathematics', time: '09:00 AM' },
    { name: 'Physics 101', students: 28, subject: 'Physics', time: '11:00 AM' },
    { name: 'Data Structures', students: 24, subject: 'Computer Science', time: '02:00 PM' },
  ];

  const assignments = [
    { title: 'Linear Algebra Problem Set', class: 'Advanced Mathematics', due: '2 days', submitted: 28, total: 32, status: 'pending' },
    { title: 'Newton\'s Laws Lab Report', class: 'Physics 101', due: '5 days', submitted: 15, total: 28, status: 'active' },
    { title: 'Binary Tree Implementation', class: 'Data Structures', due: 'Overdue', submitted: 20, total: 24, status: 'overdue' },
  ];

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your classes, students, and assignments
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Assignment
          </Button>
        </div>

        {/* Today's Classes */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today's Classes</CardTitle>
                <CardDescription>Your schedule for today</CardDescription>
              </div>
              <Badge variant="secondary">{classes.length} classes</Badge>
            </div>
          </CardHeader>
          <CardContent>
          <div className="space-y-4">
            {classes.map((classItem, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-border p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => navigate('/teacher/classes')}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{classItem.name}</h4>
                    <p className="text-sm text-muted-foreground">{classItem.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{classItem.students} students</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {classItem.time}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    navigate('/teacher/classes');
                  }}>
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
          </CardContent>
        </Card>

        {/* Assignments Overview */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Assignments</CardTitle>
                <CardDescription>Track student submissions</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{assignment.title}</h4>
                      <Badge
                        variant={
                          assignment.status === 'overdue'
                            ? 'destructive'
                            : assignment.status === 'pending'
                            ? 'secondary'
                            : 'default'
                        }
                      >
                        {assignment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{assignment.class}</p>
                    <div className="mt-2 flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        Due: <span className="font-medium">{assignment.due}</span>
                      </span>
                      <span className="text-muted-foreground">
                        Submitted: <span className="font-medium">{assignment.submitted}/{assignment.total}</span>
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Grade</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Teacher;
