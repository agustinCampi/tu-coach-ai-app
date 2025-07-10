"use client";

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // Importa useRouter y usePathname
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app, auth } from "@/lib/firebase";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Inicializa useRouter
  const pathname = usePathname(); // Obtiene la ruta actual

  // Rutas que son explícitamente públicas (accesibles sin autenticación)
  const publicRoutes = ["/login", "/register"];
  // Rutas protegidas que solo los autenticados pueden ver
  const protectedRoutes = ["/chat", "/rutina", "/perfil"];

  const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        Cookies.set("firebaseAuthToken", userCredential.user.uid, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
        });
        return userCredential;
      }
    );
  };

  const signInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        Cookies.set("firebaseAuthToken", userCredential.user.uid, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
        });
        return userCredential;
      }
    );
  };

  const signOutUser = () => {
    return signOut(auth).then(() => {
      Cookies.remove("firebaseAuthToken");
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (!user) {
        Cookies.remove("firebaseAuthToken");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Lógica de redirección centralizada
  useEffect(() => {
    // Si aún está cargando el estado de autenticación, no redirigir
    if (loading) return;

    const isPublicRoute = publicRoutes.includes(pathname);
    const isProtectedRoute = protectedRoutes.includes(pathname);

    // Caso 1: Usuario NO autenticado y en una ruta protegida
    if (!currentUser && isProtectedRoute) {
      router.replace("/login"); // Redirige a login
      return;
    }

    // Caso 2: Usuario SÍ autenticado y en una ruta pública (login/register)
    if (currentUser && isPublicRoute) {
      router.replace("/chat"); // Redirige al chat
      return;
    }
  }, [currentUser, loading, pathname, router]); // Dependencias del useEffect

  const value = {
    currentUser,
    loading,
    signUpWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Muestra un cargando global mientras se determina el estado de autenticación */}
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-[#1C1C1E] text-white">
          Cargando autenticación...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
