import "./globals.css";
import AuthProvider from "@/context/AuthContext"; // Importación por defecto

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider> {/* Usa AuthProvider aquí */}
      </body>
    </html>
  );
}
