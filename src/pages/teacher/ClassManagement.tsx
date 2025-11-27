import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Users, 
  ClipboardList, 
  BarChart3,
  Calendar,
  Search,
  UserPlus,
  Download,
  Filter,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const ClassManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" />, path: '/teacher' },
    { label: 'My Classes', icon: <BookOpen className="h-5 w-5" />, path: '/teacher/classes' },
    { label: 'Students', icon: <Users className="h-5 w-5" />, path: '/teacher/students' },
    { label: 'Assignments', icon: <ClipboardList className="h-5 w-5" />, path: '/teacher/assignments' },
    { label: 'Attendance', icon: <CheckCircle className="h-5 w-5" />, path: '/teacher/attendance' },
    { label: 'Schedule', icon: <Calendar className="h-5 w-5" />, path: '/teacher/schedule' },
  ];

  // Mock data
  const classInfo = {
    name: 'Advanced Mathematics',
    code: 'MATH301',
    semester: 'Spring 2024',
    schedule: 'Mon, Wed, Fri - 09:00 AM',
    room: 'Room 205',
    totalStudents: 32,
  };

  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      rollNo: 'CS2024001',
      email: 'alice.j@example.com',
      attendance: 95,
      grade: 92,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    },
    {
      id: 2,
      name: 'Bob Smith',
      rollNo: 'CS2024002',
      email: 'bob.s@example.com',
      attendance: 88,
      grade: 85,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    },
    {
      id: 3,
      name: 'Carol Davis',
      rollNo: 'CS2024003',
      email: 'carol.d@example.com',
      attendance: 92,
      grade: 88,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
    },
    {
      id: 4,
      name: 'David Wilson',
      rollNo: 'CS2024004',
      email: 'david.w@example.com',
      attendance: 78,
      grade: 76,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    },
    {
      id: 5,
      name: 'Emma Brown',
      rollNo: 'CS2024005',
      email: 'emma.b@example.com',
      attendance: 98,
      grade: 94,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    },
  ];

  const attendanceRecords = [
    { date: '2024-01-22', present: 30, absent: 2, late: 0 },
    { date: '2024-01-20', present: 29, absent: 1, late: 2 },
    { date: '2024-01-17', present: 31, absent: 1, late: 0 },
    { date: '2024-01-15', present: 28, absent: 3, late: 1 },
  ];

  const grades = [
    { type: 'Midterm Exam', weight: 30, avgScore: 85 },
    { type: 'Assignments', weight: 40, avgScore: 88 },
    { type: 'Final Project', weight: 20, avgScore: 90 },
    { type: 'Participation', weight: 10, avgScore: 92 },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6">
        {/* Class Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{classInfo.name}</h1>
              <Badge variant="secondary">{classInfo.code}</Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {classInfo.schedule}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {classInfo.totalStudents} Students
              </span>
              <span>{classInfo.room}</span>
            </div>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Student
          </Button>
        </div>

        <Tabs defaultValue="students" className="space-y-4">
          <TabsList>
            <TabsTrigger value="students">Student List</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Enrolled Students</CardTitle>
                    <CardDescription>
                      Manage and view student information
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or roll number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="space-y-3">
                    {filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="h-12 w-12 rounded-full bg-primary/10"
                          />
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {student.rollNo}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {student.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Attendance</p>
                            <p className="font-semibold">{student.attendance}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Grade</p>
                            <Badge
                              variant={
                                student.grade >= 90
                                  ? 'default'
                                  : student.grade >= 80
                                  ? 'secondary'
                                  : 'outline'
                              }
                            >
                              {student.grade}%
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Present Today
                  </CardTitle>
                  <CheckCircle className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">30/32</div>
                  <p className="text-xs text-muted-foreground mt-1">93.75% attendance</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Absent Today
                  </CardTitle>
                  <XCircle className="h-5 w-5 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground mt-1">2 students</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Late Today
                  </CardTitle>
                  <Clock className="h-5 w-5 text-muted" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground mt-1">No late arrivals</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Attendance History</CardTitle>
                    <CardDescription>Recent attendance records</CardDescription>
                  </div>
                  <Button className="gap-2">Mark Attendance</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendanceRecords.map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div>
                        <p className="font-semibold">{record.date}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(record.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                          })}
                        </p>
                      </div>
                      <div className="flex gap-6">
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-primary">
                            <CheckCircle className="h-4 w-4" />
                            <span className="font-semibold">{record.present}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Present</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-destructive">
                            <XCircle className="h-4 w-4" />
                            <span className="font-semibold">{record.absent}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Absent</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-muted">
                            <Clock className="h-4 w-4" />
                            <span className="font-semibold">{record.late}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Late</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grades Tab */}
          <TabsContent value="grades" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Grade Distribution</CardTitle>
                    <CardDescription>
                      Assessment breakdown and average scores
                    </CardDescription>
                  </div>
                  <Button className="gap-2">Enter Grades</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {grades.map((grade, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{grade.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            Weight: {grade.weight}%
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{grade.avgScore}%</p>
                          <p className="text-xs text-muted-foreground">Class Average</p>
                        </div>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${grade.avgScore}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Overall Class Average</h4>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">87.6%</p>
                      <Badge variant="default">B+</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Individual Student Grades</CardTitle>
                <CardDescription>Detailed grade records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {student.rollNo}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xl font-bold">{student.grade}%</p>
                          <Badge
                            variant={
                              student.grade >= 90
                                ? 'default'
                                : student.grade >= 80
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {student.grade >= 90
                              ? 'A'
                              : student.grade >= 80
                              ? 'B'
                              : 'C'}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
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

export default ClassManagement;
