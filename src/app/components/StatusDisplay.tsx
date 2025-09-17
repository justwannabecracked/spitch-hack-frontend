"use client";

interface StatusDisplayProps {
  message: string;
}

export default function StatusDisplay({ message }: StatusDisplayProps) {
  return (
    <div className="w-full max-w-md p-4 text-center">
      <p className="text-lg text-gray-700 font-medium">{message}</p>
    </div>
  );
}
