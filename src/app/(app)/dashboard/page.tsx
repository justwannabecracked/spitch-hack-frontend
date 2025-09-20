"use client";

import { useEffect, useState, useRef, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { Transaction } from "@/app/components/TransactionFeed";
import ConversationSidebar from "@/app/components/ConversationSidebar";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "react-toastify";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { isSameDay, parseISO, format } from "date-fns";
import ConversationView from "@/app/components/ConversationView";
import Welcome from "@/app/components/Welcome";

const ActionFooter = dynamic(() => import("@/app/components/ActionFooter"), {
  ssr: false,
});

async function playAudioFromBase64(base64String: string) {
  try {
    const audio = new Audio(`data:audio/mp3;base64,${base64String}`);
    await audio.play();
  } catch (error) {
    console.error("Audio playback failed:", error);
  }
}

function DashboardContent() {
  const { token, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState(
    "...for example, I sold 3 bags of rice to John, he paid ₦150,000 and it is remaining ₦20,000"
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState<"en" | "yo" | "ig" | "ha">("yo");
  const isAlreadyFetching = useRef(false);

  const view = searchParams.get("view");
  const dateParam = searchParams.get("date");

  useEffect(() => {
    const fetchTransactions = async () => {
      if (token) {
        try {
          const response = await fetch(
            "https://spitch-hack-backend.onrender.com/api/v1/akawo/transactions",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.ok) {
            const data = await response.json();
            setTransactions(data);

            const action = searchParams.get("action");

            if (data.length > 0 && !dateParam && !view && action !== "new") {
              const mostRecentDate = format(
                parseISO(data[0].createdAt as string),
                "yyyy-MM-dd"
              );
              router.push(`${pathname}?date=${mostRecentDate}`);
            }
          } else {
            // toast.error("Could not load your transaction history.");
          }
        } catch (error) {
          console.error("Failed to fetch transactions", error);
        }
      }
    };
    fetchTransactions();
  }, [token, dateParam, view, pathname, router, searchParams]);

  const handleNewRecording = async (audioBlob: Blob) => {
    if (isAlreadyFetching.current || !token) {
      if (!token) toast.error("You must be logged in.");
      return;
    }
    isAlreadyFetching.current = true;
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
        if (result.audioContent) await playAudioFromBase64(result.audioContent);
        throw new Error(result.message || "An error occurred.");
      }

      setStatus(result.confirmationText);
      if (result.audioContent) await playAudioFromBase64(result.audioContent);

      if (result.type === "transaction_logged" && result.transactions) {
        const newTransactions = result.transactions;
        setTransactions((prev) => [...newTransactions, ...prev]);
        const today = format(new Date(), "yyyy-MM-dd");
        if (dateParam !== today || view) {
          router.push(`${pathname}?date=${today}`);
        }
      } else if (result.type === "query_response") {
        // toast.info(result.confirmationText);
      }
    } catch (error: any) {
      setStatus("Sorry, something went wrong.");
    } finally {
      isAlreadyFetching.current = false;
      setIsProcessing(false);
    }
  };

  const handleDeleteConversation = async (date: string) => {
    if (
      !window.confirm(
        `Are you sure you want to delete all logs for ${format(
          parseISO(date),
          "do MMMM"
        )}? This action cannot be undone.`
      )
    )
      return;
    try {
      const response = await fetch(
        `https://spitch-hack-backend.onrender.com/api/v1/akawo/transactions?date=${date}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) throw new Error("Failed to delete conversation.");
      setTransactions((prev) =>
        prev.filter(
          (tx) => !isSameDay(parseISO(tx.createdAt as string), parseISO(date))
        )
      );
      toast.success("Conversation deleted successfully.");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      const response = await fetch(
        `https://spitch-hack-backend.onrender.com/api/v1/akawo/transactions/${transactionId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete transaction.");
      }

      setTransactions((prev) => prev.filter((tx) => tx._id !== transactionId));

      toast.success("Transaction deleted successfully.");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filteredTransactions = useMemo(() => {
    let filtered: Transaction[] = [];

    if (dateParam) {
      const selectedDate = parseISO(dateParam);
      filtered = transactions.filter(
        (tx) =>
          tx.createdAt &&
          isSameDay(parseISO(tx.createdAt as string), selectedDate)
      );
    } else if (view === "credit") {
      filtered = transactions.filter((tx) => tx.type === "income");
    } else if (view === "debt") {
      filtered = transactions.filter((tx) => tx.type === "debt");
    }

    return filtered.sort(
      (a, b) =>
        new Date(a.createdAt as string).getTime() -
        new Date(b.createdAt as string).getTime()
    );
  }, [transactions, view, dateParam]);

  const pageTitle = useMemo(() => {
    if (dateParam) return `${format(parseISO(dateParam), "EEEE, do MMMM")}`;
    if (view === "credit") return "Profit Ledger";
    if (view === "debt") return "Debt Ledger";
    return "New Log";
  }, [view, dateParam]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading akawọ́...</p>
      </div>
    );
  }

  const showConversationView = !!dateParam || !!view;

  return (
    <div className="flex h-full">
      <div className="hidden lg:flex">
        {transactions.length > 0 && (
          <ConversationSidebar
            transactions={transactions}
            onDeleteConversation={handleDeleteConversation}
          />
        )}
      </div>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          {showConversationView ? (
            <ConversationView
              transactions={filteredTransactions}
              pageTitle={pageTitle}
              displayMode={dateParam ? "chat" : "list"}
              onDeleteTransaction={handleDeleteTransaction}
            />
          ) : (
            <Welcome />
          )}
        </main>
        <ActionFooter
          status={status}
          language={language}
          onLanguageChange={setLanguage}
          onRecordStop={handleNewRecording}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          Loading...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
