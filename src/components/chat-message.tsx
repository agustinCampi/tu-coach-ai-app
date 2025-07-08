import React from "react";
import Image from "next/image";

interface ChatMessageProps {
  message: {
    id: number;
    text: string;
    sender: "user" | "ai";
    timestamp: Date;
  };
  isUser: boolean;
}

export default function ChatMessage({ message, isUser }: ChatMessageProps) {
  const messageClass = isUser
    ? "flex items-end justify-end gap-2"
    : "flex items-end gap-2";
  const bubbleClass = isUser
    ? "max-w-xs rounded-lg rounded-br-none bg-[#1fdf95] px-3 py-2 text-sm text-[#111715]" // Color verde para usuario
    : "max-w-xs rounded-lg rounded-bl-none bg-[#293832] px-3 py-2 text-sm text-white"; // Gris oscuro para AI

  const userAvatarSrc = "https://www.gravatar.com/avatar/?d=mp&s=128"; // Placeholder genérico para usuario
  const aiAvatarSrc = "https://cdn-icons-png.flaticon.com/512/8943/8943377.png"; // Placeholder simple de robot para AI

  return (
    <div className={messageClass}>
      {!isUser && ( // Avatar AI a la izquierda
        <div className="size-8 shrink-0 rounded-full bg-cover bg-center bg-no-repeat overflow-hidden">
          <Image src={aiAvatarSrc} alt="AI Avatar" width={32} height={32} />
        </div>
      )}
      <div
        className="flex flex-col"
        style={
          isUser ? { alignItems: "flex-end" } : { alignItems: "flex-start" }
        }
      >
        <p className="text-xs text-[#9eb7ae]">{isUser ? "Tú" : "AI Coach"}</p>
        <p className={bubbleClass}>{message.text}</p>
        <p className="text-xs text-[#9eb7ae] mt-1">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      {isUser && ( // Avatar usuario a la derecha
        <div className="size-8 shrink-0 rounded-full bg-cover bg-center bg-no-repeat overflow-hidden">
          <Image src={userAvatarSrc} alt="User Avatar" width={32} height={32} />
        </div>
      )}
    </div>
  );
}
