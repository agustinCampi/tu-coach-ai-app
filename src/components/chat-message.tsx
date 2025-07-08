import { cn } from "@/lib/utils";
import type { Message } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAi = message.type === 'ai';

  return (
    <div className={cn("flex items-end space-x-2", isAi ? "justify-start" : "justify-end")}>
      {isAi && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn("flex flex-col space-y-1", isAi ? "items-start" : "items-end", "max-w-[80%]")}>
        <div
          className={cn(
            "px-4 py-3 rounded-2xl text-white",
            isAi ? "bg-primary rounded-bl-none" : "bg-[#2C2C2E] rounded-br-none"
          )}
        >
          <p className="text-sm">{message.text}</p>
        </div>
        <span className="text-xs text-muted-foreground">
          {message.timestamp}
        </span>
      </div>
      {!isAi && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
