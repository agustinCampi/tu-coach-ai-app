'use client';

import React from 'react';
import { Dumbbell } from 'lucide-react';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full bg-[#111715] text-white"> {/* <--- CAMBIADO: h-full y flex-col */}
      {/* Header específico de la página de chat */}
      <header className="flex items-center justify-between border-b border-solid border-b-[#293832] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-green-400 p-1.5 text-black">
            <Dumbbell className="h-full w-full" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Tu Coach AI</h2>
        </div>
      </header>

      <div className="flex-1 flex flex-col"> {/* <--- CAMBIADO: flex-1 flex flex-col */}
        {children} {/* Aquí se renderizará src/app/chat/page.tsx */}
      </div>
    </div>
  );
}