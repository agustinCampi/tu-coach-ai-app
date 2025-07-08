"use client"; // Necesario para usar hooks como usePathname y Link

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Dumbbell, User } from "lucide-react"; // Iconos
import { cn } from "@/lib/utils"; // Tu utilidad para combinar clases

const navItems = [
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/rutina", label: "Rutina", icon: Dumbbell },
  { href: "/perfil", label: "Perfil", icon: User },
];

export default function BottomNavBar() {
  // <--- CAMBIADO: 'export default function'
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#111715] border-t border-[#3d524a]">
      {" "}
      {/* <--- CAMBIADO: 'fixed bottom-0 left-0 right-0 z-50' y colores */}
      <div className="flex justify-around max-w-lg mx-auto">
        {" "}
        {/* <--- CAMBIADO: 'max-w-lg' para centrar y limitar ancho */}
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1"
              prefetch={false}
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center py-2.5 gap-1.5 transition-colors", // Ajustado padding y gap
                  isActive
                    ? "text-[#34C759] border-t-2 border-[#34C759]"
                    : "text-[#9eb7ae] border-t-2 border-transparent hover:text-white" // Colores de activo y hover
                )}
              >
                <item.icon className="h-6 w-6" /> {/* Ajustado a h-6 w-6 */}
                <span className="text-xs font-bold">{item.label}</span>{" "}
                {/* Añadido font-bold */}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
