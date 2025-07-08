import './globals.css';
import AuthProvider from '@/context/AuthContext';
import BottomNavBar from '@/components/bottom-nav-bar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full"> {/* <--- CAMBIADO: Añadido 'h-full' a html */}
      <body className="font-body antialiased bg-background text-foreground flex flex-col h-full"> {/* <--- CAMBIADO: Añadido 'flex flex-col h-full' a body */}
        <AuthProvider>
          {children}
        </AuthProvider>
        {/* BottomNavBar ya está 'fixed bottom-0' en su propio componente, no necesita estarlo por el padre aquí */}
        {/* Si BottomNavBar ya está en el layout del chat, NO lo pongas aquí */}
        <BottomNavBar />
      </body>
    </html>
  );
}