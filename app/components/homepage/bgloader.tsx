"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import LoaderThing from "../loaderthing";

export default function BgLoader({
  className = "",
  src = "",
  alt = "",
}: {
  className?: string;
  src: string;
  alt?: string;
}) {
  const [loaded, setLoaded] = useState(false);

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
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={className}
        fill
      />
    </>
  );
}
