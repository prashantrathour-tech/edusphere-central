import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import PerformanceChart from '@/components/analytics/PerformanceChart';
import AttendanceChart from '@/components/analytics/AttendanceChart';
import ComparisonChart from '@/components/analytics/ComparisonChart';
import GradeDistributionChart from '@/components/analytics/GradeDistributionChart';
import StatCard from '@/components/analytics/StatCard';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { 
  Users, 
  BookOpen, 
  Settings, 
  BarChart3,
  GraduationCap,
  Calendar,
  FileText,
  TrendingUp,
  CheckCircle,
  DollarSign,
  Download,
  Building2
} from 'lucide-react';

const AdminAnalytics = () => {
  const [department, setDepartment] = useState('all');
  const [timeRange, setTimeRange] = useState('semester');

  const navItems = [
    { label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" />, path: '/org-admin' },
    { label: 'Users', icon: <Users className="h-5 w-5" />, path: '/org-admin/users' },
    { label: 'Classes', icon: <BookOpen className="h-5 w-5" />, path: '/org-admin/classes' },
    { label: 'Academic', icon: <GraduationCap className="h-5 w-5" />, path: '/org-admin/academic' },
    { label: 'Analytics', icon: <TrendingUp className="h-5 w-5" />, path: '/org-admin/analytics' },
    { label: 'Reports', icon: <FileText className="h-5 w-5" />, path: '/org-admin/reports' },
    { label: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/org-admin/settings' },
  ];

  const enrollmentData = [
    { month: 'Jan', students: 2100, teachers: 115 },
    { month: 'Feb', students: 2150, teachers: 118 },
    { month: 'Mar', students: 2200, teachers: 120 },
    { month: 'Apr', students: 2250, teachers: 121 },
    { month: 'May', students: 2280, teachers: 122 },
    { month: 'Jun', students: 2341, teachers: 124 },
  ];

  const performanceData = [
    { month: 'Aug', average: 72, highest: 95, lowest: 45 },
    { month: 'Sep', average: 75, highest: 98, lowest: 48 },
    { month: 'Oct', average: 78, highest: 96, lowest: 52 },
    { month: 'Nov', average: 76, highest: 99, lowest: 50 },
    { month: 'Dec', average: 82, highest: 100, lowest: 55 },
    { month: 'Jan', average: 80, highest: 97, lowest: 58 },
  ];

  const attendanceData = [
    { name: 'Week 1', present: 2200, absent: 100, late: 41 },
    { name: 'Week 2', present: 2180, absent: 120, late: 41 },
    { name: 'Week 3', present: 2250, absent: 60, late: 31 },
    { name: 'Week 4', present: 2220, absent: 90, late: 31 },
  ];

  const departmentComparison = [
    { subject: 'Attendance', classA: 92, classB: 88, average: 90 },
    { subject: 'Grades', classA: 78, classB: 82, average: 75 },
    { subject: 'Assignments', classA: 85, classB: 80, average: 78 },
    { subject: 'Participation', classA: 75, classB: 70, average: 68 },
    { subject: 'Satisfaction', classA: 88, classB: 85, average: 80 },
  ];

  const gradeDistribution = [
    { name: 'A', value: 420, color: 'hsl(var(--chart-2))' },
    { name: 'B', value: 680, color: 'hsl(var(--primary))' },
    { name: 'C', value: 750, color: 'hsl(var(--chart-4))' },
    { name: 'D', value: 350, color: 'hsl(var(--chart-5))' },
    { name: 'F', value: 141, color: 'hsl(var(--destructive))' },
  ];

  const departmentStats = [
    { name: 'Computer Science', students: 420, teachers: 28, avgGrade: 82, attendance: 94 },
    { name: 'Mathematics', students: 380, teachers: 22, avgGrade: 78, attendance: 91 },
    { name: 'Physics', students: 310, teachers: 18, avgGrade: 75, attendance: 89 },
    { name: 'English', students: 450, teachers: 24, avgGrade: 80, attendance: 92 },
    { name: 'Chemistry', students: 290, teachers: 16, avgGrade: 76, attendance: 88 },
    { name: 'Biology', students: 280, teachers: 16, avgGrade: 79, attendance: 90 },
  ];

  const enrollmentChartConfig = {
    students: { label: 'Students', color: 'hsl(var(--primary))' },
    teachers: { label: 'Teachers', color: 'hsl(var(--chart-2))' },
  };

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Organization Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive insights across all departments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="semester">This Semester</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Students" 
            value="2,341" 
            change={5.2} 
            changeLabel="vs last semester"
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard 
            title="Active Teachers" 
            value="124" 
            change={3.8} 
            changeLabel="vs last semester"
            icon={<GraduationCap className="h-5 w-5" />}
          />
          <StatCard 
            title="Avg Attendance" 
            value="91.2%" 
            change={2.1} 
            changeLabel="vs last month"
            icon={<CheckCircle className="h-5 w-5" />}
          />
          <StatCard 
            title="Fee Collection" 
            value="$1.2M" 
            change={8.5} 
            changeLabel="vs last semester"
            icon={<DollarSign className="h-5 w-5" />}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Enrollment Trends</CardTitle>
                  <CardDescription>Student and teacher growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={enrollmentChartConfig} className="h-[300px] w-full">
                    <AreaChart data={enrollmentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                      <YAxis className="text-xs fill-muted-foreground" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="students" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <GradeDistributionChart 
                title="Organization Grade Distribution" 
                description="Grade breakdown across all students"
                data={gradeDistribution}
              />
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <PerformanceChart 
                title="Academic Performance Trends" 
                description="Organization-wide grade averages"
                data={performanceData}
              />
              <ComparisonChart 
                title="Department Comparison" 
                description="Compare metrics across departments"
                data={departmentComparison}
              />
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <AttendanceChart 
              title="Organization Attendance Overview" 
              description="Weekly attendance patterns"
              data={attendanceData}
            />
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Department Performance
                </CardTitle>
                <CardDescription>Detailed breakdown by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {departmentStats.map((dept, index) => (
                    <div key={index} className="rounded-lg border border-border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">{dept.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {dept.students} students • {dept.teachers} teachers
                          </p>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-muted-foreground">Average Grade</span>
                            <span className="text-sm font-medium">{dept.avgGrade}%</span>
                          </div>
                          <Progress value={dept.avgGrade} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-muted-foreground">Attendance Rate</span>
                            <span className="text-sm font-medium">{dept.attendance}%</span>
                          </div>
                          <Progress value={dept.attendance} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;
