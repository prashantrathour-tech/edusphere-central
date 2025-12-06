import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { format, isSameDay } from 'date-fns';
import { 
  BookOpen, 
  FileText, 
  ClipboardList, 
  Calendar as CalendarIcon,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export type EventType = 'class' | 'exam' | 'assignment' | 'event';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time?: string;
  type: EventType;
  subject?: string;
  description?: string;
  location?: string;
}

interface EventCalendarProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

const eventTypeConfig: Record<EventType, { label: string; color: string; icon: React.ReactNode }> = {
  class: { label: 'Class', color: 'bg-primary', icon: <BookOpen className="h-4 w-4" /> },
  exam: { label: 'Exam', color: 'bg-destructive', icon: <FileText className="h-4 w-4" /> },
  assignment: { label: 'Assignment', color: 'bg-chart-4', icon: <ClipboardList className="h-4 w-4" /> },
  event: { label: 'Event', color: 'bg-chart-2', icon: <CalendarIcon className="h-4 w-4" /> },
};

const EventCalendar = ({ events, onEventClick }: EventCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [filters, setFilters] = useState<Record<EventType, boolean>>({
    class: true,
    exam: true,
    assignment: true,
    event: true,
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = events.filter(event => filters[event.type]);

  const eventsForSelectedDate = selectedDate
    ? filteredEvents.filter(event => isSameDay(event.date, selectedDate))
    : [];

  const hasEventsOnDate = (date: Date) => {
    return filteredEvents.some(event => isSameDay(event.date, date));
  };

  const getEventTypesForDate = (date: Date): EventType[] => {
    const eventTypes = filteredEvents
      .filter(event => isSameDay(event.date, date))
      .map(event => event.type);
    return [...new Set(eventTypes)];
  };

  const toggleFilter = (type: EventType) => {
    setFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Calendar */}
      <Card className="lg:col-span-2 border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View your schedule and upcoming events</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          {showFilters && (
            <div className="flex flex-wrap gap-4 pt-4 border-t border-border mt-4">
              {(Object.keys(eventTypeConfig) as EventType[]).map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filter-${type}`}
                    checked={filters[type]}
                    onCheckedChange={() => toggleFilter(type)}
                  />
                  <label 
                    htmlFor={`filter-${type}`} 
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <div className={cn('w-3 h-3 rounded-full', eventTypeConfig[type].color)} />
                    {eventTypeConfig[type].label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="rounded-md border pointer-events-auto"
            modifiers={{
              hasEvents: (date) => hasEventsOnDate(date),
            }}
            modifiersStyles={{
              hasEvents: { fontWeight: 'bold' },
            }}
            components={{
              DayContent: ({ date }) => {
                const eventTypes = getEventTypesForDate(date);
                return (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <span>{date.getDate()}</span>
                    {eventTypes.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5">
                        {eventTypes.slice(0, 3).map((type, i) => (
                          <div
                            key={i}
                            className={cn('w-1.5 h-1.5 rounded-full', eventTypeConfig[type].color)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Events for Selected Date */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">
            {selectedDate ? format(selectedDate, 'EEEE, MMM d') : 'Select a date'}
          </CardTitle>
          <CardDescription>
            {eventsForSelectedDate.length} event{eventsForSelectedDate.length !== 1 ? 's' : ''} scheduled
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {eventsForSelectedDate.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                <CalendarIcon className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">No events for this day</p>
              </div>
            ) : (
              <div className="space-y-3">
                {eventsForSelectedDate.map(event => (
                  <div
                    key={event.id}
                    className="rounded-lg border border-border p-3 cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => onEventClick?.(event)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg text-white',
                        eventTypeConfig[event.type].color
                      )}>
                        {eventTypeConfig[event.type].icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm truncate">{event.title}</h4>
                        </div>
                        {event.subject && (
                          <p className="text-xs text-muted-foreground">{event.subject}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {eventTypeConfig[event.type].label}
                          </Badge>
                          {event.time && (
                            <span className="text-xs text-muted-foreground">{event.time}</span>
                          )}
                        </div>
                        {event.location && (
                          <p className="text-xs text-muted-foreground mt-1">{event.location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCalendar;
