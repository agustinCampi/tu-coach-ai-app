import Link from 'next/link';

export default function RutinaPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Página de Rutina</h1>
      <p className="text-muted-foreground">Esta página está en construcción.</p>
      <Link href="/chat" className="mt-4 text-primary underline">Volver al Chat</Link>
    </div>
  );
}
