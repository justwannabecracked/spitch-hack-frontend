"use client";

interface StatusDisplayProps {
  message: string;
}

export default function StatusDisplay({ message }: StatusDisplayProps) {
  return (
    <div className="">
      <p className="text-lg text-gray-700 font-medium">{message}</p>
    </div>
  );
}
