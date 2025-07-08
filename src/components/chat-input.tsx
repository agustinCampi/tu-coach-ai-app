"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Send } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";

interface ChatInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInput({ value, onChange, onSubmit, isLoading }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-4 bg-background border-t border-border">
      <div className="relative flex items-center">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute left-2 text-muted-foreground hover:text-primary"
          disabled={isLoading}
        >
          <Mic className="h-5 w-5" />
          <span className="sr-only">Usar micrófono</span>
        </Button>
        <Input
          value={value}
          onChange={onChange}
          placeholder="Envía un mensaje a Tu Coach AI..."
          className="bg-[#2C2C2E] border-0 rounded-full h-12 pr-12 pl-12 w-full text-white placeholder:text-muted-foreground"
          disabled={isLoading}
          autoComplete="off"
        />
        <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute right-2 text-muted-foreground hover:text-primary disabled:opacity-50"
            disabled={isLoading || !value.trim()}
        >
            <Send className="h-5 w-5" />
            <span className="sr-only">Enviar mensaje</span>
        </Button>
      </div>
    </form>
  );
}
