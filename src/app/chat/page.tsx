"use client"; // Necesario para usar hooks de React

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import ChatMessage from "@/components/chat-message";
import DateSeparator from "@/components/date-separator";

export default function ChatPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState(""); // Mantenemos el estado aquí
  const [isTyping, setIsTyping] = useState(false); // Mantenemos el estado aquí
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, loading, router]);

  // Scroll al final de los mensajes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Saludo inicial del AI Coach al cargar
  useEffect(() => {
    if (currentUser && messages.length === 0) {
      setMessages([
        {
          id: Date.now(),
          text: "¡Hola! Soy Tu Coach AI, tu entrenador personal inteligente. ¿En qué te puedo ayudar hoy?",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  }, [currentUser, messages.length]);

  // handleSendMessage y handleQuickReply se pasan al layout o se conectan de otra forma
  // Por ahora, los definimos aquí para la lógica de la conversación
  const handleSendMessage = async (messageText: string) => {
    // Recibe el texto como argumento
    if (messageText.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage(""); // Limpiar input después de enviar
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
    handleSendMessage(text); // Envía el mensaje de respuesta rápida directamente
  };

  if (loading || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1C1C1E] text-white">
        Cargando...
      </div>
    );
  }

  return (
    <>
      {" "}
      {/* Este Fragmento envuelve solo el contenido de los mensajes */}
      {/* Main Chat Area - Ahora es parte del children del ChatLayout */}
      {/* El padding-bottom se maneja en ChatLayout.tsx */}
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
          <div className="size-8 shrink-0">
            {/* Placeholder para avatar AI */}
          </div>
          <div className="typing-indicator flex items-center gap-1.5 rounded-lg bg-[#293832] px-3 py-2">
            <span className="size-1.5 rounded-full bg-green-400"></span>
            <span className="size-1.5 rounded-full bg-green-400"></span>
            <span className="size-1.5 rounded-full bg-green-400"></span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} /> {/* Elemento para scroll */}
      {/* El Input Area y Quick Replies NO van aquí, van en ChatLayout.tsx */}
    </>
  );
}
