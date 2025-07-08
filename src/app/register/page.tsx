"use client"; // Necesario para usar hooks de React en Next.js App Router

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dumbbell } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // Importa tu hook de autenticación
import { useRouter } from "next/navigation"; // Importa useRouter para redirección

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState(""); // Si no usas el nombre en Firebase Auth, puedes eliminarlo
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  const { signUpWithEmailAndPassword } = useAuth(); // Usa tu hook de autenticación
  const router = useRouter(); // Inicializa el router de Next.js

  const handleSubmit = async (e: React.FormEvent) => {
    // Define el tipo de evento
    e.preventDefault();
    setError(null); // Limpia errores previos
    setLoading(true); // Activa el estado de carga

    try {
      await signUpWithEmailAndPassword(email, password);
      router.push("/chat"); // Redirige a /chat en caso de éxito
    } catch (err: any) {
      // Captura y tipa el error
      console.error("Error al registrar:", err);
      // Mensajes de error más amigables (ej. Firebase errors)
      if (err.code === "auth/email-already-in-use") {
        setError("El email ya está registrado. Intenta iniciar sesión.");
      } else if (err.code === "auth/weak-password") {
        setError("La contraseña es muy débil (mínimo 6 caracteres).");
      } else {
        setError(err.message || "Error al registrar la cuenta.");
      }
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1C1C1E] p-4">
      {" "}
      {/* Asegúrate del color de fondo consistente */}
      {/* El Card debe estar dentro del div padre flex */}
      <Card className="w-full max-w-sm border-0 bg-[#2C2C2E] text-white">
        {" "}
        {/* Ajuste de color y texto */}
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Dumbbell className="w-12 h-12 text-[#34C759]" />{" "}
            {/* Color de acento */}
          </div>
          <CardTitle className="text-2xl text-white">
            Crear una cuenta
          </CardTitle>
          <CardDescription className="text-[#8E8E93]">
            {" "}
            {/* Color de texto secundario */}
            Ingresa tus datos para empezar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-[#3A3A3C] border-0 text-white placeholder:text-[#8E8E93]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                required
                className="bg-[#3A3A3C] border-0 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#34C759] hover:bg-[#34C759]/90 text-black"
              disabled={loading}
            >
              {" "}
              {/* Color de acento y texto, disabled */}
              {loading ? "Registrando..." : "Crear Cuenta"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="underline text-[#34C759]">
              {" "}
              {/* Color de acento para el link */}
              Inicia Sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
