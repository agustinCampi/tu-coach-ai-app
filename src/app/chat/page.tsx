"use client"; // Necesario para usar hooks de React

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import ChatMessage from "@/components/chat-message";
// Importar componentes de UI si se usan directamente (asegúrate de tenerlos o usa elementos HTML simples)
// import { Input } from "@/components/ui/input"; // Si tienes un componente Input de shadcn/ui o similar
// import { Button } from "@/components/ui/button"; // Si tienes un componente Button de shadcn/ui o similar

export default function ChatPage() {
  // Autenticación y redirección
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
      // Usar setTimeout para asegurar que el DOM se ha actualizado después de añadir mensajes
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 0);
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

  // Lógica para enviar mensajes a la API
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

  // Lógica para manejar las respuestas rápidas (ahora integradas en esta página)
  const handleQuickReply = (text: string) => {
    handleSendMessage(text); // Envía el mensaje de respuesta rápida directamente
  };

  // Renderizar estado de carga o redirección
  if (loading || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1C1C1E] text-white">
        Cargando...
      </div>
    );
  } // Si no está cargando y hay usuario, renderiza la UI del chat

  return (
    // Contenedor principal que ocupa toda la altura disponible (excepto barra de navegación)
    // Assuming the root layout handles the overall h-screen and padding for top/bottom bars (if any)
    // This div will be flex column to manage content area and fixed input area
    <div className="flex flex-col h-full">
      {/* Área de mensajes - flex-1 para ocupar espacio, overflow para scroll */}
      <main className="flex-1 overflow-y-auto p-4 pb-28"> {/* Añadir padding-bottom */}
        <div className="flex flex-col gap-4">
          {messages.map((msg, index) => (
            <ChatMessage key={msg.id} message={msg} isUser={msg.sender === "user"} />
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 pt-2">
              <div className="size-8 shrink-0">
                {/* Placeholder para avatar AI o usa un componente de avatar */}
              </div>
              <div className="typing-indicator flex items-center gap-1.5 rounded-lg bg-[#293832] px-3 py-2">
                <span className="size-1.5 rounded-full bg-green-400"></span>
                <span className="size-1.5 rounded-full bg-green-400"></span>
                <span className="size-1.5 rounded-full bg-green-400"></span>
              </div>
            </div>
          )}
          {/* Elemento para scroll hasta el final */}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Área de Input y Botones - Fija en la parte inferior */}
      <div className="fixed inset-x-0 bottom-[64px] z-50 border-t border-[#293832] bg-[#111715] p-4"> {/* Ajusta bottom según la altura de tu nav bar y z-index para estar por encima */}
        {/* Quick Reply Buttons (si los quieres de vuelta, este es el lugar) */}
        {/*
        <div className="flex flex-wrap gap-2 mb-4">
           {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              className="px-4 py-2 text-sm font-medium rounded-full bg-[#293832] text-[#1fdf95] hover:bg-[#3a4c45] transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
        */}

        {/* Input Area */}
        <div className="relative flex items-center">
          <input
            className="flex-1 rounded-full border-none bg-[#293832] py-3 pl-4 pr-24 text-sm text-white placeholder:text-[#9eb7ae] focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Envía un mensaje a Tu Coach AI..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(inputMessage);
              }
            }}
          />
          <div className="absolute right-0 flex items-center pr-2">
            {/* Botón Micrófono */}
            <button className="flex size-8 items-center justify-center rounded-full text-gray-400 hover:bg-[#293832] hover:text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <path d="M12 19v4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
            {/* Botón Enviar */}
            <button
              onClick={() => handleSendMessage(inputMessage)}
              className="flex size-8 items-center justify-center rounded-full bg-green-400 text-black ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!inputMessage.trim()}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <path d="M22 2L15 22L11 13L2 9L22 2z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

