"use client";

import { useAuth } from "../context/AuthContext";

export default function Welcome() {
  const { user } = useAuth();
  const greeting = `Eku Ojumo, ${user?.username || "Iya Ojo"}`;
  const introText =
    "Emi ni Akawo, Oluranlowo yin fun isiro owo. E le so fun mi nipa oja te ta ati gbese, tabi ki e beere awon to je yin lowo ati gbogbo owo to wole.";

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800">{greeting}</h1>
      <p className="mt-2 max-w-lg text-gray-600">{introText}</p>
    </div>
  );
}
