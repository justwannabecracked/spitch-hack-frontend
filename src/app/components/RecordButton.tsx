"use client";

import { useState } from "react";
import { useWavRecorder } from "@/app/hooks/useWavRecorder";

const MicrophoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 sm:h-10 sm:w-10"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8h-1a6 6 0 11-12 0H3a7.001 7.001 0 006 6.93V17H7a1 1 0 100 2h6a1 1 0 100-2h-2v-2.07z"
      clipRule="evenodd"
    />
  </svg>
);
const StopIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 sm:h-8 sm:w-8"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
  </svg>
);
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 sm:h-6 sm:w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
// ... (SoundWave is the same)
const SoundWave = () => (
  <div className="flex items-center justify-center space-x-1">
    <div className="w-1 h-2 bg-gray-400 rounded-full animate-wave-sm"></div>
    <div className="w-1 h-4 bg-gray-500 rounded-full animate-wave-md"></div>
    <div className="w-1 h-6 bg-gray-600 rounded-full animate-wave-lg"></div>
  </div>
);

interface RecordButtonProps {
  onRecordStop: (audioBlob: Blob) => void;
  isProcessing: boolean;
}

export default function RecordButton({
  onRecordStop,
  isProcessing,
}: RecordButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording, cancelRecording } =
    useWavRecorder(onRecordStop);

  const handleStart = () => {
    startRecording();
    setIsRecording(true);
  };

  const handleStopAndSend = () => {
    stopRecording();
    setIsRecording(false);
  };

  const handleCancel = () => {
    cancelRecording();
    setIsRecording(false);
  };

  if (isProcessing) {
    return (
      <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-200 text-gray-400 shadow-lg ring-8 ring-gray-200/50">
        <SoundWave />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-6">
      {isRecording && (
        <button
          onClick={handleCancel}
          className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
          aria-label="Cancel recording"
        >
          <XIcon />
        </button>
      )}

      <button
        onClick={isRecording ? handleStopAndSend : handleStart}
        className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transform transition-all active:scale-95 ring-8 
          ${
            isRecording
              ? "bg-red-500 hover:bg-red-600 text-white ring-red-200/50 animate-pulse"
              : "bg-white hover:bg-gray-50 text-black ring-gray-200/50"
          }`}
      >
        {isRecording ? <StopIcon /> : <MicrophoneIcon />}
      </button>

      {isRecording && <div className="w-16 h-16" />}
    </div>
  );
}
