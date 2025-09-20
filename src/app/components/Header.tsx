"use client";

import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { user } = useAuth();

  const avatarSrc =
    user?.image ||
    `https://ui-avatars.com/api/?name=${
      user?.username || "A"
    }&background=random&color=fff`;

  return (
    <header className="fixed top-0 left-0 right-0 h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between z-50 bg-white">
      {/* User Profile */}
      <div className="flex items-center">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={avatarSrc}
          alt="User avatar"
        />
        <p className="hidden sm:block ml-3 text-lg font-semibold text-gray-800">
          {user?.username || "Iya Ojo"}
        </p>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/dashboard" className="flex items-center">
          <Image
            className="h-8 w-auto"
            src="/wr.png"
            alt="akawọ́ Logo"
            width={32}
            height={32}
          />
          <h1 className="text-2xl font-semibold text-gray-900 ml-2">akawọ́</h1>
        </Link>
      </div>

      <div></div>
    </header>
  );
}
