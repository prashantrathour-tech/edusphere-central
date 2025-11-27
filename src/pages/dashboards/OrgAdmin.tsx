import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BookOpen, 
  Settings, 
  BarChart3,
  UserPlus,
  GraduationCap,
  Calendar,
  FileText
} from 'lucide-react';

const OrgAdmin = () => {
  const navItems = [
    { label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" />, path: '/org-admin' },
    { label: 'Users', icon: <Users className="h-5 w-5" />, path: '/org-admin/users' },
    { label: 'Classes', icon: <BookOpen className="h-5 w-5" />, path: '/org-admin/classes' },
    { label: 'Academic', icon: <GraduationCap className="h-5 w-5" />, path: '/org-admin/academic' },
    { label: 'Reports', icon: <FileText className="h-5 w-5" />, path: '/org-admin/reports' },
    { label: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/org-admin/settings' },
  ];

  const stats = [
    { title: 'Total Students', value: '2,341', icon: <Users className="h-5 w-5" /> },
    { title: 'Active Teachers', value: '124', icon: <GraduationCap className="h-5 w-5" /> },
    { title: 'Total Classes', value: '86', icon: <BookOpen className="h-5 w-5" /> },
    { title: 'Pending Tasks', value: '12', icon: <Calendar className="h-5 w-5" /> },
  ];

  const recentActivities = [
    { action: 'New student enrolled', user: 'John Doe', time: '2 hours ago', type: 'student' },
    { action: 'Class created', user: 'Prof. Smith', time: '4 hours ago', type: 'class' },
    { action: 'Assignment submitted', user: 'Jane Wilson', time: '6 hours ago', type: 'assignment' },
    { action: 'Teacher added', user: 'Dr. Brown', time: '1 day ago', type: 'teacher' },
  ];

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Organization Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your institution's operations and users
            </p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
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
          {/* Recent Activities */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest actions in your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-border p-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Users className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start gap-2 h-auto py-4">
                  <UserPlus className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Add New User</p>
                    <p className="text-xs text-muted-foreground">Create student or staff account</p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start gap-2 h-auto py-4">
                  <BookOpen className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Create Class</p>
                    <p className="text-xs text-muted-foreground">Set up a new class or course</p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start gap-2 h-auto py-4">
                  <FileText className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Generate Report</p>
                    <p className="text-xs text-muted-foreground">View analytics and insights</p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start gap-2 h-auto py-4">
                  <Calendar className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Academic Calendar</p>
                    <p className="text-xs text-muted-foreground">Manage important dates</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrgAdmin;
