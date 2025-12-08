import { auth } from "../../../auth";

import { getCurrentUser } from "@/features/auth/user-auth-session-model.server";
import { createAssistantDefaultMessage, getMessages } from "@/actions/messages";

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

  const [messages] = await Promise.all([getMessages(user.id)]);

  return <DashboardPageComponent messages={messages} />;
}
