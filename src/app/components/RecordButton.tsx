"use client";

import { useState } from "react";
import { useWavRecorder } from "../hooks/useWavRecorder";

interface RecordButtonProps {
  onRecordStop: (audioBlob: Blob) => void;
  isProcessing: boolean;
}

export default function RecordButton({
  onRecordStop,
  isProcessing,
}: RecordButtonProps) {
  const [isRecording, setIsRecording] = useState(false);

  // 1. We pass the 'onRecordStop' prop directly to the hook.
  //    No wrapper function is needed anymore.
  const { startRecording, stopRecording } = useWavRecorder(onRecordStop);

  const handleClick = () => {
    if (isProcessing) return;

    if (isRecording) {
      // If we are currently recording...
      // 2. Call stopRecording() to end the audio capture.
      stopRecording();
      // 3. IMPORTANT: Immediately update the UI state.
      setIsRecording(false);
    } else {
      // If we are not recording...
      // 4. Call startRecording() to begin audio capture.
      startRecording();
      // 5. IMPORTANT: Immediately update the UI state.
      setIsRecording(true);
    }
  };

  let buttonText = "Click to Record";
  let buttonClass = "bg-blue-600 hover:bg-blue-700";

  if (isProcessing) {
    buttonText = "Processing...";
    buttonClass = "bg-gray-400 cursor-not-allowed";
  } else if (isRecording) {
    buttonText = "Recording... (Click to Stop)";
    buttonClass = "bg-red-600 animate-pulse";
  }

  return (
    <button
      onClick={handleClick}
      disabled={isProcessing}
      className={`w-48 h-48 rounded-full flex items-center justify-center text-center text-white font-bold text-xl shadow-lg transform transition-transform duration-200 ease-in-out active:scale-95 focus:outline-none ${buttonClass}`}
    >
      {buttonText}
    </button>
  );
}
