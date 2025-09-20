"use client";
import AuthForm from "@/app/components/AuthForm";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegisterSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <AuthForm onRegisterSuccess={handleRegisterSuccess} isRegister={true} />
    </main>
  );
}
