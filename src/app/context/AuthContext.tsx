"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_COOKIE = "authToken";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenFromCookie = Cookies.get(AUTH_TOKEN_COOKIE);
    if (tokenFromCookie) {
      try {
        const decodedUser: any = jwtDecode(tokenFromCookie);
        setUser({
          _id: decodedUser.sub,
          username: decodedUser.username,
          email: "",
        });
        setToken(tokenFromCookie);
      } catch (error) {
        console.error("Invalid token:", error);
        Cookies.remove(AUTH_TOKEN_COOKIE);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    try {
      const decodedUser: any = jwtDecode(newToken);
      setUser({
        _id: decodedUser.sub,
        username: decodedUser.username,
        email: "",
      });
      setToken(newToken);
      Cookies.set(AUTH_TOKEN_COOKIE, newToken, { expires: 1, secure: true });
    } catch (error) {
      console.error("Failed to decode token on login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove(AUTH_TOKEN_COOKIE);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
