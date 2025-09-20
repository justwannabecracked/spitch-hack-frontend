"use client";
import Image from "next/image";

interface Language {
  code: "en" | "yo" | "ig" | "ha";
  name: string;
}

const SUPPORTED_LANGUAGES: Language[] = [
  { code: "yo", name: "Yorùbá" },
  { code: "ig", name: "Igbo" },
  { code: "ha", name: "Hausa" },
  { code: "en", name: "English" },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (languageCode: "en" | "yo" | "ig" | "ha") => void;
}

export default function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code)}
          className={`px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ease-in-out flex items-center gap-2
            ${
              selectedLanguage === lang.code
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          {selectedLanguage === lang.code && (
            <Image
              className="h-5 w-auto"
              src="/whitemicrophone.png"
              alt="Recording Waveform"
              width={20}
              height={20}
            />
          )}
          {lang.name}
        </button>
      ))}
    </div>
  );
}
