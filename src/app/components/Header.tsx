"use client";

import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between z-50 bg-white">
      <div className="flex items-center">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={`https://ui-avatars.com/api/?name=${
            user?.username || "Iya Ojo"
          }&background=random&color=fff`}
          alt="User avatar"
        />
        <p className="hidden sm:block ml-3 text-lg font-semibold text-gray-800">
          {user?.username || "Iya Ojo"}
        </p>
      </div>

      <div className="flex justify-center items-center">
        <Link href="/" className="inline-flex">
          <Image
            className="h-12 w-auto"
            src="/favicon.ico"
            alt="Akawo Logo"
            width={48}
            height={48}
          />
          <h1 className="text-3xl font-thin text-gray-900 ml-4">Akawo</h1>
        </Link>
      </div>
    </header>
  );
}
