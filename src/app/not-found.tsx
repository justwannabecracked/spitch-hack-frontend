import Link from "next/link";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <ExclamationCircleIcon className="h-16 w-16 text-black" />
      <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
        404 - Page Not Found
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
