import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import PerformanceChart from '@/components/analytics/PerformanceChart';
import AttendanceChart from '@/components/analytics/AttendanceChart';
import ComparisonChart from '@/components/analytics/ComparisonChart';
import GradeDistributionChart from '@/components/analytics/GradeDistributionChart';
import StatCard from '@/components/analytics/StatCard';
import { 
  BookOpen, 
  Users, 
  ClipboardList, 
  BarChart3,
  Calendar,
  CheckCircle,
  TrendingUp,
  GraduationCap,
  Download
} from 'lucide-react';

const TeacherAnalytics = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [timeRange, setTimeRange] = useState('semester');

  const navItems = [
    { label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" />, path: '/teacher' },
    { label: 'My Classes', icon: <BookOpen className="h-5 w-5" />, path: '/teacher/classes' },
    { label: 'Students', icon: <Users className="h-5 w-5" />, path: '/teacher/students' },
    { label: 'Assignments', icon: <ClipboardList className="h-5 w-5" />, path: '/teacher/assignments' },
    { label: 'Attendance', icon: <CheckCircle className="h-5 w-5" />, path: '/teacher/attendance' },
    { label: 'Analytics', icon: <TrendingUp className="h-5 w-5" />, path: '/teacher/analytics' },
    { label: 'Schedule', icon: <Calendar className="h-5 w-5" />, path: '/teacher/schedule' },
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
    { name: 'Mon', present: 28, absent: 3, late: 1 },
    { name: 'Tue', present: 30, absent: 1, late: 1 },
    { name: 'Wed', present: 27, absent: 4, late: 1 },
    { name: 'Thu', present: 29, absent: 2, late: 1 },
    { name: 'Fri', present: 26, absent: 5, late: 1 },
  ];

  const comparisonData = [
    { subject: 'Math', classA: 85, classB: 78, average: 80 },
    { subject: 'Physics', classA: 80, classB: 82, average: 75 },
    { subject: 'Chemistry', classA: 75, classB: 80, average: 72 },
    { subject: 'English', classA: 88, classB: 85, average: 82 },
    { subject: 'CS', classA: 90, classB: 88, average: 85 },
  ];

  const gradeDistribution = [
    { name: 'A', value: 15, color: 'hsl(var(--chart-2))' },
    { name: 'B', value: 25, color: 'hsl(var(--primary))' },
    { name: 'C', value: 35, color: 'hsl(var(--chart-4))' },
    { name: 'D', value: 18, color: 'hsl(var(--chart-5))' },
    { name: 'F', value: 7, color: 'hsl(var(--destructive))' },
  ];

  const topPerformers = [
    { name: 'Emma Wilson', grade: 'A+', score: 98, trend: 5 },
    { name: 'James Chen', grade: 'A+', score: 97, trend: 3 },
    { name: 'Sarah Johnson', grade: 'A', score: 95, trend: -1 },
    { name: 'Michael Brown', grade: 'A', score: 94, trend: 2 },
    { name: 'Emily Davis', grade: 'A', score: 93, trend: 4 },
  ];

  const needsAttention = [
    { name: 'John Smith', grade: 'D', score: 62, issue: 'Low attendance' },
    { name: 'Lisa Wang', grade: 'D-', score: 58, issue: 'Missing assignments' },
    { name: 'Tom Miller', grade: 'F', score: 45, issue: 'Declining grades' },
  ];

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track student performance and attendance patterns
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="math">Advanced Mathematics</SelectItem>
                <SelectItem value="physics">Physics 101</SelectItem>
                <SelectItem value="cs">Data Structures</SelectItem>
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
              Export
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Average Score" 
            value="78.5%" 
            change={3.2} 
            changeLabel="vs last month"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <StatCard 
            title="Attendance Rate" 
            value="92.4%" 
            change={1.5} 
            changeLabel="vs last month"
            icon={<CheckCircle className="h-5 w-5" />}
          />
          <StatCard 
            title="Total Students" 
            value="84" 
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard 
            title="Passing Rate" 
            value="87.5%" 
            change={-2.1} 
            changeLabel="vs last month"
            icon={<GraduationCap className="h-5 w-5" />}
          />
        </div>

        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <PerformanceChart 
                title="Grade Trends Over Time" 
                description="Average, highest, and lowest scores by month"
                data={performanceData}
              />
              <GradeDistributionChart 
                title="Grade Distribution" 
                description="Current grade breakdown across all students"
                data={gradeDistribution}
              />
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <AttendanceChart 
              title="Weekly Attendance Pattern" 
              description="Attendance breakdown by day of week"
              data={attendanceData}
            />
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <ComparisonChart 
              title="Class Performance Comparison" 
              description="Compare performance across different subjects"
              data={comparisonData}
            />
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Top Performers
                  </CardTitle>
                  <CardDescription>Students with highest grades</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((student, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">Score: {student.score}%</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-green-500">{student.grade}</span>
                          <p className={`text-xs ${student.trend > 0 ? 'text-green-500' : 'text-destructive'}`}>
                            {student.trend > 0 ? '+' : ''}{student.trend}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <Users className="h-5 w-5" />
                    Needs Attention
                  </CardTitle>
                  <CardDescription>Students requiring additional support</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {needsAttention.map((student, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.issue}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-destructive">{student.grade}</span>
                          <p className="text-xs text-muted-foreground">Score: {student.score}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TeacherAnalytics;
