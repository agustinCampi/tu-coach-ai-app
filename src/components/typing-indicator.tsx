import { Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TypingIndicator() {
  return (
    <div className="flex items-end space-x-2 p-4 animate-in fade-in duration-500">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
      <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-bl-none flex items-center space-x-1">
        <span className="sr-only">Coach AI está escribiendo...</span>
        <div className="h-2 w-2 bg-primary-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-primary-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-primary-foreground rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
