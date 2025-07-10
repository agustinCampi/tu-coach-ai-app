"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Dumbbell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/chat", label: "Chat", icon: MessageSquare, authRequired: true },
  { href: "/rutina", label: "Rutina", icon: Dumbbell, authRequired: true },
  { href: "/perfil", label: "Perfil", icon: User, authRequired: true },
];

export default function BottomNavBar() {
  const pathname = usePathname();
  const { currentUser, loading } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#111715] border-t border-[#3d524a]">
      <div className="flex justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          // Deshabilitar el enlace si requiere autenticación Y (no hay usuario O está cargando)
          // Esto hace que el enlace no sea clickeable si no está autenticado o si el estado aún no se ha resuelto.
          const isDisabled = item.authRequired && (!currentUser || loading);

          return (
            <Link
              key={item.href}
              // Si el enlace está deshabilitado, el href apunta a la misma página para evitar navegación
              // Esto es una capa extra de precaución.
              href={isDisabled ? pathname : item.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2.5 gap-1.5 transition-colors",
                isActive
                  ? "text-[#34C759] border-t-2 border-[#34C759]"
                  : "text-[#9eb7ae] border-t-2 border-transparent hover:text-white",
                isDisabled && "opacity-50 cursor-not-allowed" // Estilo para deshabilitado
              )}
              prefetch={false} // Deshabilitar prefetch para evitar carga temprana de la página protegida
              onClick={(e) => {
                // Prevenir la navegación si el enlace está lógicamente deshabilitado
                if (isDisabled) {
                  e.preventDefault();
                  console.log(
                    "Acceso denegado: Inicia sesión para acceder a esta sección."
                  );
                }
              }}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
