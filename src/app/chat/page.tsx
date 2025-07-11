"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
// useRouter ya no es necesario aquí si la redirección se maneja en AuthContext
import { useAuth } from "@/context/AuthContext"; // Importa useAuth

import ChatMessage from "@/components/chat-message";
import DateSeparator from "@/components/date-separator";
import { Input } from "@/components/ui/input"; // Asegúrate de importar Input si no lo haces en otro lugar
import { Button } from "@/components/ui/button"; // Asegúrate de importar Button
import { Send, Mic } from "lucide-react"; // Iconos

export default function ChatPage() {
  const { currentUser, loading } = useAuth(); // Obtén currentUser y loading del contexto
  // const router = useRouter(); // Ya no se necesita aquí

  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirigir si no está autenticado (AHORA MANEJADO EN AUTHCONTEXT.JS)
  // useEffect(() => {
  //   if (!loading && !currentUser) {
  //     router.replace('/login');
  //   }
  // }, [currentUser, loading, router]);

  // Scroll al final de los mensajes
  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(
        () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        0
      );
    }
  }, [messages]);

  // Saludo inicial del AI Coach al cargar (solo si el usuario está autenticado y es la primera carga)
  useEffect(() => {
    if (currentUser && messages.length === 0 && !loading) {
      setMessages([
        {
          id: Date.now(),
          text: "¡Hola! Soy Tu Coach AI, tu entrenador personal inteligente. ¿En qué te puedo ayudar hoy?",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  }, [currentUser, messages.length, loading]);

  const handleSendMessage = async (messageText: string) => {
    if (messageText.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now() + 1,
          text: data.text,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error al enviar mensaje a la IA:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now() + 1,
          text: "Lo siento, tuve un problema al procesar tu solicitud. Por favor, intenta de nuevo.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };

  // El estado de carga global se maneja en AuthContext.js
  // Este componente solo se renderiza si el usuario está autenticado.
  return (
    <div className="flex flex-col h-full">
      {" "}
      {/* Este div toma el 100% de la altura del ChatLayout */}
      <main className="flex-1 overflow-y-auto p-4 pb-[170px]">
        <div className="flex flex-col gap-4">
          {messages.length > 0 && (
            <DateSeparator date={messages[0].timestamp.toLocaleDateString()} />
          )}
          {messages.map((msg, index) => (
            <React.Fragment key={msg.id}>
              <ChatMessage message={msg} isUser={msg.sender === "user"} />
            </React.Fragment>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 pt-2">
              <div className="size-8 shrink-0"></div>
              <div className="typing-indicator flex items-center gap-1.5 rounded-lg bg-[#293832] px-3 py-2">
                <span className="size-1.5 rounded-full bg-green-400"></span>
                <span className="size-1.5 rounded-full bg-green-400"></span>
                <span className="size-1.5 rounded-full bg-green-400"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <div className="fixed inset-x-0 bottom-[64px] z-20 border-t border-[#293832] bg-[#111715] p-4 flex flex-col items-center">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-2 w-full max-w-lg">
          {/* Botones de respuesta rápida (si los quieres de vuelta, este es el lugar) */}
          {/*
          {['Ver mi rutina de hoy', 'No tengo esta máquina', 'Tengo poca energía', 'Tengo una pregunta', 'Día de descanso'].map((text) => (
            <Button
              key={text}
              className="shrink-0 rounded-full bg-[#293832] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-400 hover:text-[#111715]"
              onClick={() => handleQuickReply(text)}
              disabled={isTyping}
            >
              {text}
            </Button>
          ))}
          */}
        </div>
        <div className="relative w-full max-w-lg">
          <Input
            className="w-full rounded-full border-none bg-[#293832] py-3 pl-4 pr-12 text-sm text-white placeholder:text-[#9eb7ae] focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Envía un mensaje a Tu Coach AI..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessage(inputMessage);
            }}
            disabled={isTyping}
          />
          <div className="absolute bottom-0 right-0 top-0 flex items-center pr-2">
            <Button
              className="flex size-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-700 hover:text-white"
              variant="ghost"
              size="icon"
              disabled={isTyping}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button
              className="flex size-8 items-center justify-center rounded-full bg-green-400 text-black hover:bg-green-400/90"
              size="icon"
              onClick={() => handleSendMessage(inputMessage)}
              disabled={isTyping}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
