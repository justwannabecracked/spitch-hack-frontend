"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

type Language = "en" | "yo" | "ig" | "ha";

const translations = {
  en: {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    intro:
      "I am Akawo, your personal finance assistant. You can tell me about your sales and debts, or ask me to list your debtors and total income or debt.",
  },
  yo: {
    morning: "E kaaro",
    afternoon: "E kaasan",
    evening: "E ku ale",
    intro:
      "Èmi ni Akawọ́, olùrànlọ́wọ́ yín fún ìṣirò owó. Ẹ lè sọ fún mi nípa ọjà tẹ́ ẹ tà àti gbèsè, tàbí kí ẹ béèrè àwọn tó jẹ yín lówó àti gbogbo owó tó wọlé.",
  },
  ig: {
    morning: "Ụtụtụ ọma",
    afternoon: "Ehihie ọma",
    evening: "Mgbede ọma",
    intro:
      "Abụ m Akawo, onye enyemaka ego gị. Ị nwere ike ịgwa m gbasara ahịa na ụgwọ gị, ma ọ bụ jụọ m maka ndị ji gị ụgwọ na ego ole i nwetara.",
  },
  ha: {
    morning: "Barka da safe",
    afternoon: "Barka da rana",
    evening: "Barka da yamma",
    intro:
      "Ni ne Akawo, mataimakin ku na kuɗi. Kuna iya gaya mani game da tallace-tallace da basussuka, ko ku tambaye ni jerin sunayen masu bin ku bashi da jimlar kuɗin da aka samu.",
  },
};

export const useDynamicGreeting = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");
  const [introText, setIntroText] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    let timeOfDay: "morning" | "afternoon" | "evening";
    if (hour < 12) {
      timeOfDay = "morning";
    } else if (hour < 17) {
      timeOfDay = "afternoon";
    } else {
      timeOfDay = "evening";
    }

    const languages: Language[] = ["en", "yo", "ig", "ha"];
    const randomLang = languages[Math.floor(Math.random() * languages.length)];

    const selectedStrings = translations[randomLang];
    const timeBasedGreeting = selectedStrings[timeOfDay];
    const intro = selectedStrings.intro;

    const username = user?.username || "Iya Ojo";
    setGreeting(`${timeBasedGreeting}, ${username}`);
    setIntroText(intro);
  }, [user]);

  return { greeting, introText };
};
