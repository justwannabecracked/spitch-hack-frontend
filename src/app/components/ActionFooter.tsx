"use client";

import LanguageSelector from "./language";
import RecordButton from "./RecordButton";
import StatusDisplay from "./StatusDisplay";

interface ActionFooterProps {
  status: string;
  language: "en" | "yo" | "ig" | "ha";
  onLanguageChange: (lang: "en" | "yo" | "ig" | "ha") => void;
  onRecordStop: (blob: Blob) => void;
  isProcessing: boolean;
}

export default function ActionFooter({
  status,
  language,
  onLanguageChange,
  onRecordStop,
  isProcessing,
}: ActionFooterProps) {
  return (
    <footer className="flex justify-center items-center p-4 bg-white backdrop-blur-sm flex-shrink-0">
      <div className="flex flex-col items-center gap-8 w-full max-w-6xl">
        <div className="w-full bg-white rounded-3xl border-2 border-gray-100 p-6 text-left space-y-4">
          <StatusDisplay message={status} />

          <div className="w-full flex items-center gap-4 rounded-lg py-4 px-2">
            <LanguageSelector
              selectedLanguage={language}
              onLanguageChange={onLanguageChange}
            />
          </div>
        </div>

        <div className="mt-2 text-center">
          <RecordButton
            onRecordStop={onRecordStop}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </footer>
  );
}
