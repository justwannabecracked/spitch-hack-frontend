"use client";

import { useState } from "react";
import { useWavRecorder } from "@/app/hooks/useWavRecorder";

const MicrophoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10"
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
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"
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

const SoundWave = () => (
  <div className="flex items-center justify-center space-x-1">
    <div className="w-1 h-2 bg-gray-400 rounded-full animate-wave-sm"></div>
    <div className="w-1 h-4 bg-gray-500 rounded-full animate-wave-md"></div>
    <div className="w-1 h-6 bg-gray-600 rounded-full animate-wave-lg"></div>
    <div className="w-1 h-4 bg-gray-500 rounded-full animate-wave-md"></div>
    <div className="w-1 h-2 bg-gray-400 rounded-full animate-wave-sm"></div>
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
  const { startRecording, stopRecording } = useWavRecorder(onRecordStop);

  const [showRecordingUI, setShowRecordingUI] = useState(false);

  const handleInteraction = () => {
    if (isProcessing) return;

    if (showRecordingUI) {
      stopRecording();
      setIsRecording(false);
      setShowRecordingUI(false);
    } else {
      setShowRecordingUI(true);
      startRecording();
      setIsRecording(true);
    }
  };

  if (showRecordingUI) {
    return (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute w-20 h-20 bg-gray-200 rounded-full animate-ping"></div>
        <div className="absolute w-24 h-24 bg-gray-100 rounded-full"></div>

        <button
          onClick={handleInteraction}
          className="relative w-20 h-20 bg-black text-white rounded-full flex items-center justify-center z-10"
        >
          <XIcon />
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleInteraction}
        disabled={isProcessing}
        className="w-24 h-24 rounded-full flex items-center justify-center bg-white shadow-lg ring-8 ring-gray-200/50 text-black transform transition-transform active:scale-95 disabled:bg-gray-200 disabled:text-gray-400"
      >
        {isProcessing ? <SoundWave /> : <MicrophoneIcon />}
      </button>
    </div>
  );
}
