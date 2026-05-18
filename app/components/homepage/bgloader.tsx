"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import LoaderThing from "../loaderthing";
const loadedSrcs = new Set<string>();

export default function BgLoader({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(() => loadedSrcs.has(src));

  const callbackRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (node?.complete && node.naturalWidth > 0) {
        loadedSrcs.add(src);
        setLoaded(true);
      }
    },
    [src]
  );

  const handleLoad = () => {
    loadedSrcs.add(src);
    setLoaded(true);
  };

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute h-full w-full flex items-center justify-center z-50 bg-background"
          >
            <LoaderThing />
          </motion.div>
        )}
      </AnimatePresence>
      <Image
        ref={callbackRef}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        className={className}
        fill
      />
    </>
  );
}
