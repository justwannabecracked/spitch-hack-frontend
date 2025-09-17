"use client";

import { useState } from "react";
import { toast } from "react-toastify";

interface AuthFormProps {
  onLoginSuccess: (token: string) => void;
}

export default function AuthForm({ onLoginSuccess }: AuthFormProps) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = isLoginView
      ? "https://spitch-hack-backend.onrender.com/api/v1/auth/login"
      : "https://spitch-hack-backend.onrender.com/api/v1/auth/signup";

    const payload = isLoginView
      ? { email, password }
      : { username, email, password };

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

      toast.success(
        isLoginView ? "Login successful!" : "Account created successfully!"
      );
      onLoginSuccess(data.accessToken);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-black rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          {isLoginView ? "Welcome Back" : "Create an Account"}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* All form fields remain the same */}
        {!isLoginView && (
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isLoginView ? "current-password" : "new-password"}
            required
            className="w-full input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 btn-primary"
        >
          {isLoading
            ? "Processing..."
            : isLoginView
            ? "Login"
            : "Create Account"}
        </button>
      </form>
      <p className="text-sm text-center text-gray-600">
        {isLoginView ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => setIsLoginView(!isLoginView)}
          className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
        >
          {isLoginView ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}
