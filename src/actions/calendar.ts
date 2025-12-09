"use server";

import { prisma } from "@/prisma";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

import { CalendarEvent } from "../../generated/prisma/client";
import { auth } from "../../auth";

import { CalendarEventSchedule } from "@/features/calendarEvent/types";
import { toGoogleEventRequestBody } from "@/features/calendarEvent/utils";

export async function getCalendarEvents(userId: string) {
  return prisma.calendarEvent.findMany({
    where: {
      userId,
    },
    orderBy: {
      startDate: "asc",
    },
  });
}

export async function createCalendarEvent(eventDetails: CalendarEvent) {
  return prisma.calendarEvent.create({
    data: eventDetails,
  });
}

export async function scheduleGoogleCalendarEvent(
  eventDetails: CalendarEventSchedule
) {
  const session = await auth();
  const accessToken = session?.accessToken as string;

  if (!accessToken) throw new Error("No access token found in session");

  const OAuth = new OAuth2Client();

  OAuth.setCredentials({
    access_token: accessToken,
  });

  const calendar = google.calendar({ version: "v3", auth: OAuth });

  const requestBody = toGoogleEventRequestBody(eventDetails);

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody,
      sendUpdates: "all",
      sendNotifications: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error scheduling event:", error);

    throw new Error("Failed to schedule event");
  }
}
