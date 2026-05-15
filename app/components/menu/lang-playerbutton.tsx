"use client";

import { FaPlay } from "react-icons/fa6";
import { Menu } from "@base-ui/react/menu";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { setLocale } from "@/app/actions/locale";

export default function LangPlayerButton() {
  const t = useTranslations("Menu");
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const otherLocale = locale === "en" ? "da" : "en";

  const handleLocaleSwitch = (locale: "en" | "da") => {
    startTransition(() => {
      setLocale(locale);
    });
  };

  return (
    <div className="flex gap-2 font-label absolute top-0 right-0 h-20 items-center pr-12.5 max-sm:pr-7 z-50 lang-playerButton">
      <Menu.Root>
        <Menu.Trigger
          className="altColor cursor-pointer p-1"
          aria-label={t("LangSelect.openMenuAriaLabel")}
        >
          <span className={isPending ? "opacity-50" : ""}>
            {t("LangSelect.currentLocale")}
          </span>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="z-80">
            <Menu.Popup className="menuPopup">
              <Menu.Item
                className="langMenuPopupItem cursor-pointer font-label mt-2 max-sm:py-2 max-sm:px-4"
                aria-label={t("LangSelect.otherLocaleAriaLabel")}
                onClick={() => handleLocaleSwitch(otherLocale)}
              >
                {t("LangSelect.otherLocale")}
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger
          className="cursor-pointer"
          aria-label={t("Player.openWidgetAriaLabel")}
        >
          <FaPlay className="altColor" />
        </Menu.Trigger>
      </Menu.Root>
    </div>
  );
}
