"use client";

import { format, parseISO } from "date-fns";
import { useRef, useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";

export interface Transaction {
  _id: string;
  customer: string;
  details: string;
  amount: number;
  type: "income" | "debt";
  createdAt?: string | Date;
}

interface TransactionFeedProps {
  transactions: Transaction[];
  displayMode: "chat" | "list";
  onDeleteTransaction: (transactionId: string) => void;
}

export default function TransactionFeed({
  transactions,
  displayMode,
  onDeleteTransaction,
}: TransactionFeedProps) {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transactions]);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full text-center p-4">
        <p className="text-gray-500">No transactions to display.</p>
        <p className="text-gray-400 text-sm">
          Use the microphone below to add a new log.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 px-4">
      {transactions.map((tx, index) => {
        const alignmentClass =
          displayMode === "chat"
            ? tx.type === "income"
              ? "justify-start"
              : "justify-end"
            : "justify-center";

        return (
          <div key={tx._id} className={`flex ${alignmentClass}`}>
            <div
              ref={index === transactions.length - 1 ? lastMessageRef : null}
              onMouseEnter={() => setHoveredId(tx._id)}
              onMouseLeave={() => setHoveredId(null)}
              className="w-full max-w-md bg-white p-4 rounded-xl shadow-md border border-gray-100 relative"
            >
              {displayMode === "list" && hoveredId === tx._id && (
                <button
                  onClick={() => onDeleteTransaction(tx._id)}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800 text-lg">{tx.customer}</p>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    tx.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {tx.type === "income" ? "Credit" : "Debt"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{tx.details}</p>
              <div className="flex justify-between items-end mt-4">
                {tx.createdAt && (
                  <p className="text-xs text-gray-400">
                    {format(parseISO(tx.createdAt as string), "h:mm a")}
                  </p>
                )}
                <p
                  className={`font-bold text-xl ml-auto ${
                    tx.type === "income" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}₦
                  {tx.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
