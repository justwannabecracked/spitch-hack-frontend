"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
interface AuthFormProps {
  isRegister: boolean;
  onLoginSuccess?: () => void;
  onRegisterSuccess?: () => void;
}

export default function AuthForm({
  isRegister,
  onLoginSuccess,
  onRegisterSuccess,
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = isRegister
      ? "https://spitch-hack-backend.onrender.com/api/v1/auth/signup"
      : "https://spitch-hack-backend.onrender.com/api/v1/auth/login";

    const payload = isRegister
      ? { username, email, password }
      : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred. Please try again.");
      }

      if (isRegister) {
        toast.success("Account created successfully! Please log in.");
        if (onRegisterSuccess) onRegisterSuccess();
      } else {
        toast.success("Login successful!");
        login(data.accessToken);
        if (onLoginSuccess) onLoginSuccess();
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <div className="flex justify-center items-center">
          <Link href="/" className="inline-flex">
            <Image
              className="h-12 w-auto"
              src="/favicon.ico"
              alt="Akawo Logo"
              width={48}
              height={48}
            />
            <h1 className="text-3xl font-thin text-gray-900 ml-4">Akawo</h1>
          </Link>
        </div>
        <h2 className="my-6 text-center text-3xl font-bold text-gray-900">
          {isRegister ? "Create a new account" : " Login to your account"}
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {isRegister && (
            <div className="py-2">
              <label htmlFor="username" className="py-2 text-gray-500">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-600 focus:outline-none focus:border-blue-300"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="py-2">
            <label htmlFor="email-address" className="py-2 text-gray-500">
              Email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-600 focus:outline-none focus:border-blue-300"
              placeholder="balamia@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="py-2">
            <label htmlFor="password" className="py-4 text-gray-500">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              required
              className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-600 focus:outline-none focus:border-blue-300"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-black focus:outline-none "
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-white-500 group-hover:text-white-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {isLoading
              ? "Processing..."
              : isRegister
              ? "Get Started"
              : "Login now"}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium text-gray-600 hover:text-blue-200">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </span>
          </div>

          <div className="text-sm">
            <Link
              href={isRegister ? "/login" : "/register"}
              className="font-medium text-blue-500 hover:text-blue-200"
            >
              {isRegister ? "Login" : "Register"}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
