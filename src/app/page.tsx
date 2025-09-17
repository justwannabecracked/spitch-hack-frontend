"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import StatusDisplay from "./components/StatusDisplay";
import TransactionFeed, { Transaction } from "./components/TransactionFeed";
import LanguageSelector from "./components/language";
import AuthForm from "./components/AuthForm";
import { useAuth } from "./context/AuthContext";
import { toast } from "react-toastify";
// The useWavRecorder hook is NO LONGER imported here.

const RecordButton = dynamic(() => import("./components/RecordButton"), {
  ssr: false, // This is the key to preventing the server-side error
  loading: () => (
    <div className="w-48 h-48 rounded-full bg-gray-200 animate-pulse" />
  ),
});

export default function Home() {
  const { user, token, login, isLoading } = useAuth();

  const [status, setStatus] = useState(
    "Select your language and hold to record"
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState<"en" | "yo" | "ig" | "ha">("yo");
  // The page NO LONGER needs to manage the isRecording state.
  const isAlreadyFetching = useRef(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (token) {
        setStatus("Loading transaction history...");
        try {
          const response = await fetch(
            "https://spitch-hack-backend.onrender.com/api/v1/akawo/transactions",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setTransactions(data);
            setStatus("Ready to record.");
          } else {
            toast.error("Could not load your transaction history.");
          }
        } catch (error) {
          console.error("Failed to fetch transactions", error);
        }
      }
    };
    fetchTransactions();
  }, [token]);

  const handleNewRecording = async (audioBlob: Blob) => {
    if (isAlreadyFetching.current) return;
    isAlreadyFetching.current = true;
    if (!token) {
      toast.error("You must be logged in.");
      isAlreadyFetching.current = false;
      return;
    }

    setIsProcessing(true);
    setStatus("Sending to Akawo for processing...");

    const formData = new FormData();
    formData.append("audio", audioBlob, "transaction.wav");
    formData.append("language", language);

    try {
      const response = await fetch(
        "https://spitch-hack-backend.onrender.com/api/v1/akawo/process-audio",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        if (result.audioContent) {
          new Audio(`data:audio/mp3;base64,${result.audioContent}`).play();
        }
        throw new Error(result.message || "An error occurred.");
      }

      setStatus(result.confirmationText);
      if (result.audioContent) {
        new Audio(`data:audio/mp3;base64,${result.audioContent}`).play();
      }

      if (result.type === "transaction_logged" && result.transactions) {
        setTransactions((prev) => [...result.transactions, ...prev]);
      }
    } catch (error: any) {
      toast.error(error.message);
      setStatus("Sorry, something went wrong.");
    } finally {
      isAlreadyFetching.current = false;
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading Akawo...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-50">
        <AuthForm onLoginSuccess={login} />
      </main>
    );
  }

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-50">
      <main className="flex-1 flex flex-col items-center w-full p-4 overflow-y-auto">
        <TransactionFeed transactions={transactions} />
      </main>
      <footer className="w-full p-4 bg-white border-t border-gray-200 flex flex-col items-center gap-4">
        <LanguageSelector
          selectedLanguage={language}
          onLanguageChange={setLanguage}
        />
        <StatusDisplay message={status} />
        {/* The button now only needs these two props. */}
        <RecordButton
          onRecordStop={handleNewRecording}
          isProcessing={isProcessing}
        />
      </footer>
    </div>
  );
}
