"use client";

import TransactionFeed, { Transaction } from "./TransactionFeed";

interface ConversationViewProps {
  transactions: Transaction[];
  pageTitle: string;
  displayMode: "chat" | "list";
}

export default function ConversationView({
  transactions,
  pageTitle,
  displayMode,
}: ConversationViewProps) {
  return (
    <div className="h-full flex flex-col p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">{pageTitle}</h1>

      <div className="flex-1 overflow-y-auto">
        <TransactionFeed
          transactions={transactions}
          displayMode={displayMode}
        />
      </div>
    </div>
  );
}
