import { EmailDraft } from "./types";

export function parseEmailDraft(message: string): EmailDraft {
  const toMatch = message.match(/to\s+([^\s]+@[^\s]+)(?=\s|$)/i);
  const subjectMatch = message.match(/subject\s*["'](.+?)["']/i);
  const bodyMatch = message.match(/body\s*["']([\s\S]+?)["'](?=\s*$)/i);

  return {
    to: toMatch ? toMatch[1].trim() : "",
    subject: subjectMatch ? subjectMatch[1].trim() : "No Subject",
    body: bodyMatch ? bodyMatch[1].trim() : "",
  };
}

export function createRawEmail({ to, subject, body }: EmailDraft) {
  const emailLines = [
    `To: ${to}`,
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${subject}`,
    "",
    body,
  ];

  const email = emailLines.join("\n");
  const encodedEmail = Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return encodedEmail;
}
