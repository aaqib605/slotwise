import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Message } from "../../generated/prisma/client";

export const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex items-start gap-3", isUser && "justify-end")}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {message.content}
      </div>

      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
