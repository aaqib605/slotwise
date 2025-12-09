"use server";

import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { prisma } from "@/prisma";

import { ReminderSchedule } from "@/features/reminder/type";
import { toReminderEventBody } from "@/features/reminder/utils";

import { auth } from "../../auth";
import { Reminder } from "../../generated/prisma/client";

export async function getReminders(userId: string) {
  return prisma.reminder.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function scheduleReminder(reminder: ReminderSchedule) {
  const session = await auth();
  const accessToken = session?.accessToken;

  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  const OAuth = new OAuth2Client();

  OAuth.setCredentials({
    access_token: accessToken,
  });

  const calendar = google.calendar({ version: "v3", auth: OAuth });

  const requestBody = toReminderEventBody(reminder);

  try {
    const { data } = await calendar.events.insert({
      calendarId: "primary",
      requestBody,
    });

    return data;
  } catch (error) {
    console.error("Error scheduling reminder:", error);

    throw new Error("Failed to schedule reminder");
  }
}

export async function createReminder(reminder: Reminder) {
  return prisma.reminder.create({
    data: reminder,
  });
}
