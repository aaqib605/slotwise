"use server";

import { prisma } from "@/prisma";

export async function createAssistantDefaultMessage(userId: string) {
  return prisma.message.create({
    data: {
      content: "Hello! I'm your assistant. How can I help you today?",
      role: "assistant",
      userId,
    },
  });
}

export async function createMessage({
  role,
  userId,
  content,
}: {
  role: "user" | "assistant";
  userId: string;
  content: string;
}) {
  return prisma.message.create({
    data: {
      content,
      role,
      userId,
    },
  });
}

export async function getMessages(userId: string) {
  return prisma.message.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
