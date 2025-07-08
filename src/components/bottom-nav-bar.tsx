"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Dumbbell, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/rutina", label: "Rutina", icon: Dumbbell },
  { href: "/perfil", label: "Perfil", icon: User },
];

export function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#1C1C1E] border-t border-border">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex-1" prefetch={false}>
              <div
                className={cn(
                  "flex flex-col items-center justify-center p-3 text-muted-foreground hover:text-primary transition-colors",
                  isActive && "text-primary"
                )}
              >
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-xs">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
