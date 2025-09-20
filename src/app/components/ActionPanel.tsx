"use client";

import LanguageSelector from "./language";
import RecordButton from "./RecordButton";

interface ActionPanelProps {
  status: string;
  language: "en" | "yo" | "ig" | "ha";
  onLanguageChange: (lang: "en" | "yo" | "ig" | "ha") => void;
  onRecordStop: (blob: Blob) => void;
  isProcessing: boolean;
}

export default function ActionPanel({
  status,
  language,
  onLanguageChange,
  onRecordStop,
  isProcessing,
}: ActionPanelProps) {
  const introText = "Akawo, ba mi wo awon nkan ti mo ta ni oni.";

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="w-full max-w-4xl bg-white rounded-3xl border-2 border-gray-100 p-6 text-left space-y-4">
        <p className="font-semibold text-lg text-gray-800">
          {" "}
          {introText}
          {status}
        </p>

        <div className="w-full flex items-center justify-between gap-4 rounded-lg p-2">
          <LanguageSelector
            selectedLanguage={language}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>

      <div className="mt-2 text-center">
        <RecordButton onRecordStop={onRecordStop} isProcessing={isProcessing} />
      </div>
    </div>
  );
}
