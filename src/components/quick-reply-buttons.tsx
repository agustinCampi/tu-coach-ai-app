"use client";

import { Button } from "@/components/ui/button";

const quickReplies = [
  "Ver mi rutina de hoy",
  "No tengo esta máquina",
  "Tengo poca energía",
  "Tengo una pregunta",
  "Día de descanso",
];

interface QuickReplyButtonsProps {
  onQuickReply: (reply: string) => void;
  isLoading: boolean;
}

export function QuickReplyButtons({ onQuickReply, isLoading }: QuickReplyButtonsProps) {
  return (
    <div className="px-4 pb-2">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {quickReplies.map((reply) => (
          <Button
            key={reply}
            variant="outline"
            size="sm"
            className="bg-[#3A3A3C] border-0 text-primary whitespace-nowrap rounded-full h-8 px-4 hover:bg-primary/20 hover:text-primary disabled:opacity-50"
            onClick={() => onQuickReply(reply)}
            disabled={isLoading}
          >
            {reply}
          </Button>
        ))}
      </div>
    </div>
  );
}
