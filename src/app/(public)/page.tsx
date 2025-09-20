"use client";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import {
  CashIcon,
  MenuIcon,
  SparklesIcon,
  XIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

const footerNavigation = {
  social: [
    {
      name: "Twitter",
      href: "/",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "/",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "/",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function LandingPage() {
  return (
    <div className="bg-white">
      <header>
        <Popover className="relative bg-white">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
            <div className="flex justify-center items-center">
              <Link href="/" className="inline-flex">
                <Image
                  className="h-12 w-auto"
                  src="/wr.png"
                  alt="akawọ́ Logo"
                  width={48}
                  height={48}
                />
                <h1 className="text-3xl font-thin text-gray-900 ml-4">akawọ́</h1>
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>

            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link
                href="/login"
                className="px-6 py-3 text-base rounded-full transition-all duration-300 ease-in-out bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 text-base rounded-full transition-all duration-300 ease-in-out bg-black text-white flex items-center gap-2 hover:bg-gray-800 ml-4"
              >
                Get Started
              </Link>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex justify-center items-center">
                        <Image
                          className="h-12 w-auto"
                          src="/wr.png"
                          alt="akawọ́ Logo"
                          width={48}
                          height={48}
                        />
                        <h1 className="text-4xl font-thin text-gray-900 ml-2">
                          akawọ́
                        </h1>
                      </div>
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6"></div>
                </div>
                <div className="py-6 px-5">
                  <div className="mt-6">
                    <Link
                      href="/login"
                      className="px-6 py-3 text-base rounded-full transition-all duration-300 ease-in-out bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      className="px-6 py-3 text-base rounded-full transition-all duration-300 ease-in-out bg-black text-white flex items-center gap-2 hover:bg-gray-800 ml-4"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </header>

      <main>
        <div className="relative bg-white pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="py-16 sm:py-24 lg:py-32">
              <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                <p className="mt-2 text-5xl font-bold text-gray-900 sm:text-6xl">
                  Stop Writing, Start Talking. <br /> Know your business inside
                  and out.
                </p>
                <p className="mt-5 max-w-prose mx-auto text-base text-gray-400">
                  Manage your daily business records without lifting a pen. Tell
                  akawọ́ about your sales and debts, and get back to what you do
                  best.
                </p>
                <div className="mt-8 flex justify-center">
                  <Link
                    href="/register"
                    className="px-6 py-3 text-base rounded-full transition-all duration-300 ease-in-out bg-black text-white flex items-center gap-2 hover:bg-gray-800"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
              <img
                className="w-full h-full object-contain"
                src="/hero.png"
                alt="iya-bose"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="bg-zinc-50 rounded-xl px-6 pb-5">
                <div className="">
                  <div className="py-4 flex justify-start items-center">
                    <img
                      className=""
                      src="/triangle.png"
                      alt="Multilingual ledger"
                    />
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900 tracking-tight">
                    Multi-Language Support
                  </h3>
                  <p className="mt-5 text-sm text-gray-500">
                    Record transactions in your native language with our
                    advanced speech-to-text technology.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <div className="bg-zinc-50 rounded-xl px-6 pb-5">
                <div className="">
                  <div className="py-4 flex justify-start items-center">
                    <img
                      className=""
                      src="/ellipse.png"
                      alt="AI-Powered Insights"
                    />
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900 tracking-tight">
                    AI-Powered Insights
                  </h3>
                  <p className="mt-5 text-sm text-gray-500">
                    Receive personalized financial insights and analysis to
                    optimize your trading strategies.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <div className="bg-zinc-50 rounded-xl px-6 pb-5">
                <div className="">
                  <div className="py-4 flex justify-start items-center">
                    <img
                      className=""
                      src="/rectangle.png"
                      alt="Secure Data Handling"
                    />
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900 tracking-tight">
                    Secure Data Handling
                  </h3>
                  <p className="mt-5 text-sm text-gray-500">
                    Your financial data is protected with security measures,
                    ensuring privacy and peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative pt-16 pb-32 overflow-hidden">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48" />
          <div className="relative">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                <div>
                  <div>
                    <span className="h-12 w-12 rounded-md flex items-center justify-center bg-black">
                      <CashIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      Track your sales wherever you go
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                      You're always on the move. Your records should be too.
                      Just talk and trade, we'll handle the numbers. No more
                      spreadsheets, no more guesswork. Just simple, smart
                      tracking for your business.
                    </p>
                    <div className="mt-6">
                      <div className="mt-8 flex justify-start">
                        <Link
                          href="/register"
                          className="px-6 py-3 text-base rounded-full transition-all duration-300 ease-in-out bg-black text-white flex items-center gap-2 hover:bg-gray-800 ml-4"
                        >
                          Get Started
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <blockquote>
                    <div>
                      <p className="text-base text-gray-500">
                        &ldquo;akawọ́ helps me keep perfect track of simple sales
                        and keeps perfect records of everything per day &rdquo;
                      </p>
                    </div>
                    <footer className="mt-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-6 w-6 rounded-full"
                            src="https://ik.imagekit.io/ubdvpx7xd0j/Femi_Obadimu/Rectangle%2021_WBA2L3Exq.png?updatedAt=1758370100567"
                            alt="Iya Bose"
                          />
                        </div>
                        <div className="text-base font-medium text-gray-700">
                          Ìyá Bọ̀sẹ́, Lagos Market Trader
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    className="w-full object-cover rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="/trader.png"
                    alt="Inbox user interface"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                <div>
                  <div>
                    <span className="h-12 w-12 rounded-md flex items-center justify-center bg-black">
                      <SparklesIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      Instant Financial Clarity
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                      Get a clear, real-time picture of your business finances.
                      Akawo intelligently categorizes every voice entry, so you
                      can instantly see your profits and track who owes you
                      money, helping you make smarter decisions.
                    </p>
                    <div className="mt-6"></div>
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="/sales.png"
                    alt="Intelligent ledger"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full object-cover"
                  src="/pattern.png"
                  alt="akawọ́ pattern"
                />
              </div>
              <div className="relative px-4 py-2 sm:px-6 sm:py-4 lg:py-6 lg:px-8">
                <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                  <p className="mt-2 text-5xl font-bold text-gray-900 sm:text-6xl">
                    Your Business, Your Voice.
                  </p>
                  <p className="mt-5 max-w-prose mx-auto text-base text-gray-400">
                    The easiest way to track your business sales.
                  </p>
                  <div className="mt-8 flex justify-center">
                    <Link
                      href="/register"
                      className="px-6 py-3 text-base rounded-full transition-all duration-300 ease-in-out bg-black text-white flex items-center gap-2 hover:bg-gray-800 ml-4"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:pt-24 lg:px-8">
          <div className="mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16">
            <div className="flex space-x-6 md:order-2">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-900 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-8 text-base text-gray-900 md:mt-0 md:order-1">
              &copy; 2025 akawọ́ Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
