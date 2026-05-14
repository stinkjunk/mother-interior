"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ToggleMenu({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const t = useTranslations("Navigation.ToggleMenu");
  return (
    <div
      className={`mediaConditional menuToggle font-label ${className ?? ""}`}
      data-state={isOpen ? "open" : "closed"}
      data-interacted={hasInteracted ? "true" : undefined}
    >
      <div className="menuToggleLayer menuToggleBackground">
        <div></div>
      </div>
      <div className="menuToggleLayer menuToggleButton">
        <button
          onClick={() => {
            setHasInteracted(true);
            setIsOpen((current) => !current);
          }}
          aria-label={isOpen ? t("closeMenuAriaLabel") : t("openMenuAriaLabel")}
        >
          {isOpen ? t("closeMenuLabel") : t("openMenuLabel")}
        </button>
      </div>
    </div>
  );
}
