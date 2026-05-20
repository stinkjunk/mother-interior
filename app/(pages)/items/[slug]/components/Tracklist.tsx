"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowRight } from "react-icons/md";

export default function Tracklist({
  tracks,
  tracklistTitle,
  deezerInfo,
  openTrackListLabel,
  closeTrackListLabel,
}: {
  tracks: any;
  tracklistTitle: string;
  deezerInfo: string;
  openTrackListLabel: string;
  closeTrackListLabel: string;
}) {
  const [dropped, setDropped] = useState(false);
  console.log("tracks:", tracks);

  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-row w-full justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={tracks.cover.standard}
            alt={`${tracks.title} cover`}
            width={40}
            height={40}
            className="object-cover"
          />
          <div>
            <p className="font-medium text-sm">{tracks.title}</p>
            <p className="text-sm opacity-70">{tracks.artist}</p>
          </div>
        </div>
        <div className="text-right ml-auto">
          <p className="font-medium text-sm">{tracklistTitle}</p>
          <p className="text-sm opacity-70">
            {deezerInfo}{" "}
            <Link
              href={tracks.link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Deezer
            </Link>
          </p>
        </div>
      </div>
      <button
        onClick={() => setDropped((prev) => !prev)}
        className="flex items-center w-full mt-4 imgNavBtn transition-all border-2 py-1 pl-2 pr-3"
      >
        <MdArrowRight
          className={`transition-transform scale-150 ${dropped ? "rotate-90" : ""}`}
        />
        <span className="ml-auto">
          {dropped ? closeTrackListLabel : openTrackListLabel}
        </span>
      </button>
      <div className="w-full relative">
        <div
          className={`absolute w-full overflow-hidden ${dropped ? "" : "pointer-events-none"}`}
        >
          <div
            className={`w-full mb-5 border-2 border-t-0 border-mi-neutral-100 transition-all ${dropped ? "" : "-translate-y-full"}`}
          >
            {tracks.tracklist.map((track: any, index: number) => (
              <p
                key={index}
                className={`flex justify-between text-sm ${index !== 0 ? "border-t border-mi-neutral-100" : ""} bg-mi-neutral-50 px-3 py-1`}
              >
                <span>
                  {track.position}. {track.title}
                </span>
                <span>
                  {Math.floor(track.duration / 60)}:
                  {String(track.duration % 60).padStart(2, "0")}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
