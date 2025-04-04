"use client";
import { createContext, useContext, useEffect, useState } from "react";
interface User {
  user: string;
  password: string;
}

interface AuthContextType {
  userLogged: User | null;
  /*   login: (user: string, password: string) => Promise<void>; */
  logout: () => void;
  checkToken: () => void;
  setUserLogged: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userLogged, setUserLogged] = useState<User | null>(null);
  const checkToken = async () => {
    try {
      const response = await fetch("/api/check_token", {
        method: "POST",  // O GET si prefieres
        credentials: "include", // 🔹 Importante para enviar cookies al backend
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Token inválido o expirado");
      }

      const data = await response.json();
      console.log(data)
      console.log("Usuario autenticado:", data.user);
      return data.user; // Devuelve el usuario autenticado
    } catch (error) {
      console.error("Error al verificar el token:", error);
      return null;
    }
  };
  useEffect(() => {
    checkToken().then((authenticatedUser) => {
      if (authenticatedUser) {
        setUserLogged(authenticatedUser);
      }
    });
  }, []);
  
  // Función de logout
  const logout = () => setUserLogged(null);

  return (
    <AuthContext.Provider value={{
      userLogged,
      /*    login, */
      checkToken,
      logout,
      setUserLogged: setUserLogged,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
