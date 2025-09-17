"use client";

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
    <div className="flex items-center justify-center gap-2 p-2 bg-gray-100 rounded-full shadow-inner">
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ease-in-out
            ${
              selectedLanguage === lang.code
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600 hover:bg-gray-200"
            }
          `}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
}
