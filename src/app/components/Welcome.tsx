"use client";

import { useDynamicGreeting } from "../hooks/useDynamicGreeting";

export default function Welcome() {
  const { greeting, introText } = useDynamicGreeting();

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-bold text-gray-800">{greeting}</h1>
      <p className="mt-2 max-w-lg text-lg text-gray-600">{introText}</p>
    </div>
  );
}
