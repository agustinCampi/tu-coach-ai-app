"use client"; // Necesario para componentes que usan hooks o interactividad directa

import React, { useState } from "react"; // Importado useState para el input del layout
import { Dumbbell, Send, Mic } from "lucide-react"; // Iconos para el header y el input
import { Input } from "@/components/ui/input"; // Importa Input
import { Button } from "@/components/ui/button"; // Importa Button
import { cn } from "@/lib/utils"; // Importa cn si lo usas en botones de respuesta rápida

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Estos estados y funciones ahora residen aquí en el layout
  // y se pasarán a la página de chat si es necesario, o se manejarán aquí directamente.
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Este estado se controlará desde page.tsx

  // Placeholder para la funcionalidad del input (se conectará a page.tsx)
  // handleSendMessage y handleQuickReply se pasarán como props a ChatPage
  // o ChatPage tendrá acceso a ellos a través de un contexto o directamente.
  // Por ahora, solo definimos placeholders.
  const handleSendMessageClick = (messageText: string) => {
    // Esta función será llamada por el input y los quick replies
    // y enviará el mensaje a la lógica real en ChatPage.
    console.log("Mensaje enviado desde layout:", messageText);
    // setInputMessage(''); // Limpiar input después de enviar
    // setIsTyping(true); // Activar indicador de escribiendo
  };

  const handleQuickReplyClick = (text: string) => {
    // setInputMessage(text); // Pone el texto en el input
    // handleSendMessageClick(text); // Envía el mensaje de respuesta rápida directamente
  };

  return (
    <div className="flex flex-col h-full bg-[#111715] text-white">
      {" "}
      {/* h-full para que ocupe el espacio del RootLayout */}
      {/* Header específico de la página de chat */}
      <header className="flex items-center justify-between border-b border-solid border-b-[#293832] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-green-400 p-1.5 text-black">
            <Dumbbell className="h-full w-full" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Tu Coach AI</h2>
        </div>
      </header>
      {/* Área principal de contenido (donde irá el chat/page.tsx) */}
      {/* Añadimos padding-bottom para el espacio del input NO fijo, sino que es parte del flujo */}
      <main className="flex-1 overflow-y-auto p-4 pb-[120px]">
        {" "}
        {/* <--- CAMBIADO: pb ajustado para el input que NO es fijo */}
        <div className="flex flex-col gap-4">
          {children}{" "}
          {/* Aquí se renderizará src/app/chat/page.tsx (solo los mensajes) */}
        </div>
      </main>
      {/* Input Area and Quick Replies - Ahora es parte del flujo del layout, NO fijo al viewport */}
      {/* Se posiciona al final del flex-col del layout, justo encima del BottomNavBar global */}
      <div className="border-t border-[#293832] bg-[#111715] p-4 flex flex-col items-center">
        {" "}
        {/* <--- CAMBIADO: Removido 'fixed inset-x-0 bottom-0 z-10' */}
        <div className="mb-3 flex gap-2 overflow-x-auto pb-2 w-full max-w-lg">
          {[
            "Ver mi rutina de hoy",
            "No tengo esta máquina",
            "Tengo poca energía",
            "Tengo una pregunta",
            "Día de descanso",
          ].map((text) => (
            <Button
              key={text}
              className="shrink-0 rounded-full bg-[#293832] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-400 hover:text-[#111715]"
              onClick={() => handleQuickReplyClick(text)}
              disabled={isTyping}
            >
              {text}
            </Button>
          ))}
        </div>
        <div className="relative w-full max-w-lg">
          <Input
            className="w-full rounded-full border-none bg-[#293832] py-3 pl-4 pr-12 text-sm text-white placeholder:text-[#9eb7ae] focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Envía un mensaje a Tu Coach AI..."
            value={inputMessage} // Estado del input
            onChange={(e) => setInputMessage(e.target.value)} // Manejo del cambio
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessageClick(inputMessage); // Envío al presionar Enter
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
              onClick={() => handleSendMessageClick(inputMessage)} // Envío al hacer click
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
