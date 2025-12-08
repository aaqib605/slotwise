import { prop } from "ramda";
import { prisma } from "@/prisma";
import { Session } from "next-auth";

export async function getGoogleAccountByEmail(email: string) {
  return prisma.account.findFirst({
    where: {
      provider: "google",
      user: { email },
    },
  });
}

type Account = {
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
};

export async function updateAccessToken(
  account: Account,
  refreshed: Record<string, unknown>
): Promise<string> {
  const accessToken = prop("accessToken", refreshed) as string;

  const refreshToken =
    (prop("refreshToken", refreshed) as string) ??
    (account.refresh_token as string);

  const expiresAt = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

  await prisma.account.update({
    where: {
      provider_providerAccountId: {
        provider: "google",
        providerAccountId: account.providerAccountId,
      },
    },
    data: {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt,
    },
  });

  return accessToken;
}

export async function getCurrentUser(session: Session) {
  return prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
}
