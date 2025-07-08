import { BottomNavBar } from '@/components/bottom-nav-bar';

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <main className="flex-1 overflow-hidden">{children}</main>
      <BottomNavBar />
    </div>
  );
}
