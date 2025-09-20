"use client";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { format, parseISO } from "date-fns";
import { PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { useCallback, useMemo, useState } from "react";
import { Transaction } from "./TransactionFeed";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ConversationSidebarProps {
  transactions: Transaction[];
  onDeleteConversation: (date: string) => void;
}

export default function ConversationSidebar({
  transactions,
  onDeleteConversation,
}: ConversationSidebarProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentView = searchParams.get("view");
  const currentDate = searchParams.get("date");
  const action = searchParams.get("action");

  const handleNavigate = useCallback(
    (paramsToSet: Record<string, string>) => {
      const newParams = new URLSearchParams();
      Object.entries(paramsToSet).forEach(([key, value]) => {
        newParams.set(key, value);
      });
      router.push(`${pathname}?${newParams.toString()}`);
    },
    [pathname, router]
  );

  const mainNavigation = [
    { name: "Credit", view: "credit" },
    { name: "Debt", view: "debt" },
  ];

  const conversationDates = useMemo(() => {
    const dates = transactions
      .map((tx) => format(parseISO(tx.createdAt as string), "yyyy-MM-dd"))
      .filter((date, index, self) => self.indexOf(date) === index);
    return dates.map((dateStr) => ({
      name: format(parseISO(dateStr), "EEEE, do MMMM"),
      date: dateStr,
    }));
  }, [transactions]);

  return (
    <aside className="w-full max-w-sm flex-shrink-0 border-r border-gray-200 bg-white p-4 flex flex-col space-y-6">
      <div className="px-2">
        <Link
          href="/dashboard?action=new"
          className={classNames(
            action === "new" ||
              (!searchParams.has("date") && !searchParams.has("view"))
              ? "bg-black text-white"
              : "bg-black text-white",
            "w-full font-semibold py-3 px-4 rounded-xl  flex items-center justify-between transition-colors"
          )}
        >
          New Log
          <PlusIcon className="h-5 w-5" />
        </Link>
      </div>

      <nav className="space-y-1 px-2">
        {mainNavigation.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigate({ view: item.view })}
            className={classNames(
              currentView === item.view
                ? "bg-gray-100 text-gray-900 font-bold"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              "w-full text-left block py-2 px-2 text-lg rounded-xl"
            )}
          >
            {item.name}
          </button>
        ))}
      </nav>

      {conversationDates.length > 0 && (
        <div className="flex-1 overflow-y-auto">
          <h3 className="p-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Conversations
          </h3>
          <nav className="mt-2 px-2 space-y-2">
            {conversationDates.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-md group hover:bg-gray-50"
              >
                <button
                  onClick={() => handleNavigate({ date: item.date })}
                  className={classNames(
                    currentDate === item.date
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-500 group-hover:text-gray-900",
                    "w-full text-left block py-2 px-2 text-sm rounded-md"
                  )}
                >
                  {item.name}
                </button>
                <button
                  onClick={() => onDeleteConversation(item.date)}
                  className="p-1 text-gray-400 hover:text-red-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </nav>
        </div>
      )}

      <div className="mt-auto flex-shrink-0">
        <button
          onClick={logout}
          className="w-full text-left text-gray-500 hover:bg-gray-100 hover:text-gray-900 block py-2 px-4 text-sm rounded-md"
        >
          <Link href="/login">Sign Out</Link>
        </button>
      </div>
    </aside>
  );
}
