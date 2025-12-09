import { useState } from "react";
import { Plus, Save, X } from "lucide-react";

import { CalendarEventSchedule } from "@/features/calendarEvent/types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type CalendarEventCardProps = {
  onSave?: (eventData: CalendarEventSchedule) => void;
  onCancel?: () => void;
  initialData?: Partial<CalendarEventSchedule>;
};

export function CalendarEventCard({
  onSave,
  onCancel,
  initialData,
}: CalendarEventCardProps) {
  const [eventData, setEventData] = useState<CalendarEventSchedule>({
    title: initialData?.title || "",
    location: initialData?.location || "",
    description: initialData?.description || "",
    startDate: initialData?.startDate || "",
    startTime: initialData?.startTime || "",
    endDate: initialData?.endDate || "",
    endTime: initialData?.endTime || "",
    attendees: initialData?.attendees || [""],
  });

  function handleInputChange(
    field: keyof CalendarEventSchedule,
    value: string
  ) {
    setEventData((prev) => ({ ...prev, [field]: value }));
  }

  function handleAttendeeChange(index: number, value: string) {
    const newAttendees = [...eventData.attendees];

    newAttendees[index] = value;

    setEventData((prev) => ({
      ...prev,
      attendees: newAttendees,
    }));
  }

  function addAttendee() {
    setEventData((prev) => ({
      ...prev,
      attendees: [...prev.attendees, ""],
    }));
  }

  function removeAttendee(index: number) {
    const newAttendees = [...eventData.attendees];

    newAttendees.splice(index, 1);

    setEventData((prev) => ({
      ...prev,
      attendees: newAttendees,
    }));
  }

  function handleSave() {
    if (onSave) {
      onSave(eventData);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Calendar Event</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={eventData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Event title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={eventData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="Event location"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={eventData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Event description"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={eventData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={eventData.startTime}
              onChange={(e) => handleInputChange("startTime", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={eventData.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={eventData.endTime}
              onChange={(e) => handleInputChange("endTime", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Attendees</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addAttendee}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Attendee
            </Button>
          </div>
          <div className="space-y-2">
            {eventData.attendees.map((attendee, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="email"
                  value={attendee}
                  onChange={(e) => handleAttendeeChange(index, e.target.value)}
                  placeholder="Email address"
                  className="flex-1"
                />
                {eventData.attendees.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAttendee(index)}
                    className="h-10 w-10 text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
