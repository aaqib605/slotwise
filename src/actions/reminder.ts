"use server";

import { prisma } from "@/prisma";

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
