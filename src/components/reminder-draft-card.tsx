"use client";

import { useState } from "react";
import { Save } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { ReminderSchedule } from "@/features/reminder/type";

type ReminderDraftCardProps = {
  initialData: ReminderSchedule;
  onCancel: () => void;
  onSave: (data: ReminderSchedule) => void;
};

export function ReminderDraftCard({
  initialData,
  onCancel,
  onSave,
}: ReminderDraftCardProps) {
  const [reminder, setReminder] = useState<ReminderSchedule>({
    summary: initialData.summary,
    description: initialData.description,
    start: initialData.start,
    end: initialData.end,
  });

  const handleChange = (field: keyof ReminderSchedule, value: string) => {
    setReminder((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Reminder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Input
            id="summary"
            value={reminder.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            placeholder="What is this reminder about?"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={reminder.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Additional details"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start">Start</Label>
            <Input
              id="start"
              type="datetime-local"
              value={reminder.start.slice(0, 16)}
              onChange={(e) =>
                handleChange("start", new Date(e.target.value).toISOString())
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end">End</Label>
            <Input
              id="end"
              type="datetime-local"
              value={reminder.end.slice(0, 16)}
              onChange={(e) =>
                handleChange("end", new Date(e.target.value).toISOString())
              }
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(reminder)}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
