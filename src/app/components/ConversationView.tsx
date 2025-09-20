"use client";

import { useMemo } from "react";
import TransactionFeed, { Transaction } from "./TransactionFeed";

interface ConversationViewProps {
  transactions: Transaction[];
  pageTitle: string;
  displayMode: "chat" | "list";
  onDeleteTransaction: (transactionId: string) => void;
}

const StatCard = ({
  title,
  amount,
  isCredit,
}: {
  title: string;
  amount: number;
  isCredit: boolean;
}) => (
  <div className="bg-white p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <p
      className={`text-2xl font-bold ${
        isCredit ? "text-green-600" : "text-red-500"
      }`}
    >
      ₦{amount.toLocaleString()}
    </p>
  </div>
);

export default function ConversationView({
  transactions,
  pageTitle,
  displayMode,
  onDeleteTransaction,
}: ConversationViewProps) {
  const summaryData = useMemo(() => {
    if (transactions.length === 0) {
      return { total: 0, label: null, totalCredit: 0, totalDebt: 0 };
    }

    if (displayMode === "list") {
      const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
      const label =
        transactions[0].type === "income" ? "Total Credit" : "Total Debt";
      return { total, label, totalCredit: 0, totalDebt: 0 };
    } else {
      const totalCredit = transactions
        .filter((tx) => tx.type === "income")
        .reduce((sum, tx) => sum + tx.amount, 0);
      const totalDebt = transactions
        .filter((tx) => tx.type === "debt")
        .reduce((sum, tx) => sum + tx.amount, 0);
      return { total: 0, label: null, totalCredit, totalDebt };
    }
  }, [transactions, displayMode]);

  return (
    <div className="h-full flex flex-col p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">{pageTitle}</h1>

      {displayMode === "list" && summaryData.label && (
        <h2 className="text-lg font-medium text-gray-600 mb-6">
          {summaryData.label}:{" "}
          <span
            className={
              transactions[0].type === "income"
                ? "text-green-600"
                : "text-red-500"
            }
          >
            ₦{summaryData.total.toLocaleString()}
          </span>
        </h2>
      )}

      {displayMode === "chat" && (
        <div className="flex justify-between gap-4 mb-3">
          <StatCard
            title="Total Credit"
            amount={summaryData.totalCredit}
            isCredit={true}
          />
          <StatCard
            title="Total Debt"
            amount={summaryData.totalDebt}
            isCredit={false}
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <TransactionFeed
          transactions={transactions}
          displayMode={displayMode}
          onDeleteTransaction={onDeleteTransaction}
        />
      </div>
    </div>
  );
}
