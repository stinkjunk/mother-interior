"use client";

import { FaPlay } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useTransition, useState } from "react";
import { setLocale } from "@/app/actions/locale";

export default function LangPlayerButton() {
  const t = useTranslations("Menu");
  const [isPending, startTransition] = useTransition();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const otherLocale = locale === "en" ? "da" : "en";

  useEffect(() => {
    if (!isLangMenuOpen) {
      return;
    }
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (langMenuRef.current && target instanceof Node) {
        if (!langMenuRef.current.contains(target)) {
          setIsLangMenuOpen(false);
        }
      }
    };

    const handleScroll = () => {
      setIsLangMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isLangMenuOpen]);

  const handleLocaleSwitch = (locale: "en" | "da") => {
    startTransition(() => {
      setLocale(locale);
    });
    setIsLangMenuOpen(false);
  };

  return (
    <div
      className="flex gap-2 font-label absolute top-0 right-0 h-20 items-center pr-12.5 max-sm:pr-7 z-45 lang-playerButton"
      data-state={isLangMenuOpen ? "open" : "closed"}
    >
      <div ref={langMenuRef} className="relative">
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
            className="langMenuPopupItem cursor-pointer font-label mt-2 max-sm:py-2 max-sm:px-4 max-sm:translate-x-4 block w-full text-left"
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
