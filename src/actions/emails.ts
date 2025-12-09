"use server";

import { prisma } from "@/prisma";

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
