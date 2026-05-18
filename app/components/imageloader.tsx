"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import LoaderThing from "./loaderthing";
const loadedSrcs = new Set<string>();

export default function ImageLoader({
  className = "",
  src = "",
  alt = "",
  loading,
  loaderClasses = "bg-background",
  loaderThingClasses = "",
  fill = false,
  width,
  height,
}: {
  className?: string;
  src: string;
  alt?: string;
  loading?: "eager" | "lazy";
  loaderClasses?: string;
  loaderThingClasses?: string;
  fill?: boolean;
  width?: number;
  height?: number;
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
            className={`imageLoader absolute w-full h-full ${className} ${loaderClasses}`}
          >
            <LoaderThing
              className={
                loaderThingClasses +
                " top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              }
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Image
        src={src}
        alt={alt}
        onLoad={handleLoad}
        ref={callbackRef}
        loading={loading}
        className={className}
        {...(!fill ? { width, height } : { fill: true })}
      />
    </>
  );
}
