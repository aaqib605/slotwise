"use client";

import { Clock } from "lucide-react";

import { Reminder } from "../../generated/prisma/client";

interface ReminderCardProps {
  reminders: Reminder[];
}

export function ReminderCard({ reminders }: ReminderCardProps) {
  if (reminders.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No reminders yet. Try saying &quot;Remind me to...&quot;</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reminders</h2>
      <div className="space-y-2">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="flex items-center gap-3 p-3 rounded-lg border"
          >
            <div className="flex-1">
              <p className="font-medium">{reminder.summary}</p>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>{new Date(reminder.end).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
