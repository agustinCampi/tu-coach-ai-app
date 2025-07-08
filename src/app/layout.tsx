import "./globals.css";
import AuthProvider from "@/context/AuthContext";
import BottomNavBar from "@/components/bottom-nav-bar"; // Importación por defecto

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased bg-background text-foreground">
        <AuthProvider>
          {children}{" "}
          {/* Este 'children' serán las páginas o los layouts anidados */}
        </AuthProvider>
        <BottomNavBar />{" "}
        {/* <-- ¡La barra de navegación GLOBAL, una sola vez aquí! */}
      </body>
    </html>
  );
}
