"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dumbbell } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Assuming you want to store the name too
  const [error, setError] = useState<string | null>(null);

  // You'll need to import and use your AuthContext here
  // For now, we'll add a placeholder comment.
  // const { signUpWithEmailAndPassword } = useAuth();
  // const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm border-0 bg-[#2C2C2E]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
             <Dumbbell className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-white">Crear una cuenta</CardTitle>
          <CardDescription className="text-muted-foreground">
            Ingresa tus datos para empezar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {/* Replace the div with a form element */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null); // Clear previous errors
              try {
                // await signUpWithEmailAndPassword(email, password);
                // router.push('/chat'); // Redirect to chat on success
              } catch (err: any) {
                setError(err.message);
              }
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-[#3A3A3C] border-0 text-white placeholder:text-muted-foreground"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Contraseña</Label>
              <Input
                id="password"
                type="password"
                required
                className="bg-[#3A3A3C] border-0 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Change the Link/Button to a submit button for the form */}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Crear Cuenta
            </Button>
            {/* Removed the Link and used a submit button */}

          </div>
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="underline text-primary">
              Inicia Sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
