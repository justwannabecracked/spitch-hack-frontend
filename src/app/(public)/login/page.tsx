"use client";
import AuthForm from "@/app/components/AuthForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <AuthForm onLoginSuccess={handleLoginSuccess} isRegister={false} />
    </main>
  );
}
