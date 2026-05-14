"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ToggleMenu({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Navigation.ToggleMenu");
  return (
    <div
      className={`mediaConditional menuToggle font-label ${className}`}
      data-state={isOpen ? "open" : "closed"}
    >
      <div className="menuToggleLayer menuToggleBackground">
        <div></div>
      </div>
      <div className="menuToggleLayer menuToggleButton">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? t("closeMenuAriaLabel") : t("openMenuAriaLabel")}
        >
          {isOpen ? t("closeMenuLabel") : t("openMenuLabel")}
        </button>
      </div>
    </div>
  );
}
