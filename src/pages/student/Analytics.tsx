import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, AreaChart, Area } from 'recharts';
import StatCard from '@/components/analytics/StatCard';
import { 
  BookOpen, 
  ClipboardList, 
  BarChart3,
  Calendar,
  Award,
  CheckCircle,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react';

const StudentAnalytics = () => {
  const [semester, setSemester] = useState('current');

  const navItems = [
    { label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" />, path: '/student' },
    { label: 'My Classes', icon: <BookOpen className="h-5 w-5" />, path: '/student/classes' },
    { label: 'Assignments', icon: <ClipboardList className="h-5 w-5" />, path: '/student/assignments' },
    { label: 'Grades', icon: <Award className="h-5 w-5" />, path: '/student/grades' },
    { label: 'Analytics', icon: <TrendingUp className="h-5 w-5" />, path: '/student/analytics' },
    { label: 'Attendance', icon: <CheckCircle className="h-5 w-5" />, path: '/student/attendance' },
    { label: 'Calendar', icon: <Calendar className="h-5 w-5" />, path: '/student/calendar' },
  ];

  // Performance over time data
  const performanceData = [
    { month: 'Aug', myScore: 78, classAvg: 72 },
    { month: 'Sep', myScore: 82, classAvg: 75 },
    { month: 'Oct', myScore: 85, classAvg: 78 },
    { month: 'Nov', myScore: 80, classAvg: 76 },
    { month: 'Dec', myScore: 88, classAvg: 82 },
    { month: 'Jan', myScore: 85, classAvg: 80 },
  ];

  // Subject-wise comparison
  const subjectComparison = [
    { subject: 'Math', myScore: 88, classAvg: 75 },
    { subject: 'Physics', myScore: 82, classAvg: 78 },
    { subject: 'CS', myScore: 92, classAvg: 80 },
    { subject: 'English', myScore: 85, classAvg: 82 },
    { subject: 'Chemistry', myScore: 78, classAvg: 74 },
  ];

  // Grade history data
  const gradeHistory = [
    { exam: 'Quiz 1', Mathematics: 85, Physics: 78, 'Computer Science': 92, English: 88 },
    { exam: 'Midterm', Mathematics: 82, Physics: 80, 'Computer Science': 88, English: 85 },
    { exam: 'Quiz 2', Mathematics: 90, Physics: 85, 'Computer Science': 95, English: 82 },
    { exam: 'Project', Mathematics: 88, Physics: 82, 'Computer Science': 98, English: 90 },
    { exam: 'Final', Mathematics: 88, Physics: 84, 'Computer Science': 92, English: 87 },
  ];

  // Attendance data
  const attendanceData = [
    { week: 'Week 1', present: 5, absent: 0, late: 0 },
    { week: 'Week 2', present: 4, absent: 1, late: 0 },
    { week: 'Week 3', present: 5, absent: 0, late: 0 },
    { week: 'Week 4', present: 4, absent: 0, late: 1 },
    { week: 'Week 5', present: 5, absent: 0, late: 0 },
    { week: 'Week 6', present: 5, absent: 0, late: 0 },
  ];

  // Skills/Competency data
  const skillsData = [
    { skill: 'Problem Solving', score: 85, classAvg: 72 },
    { skill: 'Critical Thinking', score: 78, classAvg: 70 },
    { skill: 'Communication', score: 82, classAvg: 75 },
    { skill: 'Teamwork', score: 90, classAvg: 78 },
    { skill: 'Technical Skills', score: 88, classAvg: 74 },
    { skill: 'Research', score: 75, classAvg: 68 },
  ];

  // Course details with rankings
  const courseDetails = [
    { name: 'Advanced Mathematics', grade: 'A', score: 88, rank: 5, totalStudents: 32, classAvg: 75, trend: 3 },
    { name: 'Physics 101', grade: 'B+', score: 82, rank: 8, totalStudents: 28, classAvg: 78, trend: 2 },
    { name: 'Data Structures', grade: 'A+', score: 95, rank: 1, totalStudents: 24, classAvg: 80, trend: 5 },
    { name: 'English Literature', grade: 'A', score: 87, rank: 6, totalStudents: 30, classAvg: 82, trend: -1 },
  ];

  const performanceChartConfig = {
    myScore: { label: 'My Score', color: 'hsl(var(--primary))' },
    classAvg: { label: 'Class Average', color: 'hsl(var(--muted-foreground))' },
  };

  const gradeHistoryConfig = {
    Mathematics: { label: 'Mathematics', color: 'hsl(var(--primary))' },
    Physics: { label: 'Physics', color: 'hsl(var(--chart-2))' },
    'Computer Science': { label: 'Computer Science', color: 'hsl(var(--chart-3))' },
    English: { label: 'English', color: 'hsl(var(--chart-4))' },
  };

  const attendanceConfig = {
    present: { label: 'Present', color: 'hsl(var(--chart-2))' },
    absent: { label: 'Absent', color: 'hsl(var(--destructive))' },
    late: { label: 'Late', color: 'hsl(var(--chart-4))' },
  };

  const skillsConfig = {
    score: { label: 'My Score', color: 'hsl(var(--primary))' },
    classAvg: { label: 'Class Average', color: 'hsl(var(--muted-foreground))' },
  };

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Analytics</h1>
            <p className="text-muted-foreground">
              Track your personal progress and compare with class averages
            </p>
          </div>
          <Select value={semester} onValueChange={setSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Semester</SelectItem>
              <SelectItem value="previous">Previous Semester</SelectItem>
              <SelectItem value="year">Full Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Overall GPA" 
            value="3.75" 
            change={0.15} 
            changeLabel="vs last semester"
            icon={<Award className="h-5 w-5" />}
          />
          <StatCard 
            title="Class Rank" 
            value="5th / 32" 
            change={2} 
            changeLabel="positions up"
            icon={<Target className="h-5 w-5" />}
          />
          <StatCard 
            title="Attendance Rate" 
            value="96.5%" 
            change={1.2} 
            changeLabel="vs last month"
            icon={<CheckCircle className="h-5 w-5" />}
          />
          <StatCard 
            title="Assignments Done" 
            value="28 / 32" 
            icon={<Zap className="h-5 w-5" />}
          />
        </div>

        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="grades">Grade History</TabsTrigger>
            <TabsTrigger value="comparison">Class Comparison</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Performance Trend */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Performance Trend</CardTitle>
                  <CardDescription>Your scores vs class average over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={performanceChartConfig} className="h-[300px] w-full">
                    <AreaChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                      <YAxis className="text-xs fill-muted-foreground" domain={[60, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="myScore" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} strokeWidth={2} />
                      <Area type="monotone" dataKey="classAvg" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground))" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Course Rankings */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Course Performance</CardTitle>
                  <CardDescription>Your ranking and scores in each course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseDetails.map((course, index) => (
                      <div key={index} className="rounded-lg border border-border p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-sm">{course.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              Rank: {course.rank} of {course.totalStudents}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={course.grade.startsWith('A') ? 'default' : 'secondary'}>
                              {course.grade}
                            </Badge>
                            <p className={`text-xs mt-1 ${course.trend > 0 ? 'text-green-500' : 'text-destructive'}`}>
                              {course.trend > 0 ? '+' : ''}{course.trend}% trend
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Your Score: {course.score}%</span>
                            <span className="text-muted-foreground">Class Avg: {course.classAvg}%</span>
                          </div>
                          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="absolute h-full bg-primary rounded-full" 
                              style={{ width: `${course.score}%` }}
                            />
                            <div 
                              className="absolute h-full w-0.5 bg-muted-foreground" 
                              style={{ left: `${course.classAvg}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Grade History</CardTitle>
                <CardDescription>Your grades across all exams and assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={gradeHistoryConfig} className="h-[350px] w-full">
                  <LineChart data={gradeHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="exam" className="text-xs fill-muted-foreground" />
                    <YAxis className="text-xs fill-muted-foreground" domain={[60, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="Mathematics" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                    <Line type="monotone" dataKey="Physics" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ fill: 'hsl(var(--chart-2))' }} />
                    <Line type="monotone" dataKey="Computer Science" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ fill: 'hsl(var(--chart-3))' }} />
                    <Line type="monotone" dataKey="English" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={{ fill: 'hsl(var(--chart-4))' }} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Attendance Overview */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>Weekly attendance record</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={attendanceConfig} className="h-[250px] w-full">
                  <BarChart data={attendanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="week" className="text-xs fill-muted-foreground" />
                    <YAxis className="text-xs fill-muted-foreground" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="present" stackId="a" fill="hsl(var(--chart-2))" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="late" stackId="a" fill="hsl(var(--chart-4))" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="absent" stackId="a" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Subject-wise Comparison</CardTitle>
                <CardDescription>How you compare to class averages in each subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={performanceChartConfig} className="h-[350px] w-full">
                  <BarChart data={subjectComparison} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="subject" className="text-xs fill-muted-foreground" />
                    <YAxis className="text-xs fill-muted-foreground" domain={[60, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="myScore" name="My Score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="classAvg" name="Class Average" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Skills & Competencies</CardTitle>
                <CardDescription>Your strengths compared to class average</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={skillsConfig} className="h-[400px] w-full">
                  <RadarChart data={skillsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <PolarGrid className="stroke-muted" />
                    <PolarAngleAxis dataKey="skill" className="text-xs fill-muted-foreground" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} className="text-xs fill-muted-foreground" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Radar name="My Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                    <Radar name="Class Average" dataKey="classAvg" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground))" fillOpacity={0.2} />
                    <Legend />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentAnalytics;
