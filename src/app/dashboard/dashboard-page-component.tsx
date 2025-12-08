"use client";

import { useState } from "react";
import { Bot, Calendar, Clock, Mail, Send } from "lucide-react";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function DashboardPageComponent() {
  const [activeTab, setActiveTab] = useState("chat");
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
              CHAT
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              CALENDAR
            </TabsContent>

            <TabsContent value="reminders" className="space-y-4">
              REMINDERS
            </TabsContent>

            <TabsContent value="gmail" className="space-y-4">
              GMAIL
            </TabsContent>
          </div>

          <div className="fixed w-full md:w-[calc(100%-var(--sidebar-width))] left-0 md:left-(--sidebar-width) bottom-0 bg-white p-4 border-t">
            <form
              onSubmit={() => {}}
              className="flex flex-col sm:flex-row sm:items-end gap-4"
            >
              {/* Message Input */}
              <div className="relative flex-1 w-full">
                <Textarea
                  value={""}
                  onChange={() => {}}
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
