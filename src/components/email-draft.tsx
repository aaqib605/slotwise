"use client";

import { X, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmailDraft as EmailDraftType } from "@/features/email/types";

interface EmailDraftProps {
  draft: {
    to: string;
    subject: string;
    body: string;
  };
  setDraft: (draft: { to: string; subject: string; body: string }) => void;
  onClose: () => void;
  onSend: (emailDraft: EmailDraftType) => void;
}

export function EmailDraft({
  draft,
  setDraft,
  onClose,
  onSend,
}: EmailDraftProps) {
  function onSendEmail() {
    const emailDraft: EmailDraftType = {
      to: draft.to,
      subject: draft.subject,
      body: draft.body,
    };

    onSend(emailDraft);
    onClose();
  }

  return (
    <Card className="mb-10">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle>Email Draft</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label htmlFor="email-to" className="text-sm font-medium">
            To:
          </label>
          <Input
            id="email-to"
            value={draft.to}
            onChange={(e) => setDraft({ ...draft, to: e.target.value })}
            placeholder="recipient@example.com"
          />
        </div>
        <div>
          <label htmlFor="email-subject" className="text-sm font-medium">
            Subject:
          </label>
          <Input
            id="email-subject"
            value={draft.subject}
            onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
            placeholder="Email subject"
          />
        </div>
        <div>
          <label htmlFor="email-body" className="text-sm font-medium">
            Message:
          </label>
          <Textarea
            id="email-body"
            value={draft.body}
            onChange={(e) => setDraft({ ...draft, body: e.target.value })}
            placeholder="Email body"
            rows={5}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onSendEmail}>
          <Send className="h-4 w-4 mr-2" />
          Send Email
        </Button>
      </CardFooter>
    </Card>
  );
}
