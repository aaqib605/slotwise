"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Calendar, Clock, Mail, Send } from "lucide-react";
import { createId } from "@paralleldrive/cuid2";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/chat-message";
import { CalendarEventCard } from "@/components/calendar-event-card";
import { CalendarEventList } from "@/components/calendar-event-list";
import { EmailList } from "@/components/email-list";

import { CalendarEventSchedule } from "@/features/calendarEvent/types";
import {
  generateEventScheduledResponse,
  parseCalendarEvent,
} from "@/features/calendarEvent/utils";
import { createMessageForCurrentUser } from "@/features/messages/messages-helpers.server";

import {
  createCalendarEvent,
  scheduleGoogleCalendarEvent,
} from "@/actions/calendar";

import {
  CalendarEvent,
  Email,
  Message,
  User,
} from "../../../generated/prisma/client";

export default function DashboardPageComponent({
  messages,
  calendarEvents,
  user,
  emails,
}: {
  messages: Message[];
  calendarEvents: CalendarEvent[];
  user: User;
  emails: Email[];
}) {
  const [activeTab, setActiveTab] = useState("chat");
  const [input, setInput] = useState("");
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);
  const [calendarEvent, setCalendarEvent] = useState<CalendarEventSchedule>({
    title: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    attendees: [],
  });
  const [showCalendarEvent, setShowCalendarEvent] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (input.trim()) {
      processMessage(input.trim());

      setInput("");
    }
  }

  async function processMessage(message: string) {
    setInput("");

    if (
      message.toLowerCase().includes("add meeting") ||
      message.toLowerCase().includes("schedule")
    ) {
      return processCalendarEvent(message);
    }
  }

  function processCalendarEvent(message: string) {
    const event = parseCalendarEvent(message);

    setCalendarEvent(event);
    setShowCalendarEvent(true);
  }

  async function onSaveCalendarEvent(eventData: CalendarEventSchedule) {
    // PROMPT example: Save the calendar event
    // Schedule a meeting titled "Tech Sync with Team"
    // starting at December 10, 2025 4:00 PM
    // ending at December 10, 2025 5:00 PM
    // located at Zoom
    // with description "Discuss sprint goals and blockers."
    setShowCalendarEvent(false);

    const optimisticId = createId();
    const attendees = Array.from(new Set([...eventData.attendees, user.email]));

    setLocalMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        id: optimisticId,
        userId: user.id,
        content: generateEventScheduledResponse(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    try {
      await Promise.all([
        createMessageForCurrentUser({
          role: "assistant",
          message: generateEventScheduledResponse(),
        }),
        scheduleGoogleCalendarEvent({
          ...eventData,
          attendees,
        }),
        createCalendarEvent({
          ...eventData,
          userId: user.id,
          attendees,
          id: createId(),
          startDate: new Date(eventData.startDate),
          endDate: new Date(eventData.endDate),
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ]);

      router.refresh();
    } catch (error) {
      console.error("Failed to save calendar event:", error);

      setLocalMessages((prev) =>
        prev.map((msg) =>
          msg.id === optimisticId && msg.role === "assistant"
            ? {
                ...msg,
                content:
                  "Something went wrong while scheduling your event. Please try again.",
              }
            : msg
        )
      );
    }
  }

  // scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [localMessages]);

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <DashboardSidebar />

      <div className="flex flex-col w-full flex-1 overflow-hidden">
        {/* DashboardHeader */}
        <DashboardHeader />

        {/* Tabs Container */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <TabsList className="sticky top-14 z-10 w-full bg-white border-b h-12 p-2">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Bot className="size-4" /> Chat
            </TabsTrigger>

            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="size-4" /> Calendar
            </TabsTrigger>

            <TabsTrigger value="reminders" className="flex items-center gap-2">
              <Clock className="size-4" /> Reminders
            </TabsTrigger>

            <TabsTrigger value="gmail" className="flex items-center gap-2">
              <Mail className="size-4" /> Gmail
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto px-4 pb-4 pt-14 mb-32">
            <TabsContent value="chat" className="space-y-4">
              <div className="fleTabsContent-4 pb-4">
                {localMessages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {showCalendarEvent && (
                <CalendarEventCard
                  initialData={calendarEvent}
                  onCancel={() => setShowCalendarEvent(false)}
                  onSave={onSaveCalendarEvent}
                />
              )}
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <CalendarEventList calendarEvents={calendarEvents} />
            </TabsContent>

            <TabsContent value="reminders" className="space-y-4">
              REMINDERS
            </TabsContent>

            <TabsContent value="gmail" className="space-y-4">
              <EmailList emails={emails} />
            </TabsContent>
          </div>

          <div className="fixed w-full md:w-[calc(100%-var(--sidebar-width))] left-0 md:left-(--sidebar-width) bottom-0 bg-white p-4 border-t">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row sm:items-end gap-4"
            >
              {/* Message Input */}
              <div className="relative flex-1 w-full">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="min-h-20 pr-10 resize-none"
                />
              </div>

              {/* Send button */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button type="submit" className="w-fit sm:w-auto">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </form>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
