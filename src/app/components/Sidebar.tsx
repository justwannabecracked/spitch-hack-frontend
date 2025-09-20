"use client";

import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format, subDays } from "date-fns";
import { PlusIcon } from "@heroicons/react/outline";
import { useCallback } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentView = searchParams.get("view");
  const currentDate = searchParams.get("date");
  const action = searchParams.get("action");

  const handleNavigation = useCallback(
    (
      paramToSet: { key: "view" | "date"; value: string },
      paramToClear?: "view" | "date"
    ) => {
      const newParams = new URLSearchParams(searchParams.toString());

      newParams.set(paramToSet.key, paramToSet.value);
      if (paramToClear) {
        newParams.delete(paramToClear);
      }
      newParams.delete("action");

      router.push(`${pathname}?${newParams.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const navigation = [
    { name: "Credit", view: "credit" },
    { name: "Debt", view: "debt" },
    { name: "Transactions", view: "transactions" },
  ];

  const dateNavigation = Array.from({ length: 4 }).map((_, i) => {
    const date = subDays(new Date(), i);
    const formattedDate = format(date, "yyyy-MM-dd");
    return {
      name:
        i === 0
          ? `Today, ${format(date, "do MMMM")}`
          : format(date, "EEEE, do MMMM"),
      date: formattedDate,
    };
  });

  return (
    <div className="flex flex-col min-h-0 bg-white border-r border-gray-200 p-4 space-y-8">
      <div className="flex-shrink-0 w-full group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-10 w-10 rounded-full"
              src={`https://ui-avatars.com/api/?name=${
                user?.username || "Iya Ojo"
              }&background=random&color=fff`}
              alt="User avatar"
            />
          </div>
          <div className="ml-3">
            <p className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
              {user?.username || "Iya Ojo"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-2">
        <Link
          href="/dashboard?action=new"
          className={classNames(
            action === "new"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200",
            "w-full font-semibold py-3 px-4 rounded-lg shadow-sm flex items-center justify-between transition-colors"
          )}
        >
          New Log
          <PlusIcon className="h-5 w-5" />
        </Link>
      </div>

      <nav className="space-y-2 px-2" aria-label="Primary Navigation">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() =>
              handleNavigation({ key: "view", value: item.view }, "date")
            }
            className={classNames(
              currentView === item.view ||
                (!currentView &&
                  !currentDate &&
                  !action &&
                  item.view === "transactions")
                ? "bg-gray-100 text-gray-900 font-semibold"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              "w-full text-left block py-2 px-2 text-md rounded-md"
            )}
          >
            {item.name}
          </button>
        ))}
      </nav>

      <div>
        <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Recent
        </h3>
        <nav className="mt-2 px-2 space-y-2" aria-label="Date Navigation">
          {dateNavigation.map((item) => (
            <button
              key={item.name}
              onClick={() =>
                handleNavigation({ key: "date", value: item.date }, "view")
              }
              className={classNames(
                currentDate === item.date && !action
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                "w-full text-left block py-2 px-2 text-sm rounded-md"
              )}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto flex-shrink-0">
        <button
          onClick={logout}
          className="w-full text-left text-gray-500 hover:bg-gray-100 hover:text-gray-900 block py-2 px-4 text-sm rounded-md"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
