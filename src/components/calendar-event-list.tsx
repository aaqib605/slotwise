"use client";

import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { format } from "date-fns";

import { CalendarEvent } from "../../generated/prisma/client";

interface CalendarEventsListProps {
  calendarEvents: CalendarEvent[];
}

export function CalendarEventList({ calendarEvents }: CalendarEventsListProps) {
  if (!calendarEvents || calendarEvents.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Calendar</h2>
        <div className="text-center text-muted-foreground py-8">
          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Calendar integration would appear here.</p>
          <p className="text-sm">
            Try saying &quot;Schedule a meeting with John on Friday at 2
            PM&quot;
          </p>
        </div>
      </div>
    );
  }

  const sortedEvents = [...calendarEvents].sort(
    (a, b) => b.startDate.getTime() - a.startDate.getTime()
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Calendar Events</h2>

      <div className="grid grid-cols-1 gap-4">
        {sortedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: CalendarEvent }) {
  const formattedStartDate = format(event.startDate, "EEEE, MMMM d, yyyy");
  const formattedEndDate = format(event.endDate, "EEEE, MMMM d, yyyy");

  // Check if the event is on the same day
  const isSameDay = formattedStartDate === formattedEndDate;

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm hover:shadow transition-shadow p-4 md:p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">{event.title}</h3>

          {event.location && (
            <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0" />
            <div>
              {isSameDay ? (
                <span>
                  {formattedStartDate} • {event.startTime} - {event.endTime}
                </span>
              ) : (
                <span>
                  {formattedStartDate} {event.startTime} - {formattedEndDate}{" "}
                  {event.endTime}
                </span>
              )}
            </div>
          </div>
        </div>

        {event.description && (
          <div className="text-sm text-foreground/80 bg-muted/50 p-3 rounded-md">
            {event.description}
          </div>
        )}

        {event.attendees.length > 0 && (
          <div className="flex items-start gap-1.5">
            <Users className="h-4 w-4 shrink-0 mt-1 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              {event.attendees.join(", ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
