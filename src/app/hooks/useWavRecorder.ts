"use client";

import { useEffect, useRef } from "react";
import {
  IMediaRecorder,
  MediaRecorder,
  register,
} from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";

let encoderRegistered = false;

export const useWavRecorder = (onStop: (blob: Blob) => void) => {
  const mediaRecorderRef = useRef<IMediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const onStopRef = useRef(onStop);
  useEffect(() => {
    onStopRef.current = onStop;
  }, [onStop]);

  useEffect(() => {
    const registerEncoder = async () => {
      if (encoderRegistered) return;
      try {
        await register(await connect());
        encoderRegistered = true;
        console.log("WAV encoder registered successfully.");
      } catch (err) {
        if (
          err instanceof Error &&
          err.message.includes("already an encoder stored")
        ) {
          encoderRegistered = true;
        } else {
          console.error("Error registering WAV encoder:", err);
        }
      }
    };
    registerEncoder();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = stream;

      audioChunksRef.current = [];

      const recorder = new MediaRecorder(stream, { mimeType: "audio/wav" });
      mediaRecorderRef.current = recorder;

      recorder.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      });

      recorder.addEventListener("stop", () => {
        if (audioChunksRef.current.length > 0) {
          const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
          console.log("Recording stopped. Blob created with size:", blob.size);
          onStopRef.current(blob);
        }
        stream.getTracks().forEach((track) => track.stop());
      });

      recorder.start();
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  return { startRecording, stopRecording };
};
