import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import EventCalendar, { CalendarEvent } from '@/components/calendar/EventCalendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  ClipboardList, 
  BarChart3,
  Calendar as CalendarIcon,
  Award,
  CheckCircle,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

const StudentCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const navItems = [
    { label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" />, path: '/student' },
    { label: 'My Classes', icon: <BookOpen className="h-5 w-5" />, path: '/student/classes' },
    { label: 'Assignments', icon: <ClipboardList className="h-5 w-5" />, path: '/student/assignments' },
    { label: 'Grades', icon: <Award className="h-5 w-5" />, path: '/student/grades' },
    { label: 'Analytics', icon: <TrendingUp className="h-5 w-5" />, path: '/student/analytics' },
    { label: 'Attendance', icon: <CheckCircle className="h-5 w-5" />, path: '/student/attendance' },
    { label: 'Calendar', icon: <CalendarIcon className="h-5 w-5" />, path: '/student/calendar' },
  ];

  // Mock events data
  const events: CalendarEvent[] = [
    // Classes
    { id: '1', title: 'Advanced Mathematics', date: new Date(), time: '09:00 AM', type: 'class', subject: 'Mathematics', location: 'Room 201' },
    { id: '2', title: 'Physics 101', date: new Date(), time: '11:00 AM', type: 'class', subject: 'Physics', location: 'Lab 105' },
    { id: '3', title: 'Data Structures', date: new Date(), time: '02:00 PM', type: 'class', subject: 'Computer Science', location: 'Room 302' },
    // Tomorrow's classes
    { id: '4', title: 'English Literature', date: new Date(Date.now() + 86400000), time: '09:00 AM', type: 'class', subject: 'English', location: 'Room 108' },
    { id: '5', title: 'Chemistry Lab', date: new Date(Date.now() + 86400000), time: '11:00 AM', type: 'class', subject: 'Chemistry', location: 'Lab 203' },
    // Exams
    { id: '6', title: 'Midterm Exam - Mathematics', date: new Date(Date.now() + 5 * 86400000), time: '10:00 AM', type: 'exam', subject: 'Mathematics', location: 'Hall A', description: 'Chapters 1-5, bring calculator' },
    { id: '7', title: 'Physics Quiz', date: new Date(Date.now() + 3 * 86400000), time: '11:00 AM', type: 'exam', subject: 'Physics', location: 'Lab 105' },
    // Assignments
    { id: '8', title: 'Linear Algebra Problem Set', date: new Date(Date.now() + 2 * 86400000), type: 'assignment', subject: 'Mathematics', description: 'Complete exercises 1-20 from Chapter 3' },
    { id: '9', title: 'Lab Report: Newton\'s Laws', date: new Date(Date.now() + 5 * 86400000), type: 'assignment', subject: 'Physics', description: 'Include experimental data and analysis' },
    { id: '10', title: 'Binary Tree Implementation', date: new Date(Date.now() + 7 * 86400000), type: 'assignment', subject: 'Computer Science', description: 'Implement BST with insert, delete, search operations' },
    // Events
    { id: '11', title: 'Science Fair', date: new Date(Date.now() + 10 * 86400000), time: '10:00 AM', type: 'event', location: 'Main Auditorium', description: 'Annual science exhibition showcasing student projects' },
    { id: '12', title: 'Career Counseling Session', date: new Date(Date.now() + 4 * 86400000), time: '03:00 PM', type: 'event', location: 'Conference Room B', description: 'Guidance session for course selection' },
    { id: '13', title: 'Sports Day', date: new Date(Date.now() + 14 * 86400000), time: '08:00 AM', type: 'event', location: 'Sports Ground', description: 'Annual inter-class sports competition' },
  ];

  const eventTypeColors: Record<string, string> = {
    class: 'bg-primary',
    exam: 'bg-destructive',
    assignment: 'bg-chart-4',
    event: 'bg-chart-2',
  };

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Academic Calendar</h1>
          <p className="text-muted-foreground">
            View all your classes, exams, assignments, and events
          </p>
        </div>

        <EventCalendar events={events} onEventClick={setSelectedEvent} />

        {/* Event Details Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${selectedEvent ? eventTypeColors[selectedEvent.type] : ''}`} />
                <DialogTitle>{selectedEvent?.title}</DialogTitle>
              </div>
              <DialogDescription>
                {selectedEvent?.subject && <span>{selectedEvent.subject} • </span>}
                <Badge variant="outline" className="ml-1">{selectedEvent?.type}</Badge>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>{selectedEvent && format(selectedEvent.date, 'EEEE, MMMM d, yyyy')}</span>
              </div>
              {selectedEvent?.time && (
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedEvent.time}</span>
                </div>
              )}
              {selectedEvent?.location && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedEvent.location}</span>
                </div>
              )}
              {selectedEvent?.description && (
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  {selectedEvent?.type === 'assignment' ? 'View Assignment' : 'Add to Calendar'}
                </Button>
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>Close</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default StudentCalendar;
