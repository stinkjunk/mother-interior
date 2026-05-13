"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    if (countdown === 0) {
      window.history.back();
    }
    return () => clearInterval(timer);
  }, [countdown]);
  const t = useTranslations("NotFound");
  const fourOhFourCols = [
    "text-mi-blue-700",
    "text-mi-tomato-500",
    "text-mi-yellow-500",
    "text-mi-mint-500",
    "text-mi-neutral-500",
  ];
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 px-10 c404">
      <p className="text-8xl font-bold font-display tras">
        <span className={fourOhFourCols[(countdown + 0) % 5]}>4</span>
        <span className={fourOhFourCols[(countdown + 1) % 5]}>0</span>
        <span className={fourOhFourCols[(countdown + 2) % 5]}>4</span>
      </p>
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="text-lg">
        {t("description")} <span className="font-bold">{countdown}</span>{" "}
        {t("seconds")}
      </p>
    </div>
  );
}
