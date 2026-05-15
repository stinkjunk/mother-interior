"use client";

import { FaPlay } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";
import { useTransition, useState } from "react";
import { setLocale } from "@/app/actions/locale";

export default function LangPlayerButton() {
  const t = useTranslations("Menu");
  const [isPending, startTransition] = useTransition();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const locale = useLocale();
  const otherLocale = locale === "en" ? "da" : "en";

  const handleLocaleSwitch = (locale: "en" | "da") => {
    startTransition(() => {
      setLocale(locale);
    });
    setIsLangMenuOpen(false);
  };

  return (
    <div
      className="flex gap-2 font-label absolute top-0 right-0 h-20 items-center pr-12.5 max-sm:pr-7 z-50 lang-playerButton"
      data-state={isLangMenuOpen ? "open" : "closed"}
    >
      <div className="relative">
        <button
          className="altColor cursor-pointer p-1"
          aria-label={t("LangSelect.openMenuAriaLabel")}
          onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
        >
          <span className={isPending ? "opacity-50" : ""}>
            {t("LangSelect.currentLocale")}
          </span>
        </button>
        <div
          className="menuPopup absolute top-full right-0 mt-2 z-80"
          data-state={isLangMenuOpen ? "open" : "closed"}
        >
          <button
            className="langMenuPopupItem cursor-pointer font-label mt-2 max-sm:py-2 max-sm:px-4 block w-full text-left"
            aria-label={t("LangSelect.otherLocaleAriaLabel")}
            onClick={() => handleLocaleSwitch(otherLocale)}
          >
            {t("LangSelect.otherLocale")}
          </button>
        </div>
      </div>

      <button
        className="cursor-pointer"
        aria-label={t("Player.openWidgetAriaLabel")}
      >
        <FaPlay className="altColor" />
      </button>
    </div>
  );
}
