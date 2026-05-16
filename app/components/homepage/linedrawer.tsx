"use client";

import { useEffect, useState } from "react";

interface LineCoords {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  lineName: string;
}

export default function LineDrawer() {
  const [lines, setLines] = useState<LineCoords[]>([]);

  useEffect(() => {
    const calculate = () => {
      const pairs: [string, string, string][] = [
        [".bBox.Vinyls", ".dskHeroLink.Vinyls", "Vinyls"],
        [".bBox.Interior", ".dskHeroLink.Interior", "Interior"],
        [".bBox.Vinyls", ".dskHeroLink.allItems", "allItemsVinyls"],
        [".bBox.Interior", ".dskHeroLink.allItems", "allItemsInterior"],
      ];

      const isMobile =
        typeof window !== "undefined" && window.innerWidth <= 640;

      setLines(
        pairs.flatMap(([boxSel, linkSel, lineName]) => {
          const box = document.querySelector(boxSel);
          const link = document.querySelector(linkSel);
          if (!box || !link) return [];

          const b = box.getBoundingClientRect();
          const l = link.getBoundingClientRect();

          // Desktop: keep previous behaviour (center-to-right-center)
          if (!isMobile) {
            return [
              {
                x1: b.left,
                y1: b.top + b.height / 2,
                x2: l.right,
                y2: l.top + l.height / 2,
                lineName,
              },
            ];
          }

          // Mobile tweaks per request
          if (lineName === "Vinyls") {
            // start from bottom-center of bounding box, stop at bottom-center of link
            return [
              {
                x1: b.left + b.width / 2,
                y1: b.top + b.height,
                x2: l.left + l.width / 2,
                y2: l.top + l.height,
                lineName,
              },
            ];
          }

          if (lineName === "Interior") {
            // start from top-left corner of bounding box, stop at right side of the link (keep vertical mid)
            return [
              {
                x1: b.left,
                y1: b.top,
                x2: l.right,
                y2: l.top + l.height / 2,
                lineName,
              },
            ];
          }

          // Fallback for allItems variants: keep previous behaviour but on mobile these are hidden by CSS
          return [
            {
              x1: b.left,
              y1: b.top + b.height / 2,
              x2: l.right,
              y2: l.top + l.height / 2,
              lineName,
            },
          ];
        })
      );
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  if (lines.length === 0) return null;

  return (
    <svg
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          strokeWidth={1}
          className={`stroke-mi-yellow-300 dskLine ${l.lineName}`}
        />
      ))}
    </svg>
  );
}
