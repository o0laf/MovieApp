import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initDB, getUserByUsername } from "../services/db";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingInit, setLoadingInit] = useState(true);

  useEffect(() => {
    (async () => {
      await initDB();
      const raw = await AsyncStorage.getItem("loggedUser");
      if (raw) setUser(JSON.parse(raw));
      setLoadingInit(false);
    })();
  }, []);

  const login = async (username, password) => {
    const dbUser = await getUserByUsername(username);
    if (!dbUser) throw new Error("Usuario no existe");
    if (dbUser.password !== password) throw new Error("Contraseña incorrecta");
    const sessionUser = {
      id: dbUser.id,
      name: dbUser.name,
      username: dbUser.username,
      role: dbUser.role,
    };
    await AsyncStorage.setItem("loggedUser", JSON.stringify(sessionUser));
    setUser(sessionUser);
    return sessionUser;
  };

  const logout = async () => {
    await AsyncStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loadingInit, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
