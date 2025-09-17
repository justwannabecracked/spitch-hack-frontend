"use client";

import { format } from "date-fns";

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
}

export default function TransactionFeed({
  transactions,
}: TransactionFeedProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full text-center p-4">
        <p className="text-gray-500">No transactions recorded yet.</p>
        <p className="text-gray-400 text-sm">
          Hold the button below to start recording.
        </p>
      </div>
    );
  }

  // Get today's date to display in the heading
  const today = format(new Date(), "do MMMM, yyyy");

  return (
    <div className="flex-1 w-full max-w-md overflow-y-auto p-4 space-y-3">
      <h2 className="text-xl font-bold text-gray-800 pb-2 border-b">
        Log for {today}
      </h2>
      {transactions.map((tx) => (
        <div
          key={tx._id}
          className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800">{tx.customer}</p>
              <p className="text-sm text-gray-600">{tx.details}</p>
              {/* Display the transaction time if it exists */}
              {tx.createdAt && (
                <p className="text-xs text-gray-400 mt-1">
                  {format(new Date(tx.createdAt), "h:mm a")}
                </p>
              )}
            </div>
            <p
              className={`font-bold text-lg whitespace-nowrap ${
                tx.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              {tx.type === "income" ? "+" : "-"}₦{tx.amount.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
