"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface User {
  loggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start as true

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("akawo_token");
      if (storedToken) {
        setToken(storedToken);
        // In a real app, you would verify the token with your backend here
        setUser({ loggedIn: true });
      }
    } catch (error) {
      // Handle potential errors with localStorage
      console.error("Could not read from local storage", error);
    } finally {
      setIsLoading(false); // We're done checking, so set loading to false
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("akawo_token", newToken);
    setToken(newToken);
    setUser({ loggedIn: true });
  };

  const logout = () => {
    localStorage.removeItem("akawo_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access the context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
