import { createContext } from "react";

export const AuthContext = createContext(null);

export const getInitialAuthState = () => {
  const storedToken = localStorage.getItem("authToken");
  const storedUser = localStorage.getItem("authUser");

  return {
    token: storedToken || null,
    user: storedUser ? JSON.parse(storedUser) : null,
  };
};
