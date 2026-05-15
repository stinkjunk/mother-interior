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
    "text-mi-tomato-300",
  ];
  return (
    <div className="w-dvw h-dvh flex flex-col items-center justify-center gap-4 px-10 c404">
      <p className="text-8xl font-bold font-display">
        <span className={fourOhFourCols[(countdown + 0) % 6]}>4</span>
        <span className={fourOhFourCols[(countdown + 1) % 6]}>0</span>
        <span className={fourOhFourCols[(countdown + 2) % 6]}>4</span>
      </p>
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="flex flex-col justify-center text-center">
        {t("description")}{" "}
        <span className="h-13 relative translate-[-2%]">
          <span
            className={
              "font-display text-3xl c404 absolute w-6 bottom-0 translate-x-[-150%]"
              // + fourOhFourCols[(countdown + 6) % 6]
            }
          >
            {countdown + " "}
          </span>
          <span className="absolute bottom-0 translate-x-[-10%] translate-y-[-3%]">
            {t("seconds")}
          </span>
        </span>
      </p>
    </div>
  );
}
