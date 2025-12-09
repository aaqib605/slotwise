import { useState } from "react";
import { Calendar, Mail } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { Email } from "../../generated/prisma/client";

type EmailListProps = {
  emails: Email[];
  onEmailSelect?: (email: Email) => void;
};

export function EmailList({ emails, onEmailSelect }: EmailListProps) {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  function handleEmailSelect(email: Email) {
    setSelectedEmail(email.id);

    if (onEmailSelect) {
      onEmailSelect(email);
    }
  }

  if (!emails || emails.length === 0) {
    return (
      <>
        <h2 className="text-2xl font-bold mb-4">Email</h2>
        <div className="text-center text-muted-foreground py-8">
          <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Email integration would appear here.</p>
          <p className="text-sm">
            Try saying &quot;Draft an email to Alex saying thank you for your
            help&quot;
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-4">
      {emails.map((email) => (
        <Card
          key={email.id}
          className={cn(
            "cursor-pointer transition-all hover:shadow-md",
            selectedEmail === email.id && "border-primary ring-1 ring-primary"
          )}
          onClick={() => handleEmailSelect(email)}
        >
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div className="flex-1">
                <h3 className="text-lg font-bold">{email.subject}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="font-normal">
                      To: {email.to}
                    </Badge>
                  </div>
                  <div className="hidden sm:block text-muted-foreground">•</div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {format(email.createdAt, "MMM d, yyyy 'at' h:mm a")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-3" />

            <p className="text-sm text-muted-foreground line-clamp-2">
              {email.body.length > 100
                ? `${email.body.substring(0, 100)}...`
                : email.body}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
