"use client";
import { FaPlay } from "react-icons/fa";
import { SCWidget, useSCWidget } from "soundcloud-widget-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function PlayerButton() {
  const t = useTranslations("Menu");
  const [isSCMounted, setIsSCMounted] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const toggleWidget = () => {
    if (!isSCMounted) {
      const script = document.createElement("script");
      script.src = "https://widget.soundslice.com/widget-embed.js";
      script.async = true;
      document.body.appendChild(script);
      setIsSCMounted(true);
    }
    setIsWidgetOpen((prev) => !prev);
  };
  return (
    <>
      <button
        className="cursor-pointer"
        aria-label={t("Player.openWidgetAriaLabel")}
      >
        <FaPlay className="altColor" />
      </button>
      {/*mount SC engine on first open*/}
      {/*toggle widget UI shell */}
    </>
  );
}
