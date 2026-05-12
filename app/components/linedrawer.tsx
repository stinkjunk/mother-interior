"use client";

import { useEffect, useState } from "react";

interface LineCoords {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function LineDrawer() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [lines, setLines] = useState<LineCoords[]>([]);

  useEffect(() => {
    if (!isDesktop) return;

    const calculate = () => {
      const pairs: [string, string, string][] = [
        [".bBox.Vinyls", ".dskHeroLink.Vinyls", "Vinyls"],
        [".bBox.Interior", ".dskHeroLink.Interior", "Interior"],
      ];

      setLines(
        pairs.flatMap(([boxSel, linkSel]) => {
          const box = document.querySelector(boxSel);
          const link = document.querySelector(linkSel);
          if (!box || !link) return [];

          const b = box.getBoundingClientRect();
          const l = link.getBoundingClientRect();
          return [
            {
              x1: b.left,
              y1: b.top + b.height / 2,
              x2: l.right,
              y2: l.top + l.height / 2,
            },
          ];
        })
      );
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [isDesktop]);

  if (!isDesktop || lines.length === 0) return null;

  return (
    <svg
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
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
          className={`stroke-mi-yellow-300 dskLine ${i === 0 ? "Vinyls" : "Interior"}`}
        />
      ))}
    </svg>
  );
}
