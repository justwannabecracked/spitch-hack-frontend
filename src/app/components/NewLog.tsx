"use client";

import { useAuth } from "../context/AuthContext";
import LanguageSelector from "./language";
import RecordButton from "./RecordButton";

interface NewLogProps {
  status: string;
  language: "en" | "yo" | "ig" | "ha";
  onLanguageChange: (lang: "en" | "yo" | "ig" | "ha") => void;
  onRecordStop: (blob: Blob) => void;
  isProcessing: boolean;
}

export default function NewLog({
  status,
  language,
  onLanguageChange,
  onRecordStop,
  isProcessing,
}: NewLogProps) {
  const { user } = useAuth();
  const greeting = `Eku Ojumo, ${user?.username || "Iya Ojo"}`;
  const introText =
    "Emi ni Akawo, Oluranlowo yin fun isiro owo. E le so fun mi nipa oja te ta ati gbese, tabi ki e beere awon to je yin lowo ati gbogbo owo to wole.";

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800">{greeting}</h1>
      <p className="mt-2 max-w-lg text-gray-600">{introText}</p>

      <div className="mt-8 w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div className="w-full min-h-[80px] flex items-center justify-center border border-gray-200 rounded-lg p-4">
          <p className="text-lg text-gray-500">{status}</p>
        </div>
        <LanguageSelector
          selectedLanguage={language}
          onLanguageChange={onLanguageChange}
        />
      </div>

      <div className="mt-8">
        <RecordButton onRecordStop={onRecordStop} isProcessing={isProcessing} />
        <p className="mt-4 text-sm text-gray-500">Click to record</p>
      </div>
    </div>
  );
}
