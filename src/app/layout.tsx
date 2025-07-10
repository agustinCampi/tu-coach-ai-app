// src/app/layout.tsx
import "./globals.css";
import AuthProvider from "@/context/AuthContext";
import BottomNavBar from "@/components/bottom-nav-bar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-[#111715] text-white">
        <AuthProvider>
          {/* El children (el contenido de la página actual) debe ocupar el espacio restante */}
          <div className="flex-1 flex flex-col overflow-auto">{children}</div>
          <BottomNavBar />{" "}
          {/* <--- ¡MOVIDO AQUÍ! Ahora está dentro del AuthProvider */}
        </AuthProvider>
      </body>
    </html>
  );
}
