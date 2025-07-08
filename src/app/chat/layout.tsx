import { BottomNavBar } from '@/components/bottom-nav-bar';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
      <BottomNavBar />
    </div>
  );
}
