"use client";

import LanguageSelector from "./language";
import RecordButton from "./RecordButton";
import StatusDisplay from "./StatusDisplay";

interface RecordingFooterProps {
  status: string;
  language: "en" | "yo" | "ig" | "ha";
  onLanguageChange: (lang: "en" | "yo" | "ig" | "ha") => void;
  onRecordStop: (blob: Blob) => void;
  isProcessing: boolean;
}

export default function RecordingFooter({
  status,
  language,
  onLanguageChange,
  onRecordStop,
  isProcessing,
}: RecordingFooterProps) {
  return (
    <footer className="w-full p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 flex flex-col items-center gap-4 flex-shrink-0">
      <StatusDisplay message={status} />
      <LanguageSelector
        selectedLanguage={language}
        onLanguageChange={onLanguageChange}
      />
      <RecordButton onRecordStop={onRecordStop} isProcessing={isProcessing} />
    </footer>
  );
}
