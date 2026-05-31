"use client";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa6";
import { SCWidget, useSCWidget } from "soundcloud-widget-react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { TrackMeta } from "@/lib/tracks";

export default function SCPlayerWidget({ tracks }: { tracks: TrackMeta[] }) {
  const t = useTranslations("Menu");
  const [isSCMounted, setIsSCMounted] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const widgetRef = useRef<HTMLButtonElement | null>(null);

  const { ref, state, props, controls } = useSCWidget();

  const track = tracks[currentIndex];

  useEffect(() => {
    if (!isWidgetOpen) {
      return;
    }

    const handleScroll = () => {
      setIsWidgetOpen(false);
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isWidgetOpen]);

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
        ref={widgetRef}
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
      <AnimatePresence>
        {isWidgetOpen && (
          <>
            <button
              className="absolute top-0 right-0 h-screen w-screen cursor-default!"
              onClick={() => setIsWidgetOpen(false)}
            ></button>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 w-72 bg-background border border-border rounded-lg shadow-lg p-4 flex flex-col gap-3 mr-10"
            >
              {/* Artwork + track info */}
              <div className="flex gap-3 items-center">
                {track.artwork && (
                  <div className="h-20 aspect-square mask-[url('/media/scplayer/vinyl-mask.svg')] mask-size-[100%_100%] relative">
                    <Image
                      src="/media/scplayer/vinyl-bg.webp"
                      alt=""
                      width={300}
                      height={300}
                      objectFit="cover"
                    />

                    <div className="absolute inset-0 h-full w-full flex items-center justify-center">
                      <Image
                        src={track.artwork}
                        alt={track.title}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-col overflow-hidden">
                  <span className="font-medium truncate">{track.title}</span>
                  <span className="text-xs text-muted-foreground truncate font-label">
                    {track.artist}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="tabular-nums">{fmt(state.positionMs)}</span>
                <div
                  className="flex-1 h-1 bg-foreground/50 rounded-full cursor-pointer relative"
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
                  <FaBackward className="text-foreground w-4 h-4" />
                </button>
                <button onClick={controls.toggle} className="cursor-pointer">
                  {state.isPlaying ? (
                    <FaPause className="text-foreground w-5 h-5" />
                  ) : (
                    <FaPlay className="text-foreground w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => goTo(currentIndex + 1)}
                  className="cursor-pointer"
                >
                  <FaForward className="text-foreground w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
