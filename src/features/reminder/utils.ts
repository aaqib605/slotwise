import { parse, isValid, addMinutes, addHours } from "date-fns";

import { ReminderSchedule } from "./type";

export function parseReminder(message: string): ReminderSchedule {
  const summaryMatch = message.match(/remind me to\s+(.+?)(?=\s+at\s+|$)/i);
  const timeMatch = message.match(/at\s+(.+)/i);

  function parseDT(str: string): Date | null {
    for (const fmt of [
      "MMMM d, yyyy h:mm a",
      "yyyy-MM-dd h:mm a",
      "yyyy-MM-dd'T'HH:mm",
      "h:mm a",
    ]) {
      const dt = parse(str.trim(), fmt, new Date());
      if (isValid(dt)) return dt;
    }

    return null;
  }

  const now = new Date();
  const start = parseDT(timeMatch?.[1] || "") ?? addHours(now, 1);
  const end = addMinutes(start, 30);

  return {
    summary: summaryMatch ? summaryMatch[1].trim() : "Reminder",
    description: `Auto-created reminder from: "${message}"`,
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

export function toReminderEventBody(reminder: ReminderSchedule) {
  return {
    summary: reminder.summary,
    description: reminder.description,
    start: {
      dateTime: new Date(reminder.start).toISOString(),
      timeZone: "UTC",
    },
    end: {
      dateTime: new Date(reminder.end).toISOString(),
      timeZone: "UTC",
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 10 }, // show popup 10 mins before
        { method: "email", minutes: 30 }, // send email 30 mins before
      ],
    },
  };
}
