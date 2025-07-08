"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dumbbell } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm border-0 bg-[#2C2C2E]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Dumbbell className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-white">Bienvenido a Tu Coach AI</CardTitle>
          <CardDescription className="text-muted-foreground">
            Inicia sesión para continuar con tu entrenador personal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-[#3A3A3C] border-0 text-white placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-white">Contraseña</Label>
                <Link href="#" className="ml-auto inline-block text-sm text-muted-foreground hover:text-primary" prefetch={false}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input id="password" type="password" required className="bg-[#3A3A3C] border-0 text-white" />
            </div>
            <Link href="/chat" className="w-full" passHref>
              <Button asChild type="button" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <div role="button">Iniciar Sesión</div>
              </Button>
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="underline text-primary">
              Regístrate
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
