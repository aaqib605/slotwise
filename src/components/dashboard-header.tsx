import { Bot, Settings, Bell, User } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="border-b z-40 h-14 w-full md:w-[calc(100%-var(--sidebar-width))] fixed bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-full  items-center px-4">
        <div className="flex items-center gap-2 font-semibold">
          <Bot className="h-5 w-5 text-primary" />
          <span>Slotwise</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
