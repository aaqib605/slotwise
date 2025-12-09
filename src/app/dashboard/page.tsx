import { auth } from "../../../auth";

import { getCurrentUser } from "@/features/auth/user-auth-session-model.server";

import { createAssistantDefaultMessage, getMessages } from "@/actions/messages";
import { getCalendarEvents } from "@/actions/calendar";
import { getEmails } from "@/actions/emails";
import { getReminders } from "@/actions/reminder";

import DashboardPageComponent from "@/app/dashboard/dashboard-page-component";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  const user = await getCurrentUser(session);

  if (!user) throw new Error("User not found");

  if (user.messages.length === 0) {
    // create a default message if none exist
    await createAssistantDefaultMessage(user.id);
  }

  const [messages, calendarEvents, emails, reminders] = await Promise.all([
    getMessages(user.id),
    getCalendarEvents(user.id),
    getEmails(user.id),
    getReminders(user.id),
  ]);

  return (
    <DashboardPageComponent
      messages={messages}
      calendarEvents={calendarEvents}
      user={user}
      emails={emails}
      reminders={reminders}
    />
  );
}
