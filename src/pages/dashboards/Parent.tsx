import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  CreditCard, 
  MessageSquare,
  BarChart3,
  Award,
  CheckCircle,
  AlertCircle,
  Download,
  Send
} from 'lucide-react';

const Parent = () => {
  const navItems = [
    { label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" />, path: '/parent' },
    { label: 'My Children', icon: <Users className="h-5 w-5" />, path: '/parent/children' },
    { label: 'Payments', icon: <CreditCard className="h-5 w-5" />, path: '/parent/payments' },
    { label: 'Messages', icon: <MessageSquare className="h-5 w-5" />, path: '/parent/messages' },
  ];

  const children = [
    {
      id: 1,
      name: 'Emma Johnson',
      class: 'Grade 10-A',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      overallGrade: 88,
      attendance: 95,
      pendingFees: 0,
      subjects: [
        { name: 'Mathematics', grade: 92, teacher: 'Prof. Smith' },
        { name: 'Physics', grade: 85, teacher: 'Dr. Brown' },
        { name: 'English', grade: 90, teacher: 'Ms. Davis' },
        { name: 'Chemistry', grade: 84, teacher: 'Dr. Wilson' },
      ],
    },
    {
      id: 2,
      name: 'James Johnson',
      class: 'Grade 7-B',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      overallGrade: 82,
      attendance: 90,
      pendingFees: 1500,
      subjects: [
        { name: 'Mathematics', grade: 78, teacher: 'Mr. Anderson' },
        { name: 'Science', grade: 85, teacher: 'Ms. Taylor' },
        { name: 'English', grade: 80, teacher: 'Ms. Davis' },
        { name: 'History', grade: 86, teacher: 'Mr. Martinez' },
      ],
    },
  ];

  const [selectedChild, setSelectedChild] = useState(children[0]);

  const paymentHistory = [
    { date: '2024-01-15', description: 'Tuition Fee - January', amount: 1500, status: 'paid' },
    { date: '2023-12-15', description: 'Tuition Fee - December', amount: 1500, status: 'paid' },
    { date: '2023-11-15', description: 'Lab Fee - Fall Semester', amount: 300, status: 'paid' },
  ];

  const messages = [
    {
      from: 'Prof. Smith',
      subject: 'Excellent performance in Math',
      date: '2 days ago',
      unread: true,
      preview: 'Emma has shown exceptional understanding in calculus...',
    },
    {
      from: 'Dr. Brown',
      subject: 'Physics Lab Report',
      date: '4 days ago',
      unread: false,
      preview: 'Please ensure Emma submits the lab report by Friday...',
    },
    {
      from: 'School Admin',
      subject: 'Parent-Teacher Meeting',
      date: '1 week ago',
      unread: false,
      preview: 'Invitation for quarterly parent-teacher meeting on...',
    },
  ];

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your children's academic progress and manage payments
          </p>
        </div>

        {/* Children Selection */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {children.map((child) => (
            <Card
              key={child.id}
              className={`cursor-pointer border-2 transition-all hover:shadow-md ${
                selectedChild.id === child.id ? 'border-primary' : 'border-border'
              }`}
              onClick={() => setSelectedChild(child)}
            >
              <CardContent className="flex items-center gap-4 p-4 min-w-[280px]">
                <img
                  src={child.avatar}
                  alt={child.name}
                  className="h-12 w-12 rounded-full bg-primary/10"
                />
                <div>
                  <h3 className="font-semibold">{child.name}</h3>
                  <p className="text-sm text-muted-foreground">{child.class}</p>
                </div>
                {child.pendingFees > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    Pending
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overview Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Overall Grade
              </CardTitle>
              <Award className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedChild.overallGrade}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Excellent performance
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Attendance
              </CardTitle>
              <CheckCircle className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedChild.attendance}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedChild.attendance >= 90 ? 'Great attendance' : 'Needs improvement'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Fees
              </CardTitle>
              <CreditCard className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${selectedChild.pendingFees}
              </div>
              {selectedChild.pendingFees > 0 ? (
                <Button size="sm" className="mt-2">
                  Pay Now
                </Button>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">All paid up</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="progress" className="space-y-4">
          <TabsList>
            <TabsTrigger value="progress">Academic Progress</TabsTrigger>
            <TabsTrigger value="payments">Fee Payments</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Academic Progress Tab */}
          <TabsContent value="progress" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>
                  Detailed grades for {selectedChild.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {selectedChild.subjects.map((subject, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-sm">{subject.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            Teacher: {subject.teacher}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold">{subject.grade}%</span>
                          <Badge
                            variant={
                              subject.grade >= 90
                                ? 'default'
                                : subject.grade >= 80
                                ? 'secondary'
                                : 'outline'
                            }
                            className="ml-2"
                          >
                            {subject.grade >= 90
                              ? 'A'
                              : subject.grade >= 80
                              ? 'B'
                              : 'C'}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={subject.grade} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fee Payments Tab */}
          <TabsContent value="payments" className="space-y-4">
            {selectedChild.pendingFees > 0 && (
              <Card className="border-destructive bg-destructive/5">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <CardTitle className="text-destructive">Pending Payment</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Tuition Fee - Current Month</p>
                      <p className="text-sm text-muted-foreground">Due: January 31, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${selectedChild.pendingFees}</p>
                      <Button className="mt-2">Pay Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>Past transactions and receipts</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentHistory.map((payment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div>
                        <p className="font-semibold text-sm">{payment.description}</p>
                        <p className="text-xs text-muted-foreground">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${payment.amount}</p>
                        <Badge variant="default" className="mt-1">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-4">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Teacher Communication</CardTitle>
                    <CardDescription>Messages from teachers and school</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Send className="h-4 w-4" />
                    New Message
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border p-4 cursor-pointer transition-colors hover:bg-accent/50 ${
                        message.unread
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm">{message.from}</h4>
                          {message.unread && (
                            <Badge variant="default" className="h-5">
                              New
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {message.date}
                        </span>
                      </div>
                      <p className="font-medium text-sm mb-1">{message.subject}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {message.preview}
                      </p>
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

export default Parent;
