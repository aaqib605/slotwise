import { parse, isValid, format } from "date-fns";

import { CalendarEventSchedule } from "./types";

export function parseCalendarEvent(message: string): CalendarEventSchedule {
  const titleMatch = message.match(/titled\s*['"](.+?)['"]/i);
  const startMatch = message.match(
    /(?:starting|start)\s+at\s+(.+?)(?=\s+(?:ending|end|located|with|$))/i
  );
  const endMatch = message.match(
    /(?:ending|end)\s+at\s+(.+?)(?=\s+(?:located|with|$))/i
  );
  const locationMatch = message.match(/located\s+at\s+(.+?)(?=\s+with|$)/i);
  const descMatch = message.match(/with\s+description\s*['"](.+?)['"]/i);

  function parseDT(str: string): Date | null {
    for (const fmt of [
      "MMMM d, yyyy h:mm a", // Dec 09, 2025 10:00 AM
      "yyyy-MM-dd h:mm a", // 2025-12-09 10:00 AM
      "yyyy-MM-dd'T'HH:mm", // 2025-12-09T10:00
    ]) {
      const dt = parse(str.trim(), fmt, new Date());
      if (isValid(dt)) return dt;
    }
    return null;
  }

  const now = new Date();
  const sDt = parseDT(startMatch?.[1] || "") ?? now;
  const eDt =
    parseDT(endMatch?.[1] || "") ?? new Date(sDt.getTime() + 60 * 60 * 1000); // Default to 1 hour later

  return {
    title: titleMatch ? titleMatch[1].trim() : "New Meeting",
    location: locationMatch ? locationMatch[1].trim() : "",
    description: descMatch ? descMatch[1].trim() : "Created by Assistant",
    startDate: format(sDt, "yyyy-MM-dd"), // Format to YYYY-MM-DD
    endDate: format(eDt, "yyyy-MM-dd"), // Format to YYYY-MM-DD
    startTime: format(sDt, "h:mm a"), // Format to h:mm a
    endTime: format(eDt, "h:mm a"), // Format to h:mm a
    attendees: [],
  };
}

export function generateEventScheduledResponse() {
  return "The calendar event has been saved to your schedule.";
}

export function toGoogleEventRequestBody(event: CalendarEventSchedule) {
  // combine and parse the start and end date/time
  const startDateTime = new Date(`${event.startDate}T${event.startTime}:00Z`);
  const endDateTime = new Date(`${event.endDate}T${event.endTime}:00Z`);

  return {
    summary: event.title,
    location: event.location,
    description: event.description,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: "UTC",
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: "UTC",
    },
    attendees: event.attendees.map((email) => ({ email })),
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 }, // 1 day before
        { method: "popup", minutes: 10 }, // 10 minutes before
      ],
    },
  };
}
