"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth"; // Asegúrate de importar signOut aquí
import { app, auth } from "@/lib/firebase"; // Importa 'app' y 'auth' desde tu archivo firebase.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"; // Importa estas funciones

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  // Exportación por defecto
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // No inicialices 'auth' aquí de nuevo; ya lo importaste desde '@/lib/firebase'
  // Puedes usar directamente la instancia 'auth' importada.

  const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password); // Usa 'auth' importado
  };

  const signInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password); // Usa 'auth' importado
  };

  const signOutUser = () => {
    return signOut(auth); // Usa 'auth' importado
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Usa 'auth' importado
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]); // Asegúrate que 'auth' sea una dependencia estable, la importación lo es

  const value = {
    currentUser,
    loading,
    signUpWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
