"use server";

import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { revalidatePath } from "next/cache";

import { prisma } from "@/prisma";

import { EmailDraft } from "@/features/email/types";
import { createRawEmail } from "@/features/email/utils";

import { auth } from "../../auth";
import { Email } from "../../generated/prisma/client";

export async function getEmails(userId: string) {
  return prisma.email.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function sendEmailUsingGmail(email: EmailDraft) {
  const session = await auth();
  const accessToken = session?.accessToken;

  if (!accessToken) {
    throw new Error("User is not authenticated");
  }

  const Oauth = new OAuth2Client();
  Oauth.setCredentials({
    access_token: accessToken,
  });

  const gmail = google.gmail({ version: "v1", auth: Oauth });

  const raw = createRawEmail(email);

  try {
    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw,
      },
    });

    revalidatePath("/dashboard");

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "❌ Error sending email:",
        (error as { response?: { data?: string } })?.response?.data ||
          error.message
      );
    } else {
      console.error("❌ Error sending email:", error);
    }

    throw new Error("Failed to send email");
  }
}

export async function createEmail(email: Email) {
  return prisma.email.create({ data: email });
}
