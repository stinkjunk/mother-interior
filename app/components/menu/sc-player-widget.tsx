"use client";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaChevronDown,
} from "react-icons/fa6";
import { SCWidget, useSCWidget } from "soundcloud-widget-react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { TrackMeta } from "@/lib/tracks";

export default function SCPlayerWidget({ tracks }: { tracks: TrackMeta[] }) {
  const t = useTranslations("Menu.Player");
  const [isSCMounted, setIsSCMounted] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [isTrackListOpen, setIsTrackListOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayPositionMs, setDisplayPositionMs] = useState(0);
  const widgetRef = useRef<HTMLButtonElement | null>(null);
  const displayPositionRef = useRef(0);
  const lastSyncRef = useRef<number | null>(null);
  const pausedPositionRef = useRef(0);

  const { ref, state, props, controls } = useSCWidget();

  const track = tracks[currentIndex];
  const durationMs = state.durationMs > 0 ? state.durationMs : track.durationMs;

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

  useEffect(() => {
    if (!state.isPlaying || durationMs <= 0) {
      lastSyncRef.current = null;
      return;
    }

    lastSyncRef.current = performance.now();

    const timer = setInterval(() => {
      const now = performance.now();
      const previousSync = lastSyncRef.current ?? now;
      const elapsed = now - previousSync;
      const nextPosition = Math.min(
        displayPositionRef.current + elapsed,
        durationMs
      );

      displayPositionRef.current = nextPosition;
      setDisplayPositionMs(nextPosition);
      lastSyncRef.current = now;
    }, 100);

    return () => clearInterval(timer);
  }, [state.isPlaying, durationMs]);

  const syncDisplayPosition = (positionMs: number) => {
    const clampedPosition = Math.max(
      0,
      Math.min(positionMs, durationMs || positionMs)
    );
    pausedPositionRef.current = clampedPosition;
    displayPositionRef.current = clampedPosition;
    setDisplayPositionMs(clampedPosition);
    lastSyncRef.current = performance.now();
  };

  const handlePlaybackToggle = () => {
    if (state.isPlaying) {
      syncDisplayPosition(displayPositionRef.current);
      controls.pause();
      return;
    }

    const resumePosition = pausedPositionRef.current;
    if (resumePosition > 0) {
      syncDisplayPosition(resumePosition);
      controls.seekTo(resumePosition);
    }

    controls.play();
  };

  const loadTrack = (nextIndex: number) => {
    const wasPlaying = state.isPlaying;
    const nextTrack = tracks[nextIndex];

    setCurrentIndex(nextIndex);
    setDisplayPositionMs(0);
    displayPositionRef.current = 0;
    lastSyncRef.current = null;
    pausedPositionRef.current = 0;

    controls.pause();
    controls.load(nextTrack.url, {
      callback: () => {
        controls.seekTo(0);

        if (wasPlaying) {
          controls.play();
        }
      },
    });
  };

  const toggleWidget = () => {
    if (!isSCMounted) setIsSCMounted(true);
    setIsWidgetOpen((prev) => !prev);
    console.log("url: " + track.url);
  };

  const goTo = (index: number) => {
    const next = (index + tracks.length) % tracks.length;
    loadTrack(next);
  };

  // format
  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return h > 0
      ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
      : `${m}:${String(sec).padStart(2, "0")}`;
  };

  const progress = durationMs > 0 ? (displayPositionMs / durationMs) * 100 : 0;

  return (
    <>
      <button
        className={"cursor-pointer"}
        onClick={toggleWidget}
        ref={widgetRef}
        aria-label={t("openWidgetAriaLabel")}
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
          onPause={(e) => {
            props.onPause?.(e);
            const pausedPosition =
              e?.currentPosition ?? displayPositionRef.current;
            syncDisplayPosition(pausedPosition);
          }}
          onPlay={(e) => {
            props.onPlay?.(e);
            const currentPosition =
              e?.currentPosition ?? pausedPositionRef.current;
            if (currentPosition >= 0) {
              pausedPositionRef.current = currentPosition;
              displayPositionRef.current = currentPosition;
              setDisplayPositionMs(currentPosition);
            }
          }}
          onPlayProgress={(e) => {
            props.onPlayProgress?.(e);
            const currentPosition =
              e?.currentPosition ?? displayPositionRef.current;
            displayPositionRef.current = currentPosition;
            setDisplayPositionMs(currentPosition);
            pausedPositionRef.current = currentPosition;
          }}
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
              className="absolute top-full right-0 w-72  mr-10"
            >
              <div className="w-full bg-background border border-border rounded-lg shadow-lg p-4 flex flex-col gap-3">
                {/* Artwork + track info */}
                <div className="flex gap-3 items-center">
                  {track.artwork && (
                    <div
                      className="h-20 aspect-square mask-[url('/media/scplayer/vinyl-mask.svg')] mask-size-[100%_100%] relative transition-all"
                      style={{ rotate: `${displayPositionMs * 0.05}deg` }}
                    >
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

                <div
                  className={`${durationMs <= 0 ? "opacity-50 pointer-events-none" : ""} flex flex-col gap-4`}
                >
                  {/* Progress bar */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="tabular-nums">
                      {fmt(displayPositionMs)}
                    </span>
                    <div
                      className="flex-1 h-1 bg-foreground/50 rounded-full cursor-pointer relative"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pct = (e.clientX - rect.left) / rect.width;
                        const nextPosition = pct * durationMs;
                        setDisplayPositionMs(nextPosition);
                        displayPositionRef.current = nextPosition;
                        pausedPositionRef.current = nextPosition;
                        lastSyncRef.current = performance.now();
                        controls.seekTo(nextPosition);
                      }}
                    >
                      <div
                        className="h-full bg-foreground rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="tabular-nums">
                      {durationMs > 0 ? fmt(durationMs) : "--:--"}
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
                    <button
                      onClick={handlePlaybackToggle}
                      className="cursor-pointer"
                    >
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
                </div>
                <button
                  className={`cursor-pointer w-full flex justify-between items-center p-2 rounded text-xs font-label transition-colors
                    ${isTrackListOpen ? "text-background bg-foreground" : ""}
                    `}
                  onClick={() => setIsTrackListOpen((prev) => !prev)}
                >
                  <span>
                    {isTrackListOpen
                      ? t("closeTrackListLabel")
                      : t("openTrackListLabel")}
                  </span>
                  <FaChevronDown
                    className={`transition-all ${isTrackListOpen ? "text-background" : "rotate-180"} w-4 h-4`}
                  />
                </button>
              </div>
              {/* Track list */}
              <AnimatePresence>
                {isTrackListOpen && (
                  <motion.div
                    className="flex flex-col mt-3 max-h-40 overflow-y-auto w-full p-4 bg-background border border-border rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {tracks.map((t, i) => (
                      <button
                        key={t.url}
                        onClick={() => goTo(i)}
                        className={`text-left text-xs py-3 px-2 rounded cursor-pointer truncate transition-colors flex items-center
                        ${i === currentIndex ? "bg-foreground text-background" : "hover:bg-border"}`}
                      >
                        <span className="w-full truncate">{t.title}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
