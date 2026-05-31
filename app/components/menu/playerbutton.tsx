"use client";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa6";
import { SCWidget, useSCWidget } from "soundcloud-widget-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import type { TrackMeta } from "@/lib/tracks";

export default function PlayerButton({ tracks }: { tracks: TrackMeta[] }) {
  const t = useTranslations("Menu");
  const [isSCMounted, setIsSCMounted] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { ref, state, props, controls } = useSCWidget();

  const track = tracks[currentIndex];

  const toggleWidget = () => {
    if (!isSCMounted) setIsSCMounted(true);
    setIsWidgetOpen((prev) => !prev);
    console.log("url: " + track.url);
  };

  const goTo = (index: number) => {
    const next = (index + tracks.length) % tracks.length;
    setCurrentIndex(next);
    controls.load(tracks[next].url);
  };

  // Format ms -> m:ss
  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  const progress =
    state.durationMs > 0 ? (state.positionMs / state.durationMs) * 100 : 0;

  return (
    <>
      <button
        className="cursor-pointer"
        onClick={toggleWidget}
        aria-label={t("Player.openWidgetAriaLabel")}
      >
        {state.isPlaying ? (
          <FaPause className="altColor" />
        ) : (
          <FaPlay className="altColor" />
        )}
      </button>

      {/* SC engine — hidden, never unmounts after first open */}
      {isSCMounted && (
        <SCWidget
          ref={ref}
          url={track.url}
          hidden
          autoPlay={false}
          {...props}
        />
      )}

      {/* UI shell — toggled freely */}
      {isWidgetOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-background border border-border rounded-lg shadow-lg p-4 flex flex-col gap-3">
          {/* Artwork + track info */}
          <div className="flex gap-3 items-center">
            {track.artwork && (
              <Image
                src={track.artwork}
                alt={track.title}
                width={56}
                height={56}
                className="rounded object-cover shrink-0"
              />
            )}
            <div className="flex flex-col overflow-hidden">
              <span className="font-medium text-sm truncate">
                {track.title}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {track.artist}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="tabular-nums">{fmt(state.positionMs)}</span>
            <div
              className="flex-1 h-1 bg-border rounded-full cursor-pointer relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                controls.seekTo(pct * state.durationMs);
              }}
            >
              <div
                className="h-full bg-foreground rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="tabular-nums">
              {state.durationMs > 0 ? fmt(state.durationMs) : "--:--"}
            </span>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-6">
            <button
              onClick={() => goTo(currentIndex - 1)}
              className="cursor-pointer"
            >
              <FaBackward className="altColor w-4 h-4" />
            </button>
            <button onClick={controls.toggle} className="cursor-pointer">
              {state.isPlaying ? (
                <FaPause className="altColor w-5 h-5" />
              ) : (
                <FaPlay className="altColor w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => goTo(currentIndex + 1)}
              className="cursor-pointer"
            >
              <FaForward className="altColor w-4 h-4" />
            </button>
          </div>

          {/* Track list */}
          <div className="flex flex-col gap-1 mt-1 max-h-40 overflow-y-auto">
            {tracks.map((t, i) => (
              <button
                key={t.url}
                onClick={() => goTo(i)}
                className={`text-left text-xs px-2 py-1.5 rounded cursor-pointer truncate transition-colors
                  ${i === currentIndex ? "bg-foreground text-background" : "hover:bg-border"}`}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
