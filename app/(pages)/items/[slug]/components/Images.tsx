"use client";

import { useState } from "react";
import ImageLoader from "@/app/components/imageloader";
import Image from "next/image";

import { MdArrowLeft } from "react-icons/md";
import { MdArrowRight } from "react-icons/md";

export default function Images({
  urls,
  title,
  className = "",
  imageX = "",
  thumbnailX = "",
  ofX = "",
}: {
  urls: string[];
  title: string;
  className?: string;
  imageX?: string;
  thumbnailX?: string;
  ofX?: string;
}) {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? urls.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === urls.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={className}>
      <div className="sm:ml-25 relative w-full sm:w-4/10 md:w-3/10 aspect-square">
        <ImageLoader
          src={urls[currentImage]}
          alt={`${title} (${imageX} ${currentImage + 1} ${ofX} ${urls.length})`}
          fill
          className="object-cover"
        />
        {urls.length > 1 && (
          <div className="absolute w-full h-full bottom-0 flex justify-evenly items-end px-5 sm:px-10">
            <div className="absolute left-0 max-sm:h-full sm:bottom-0 h-full flex">
              <button
                onClick={handlePrev}
                className="bg-background h-7 w-7 max-sm:h-10 max-sm:w-8 ml-5 max-sm:my-auto sm:mt-auto sm:mb-5 transition-all hover:bg-foreground"
              >
                <MdArrowLeft
                  size={1}
                  className="fill-foreground h-full w-full transition-all hover:fill-background"
                />
              </button>
            </div>
            {urls.map((_, i) => (
              <button onClick={() => setCurrentImage(i)} key={i}>
                <Image
                  src={urls[i]}
                  alt={`${title} (${thumbnailX} ${i + 1} ${ofX} ${urls.length})`}
                  width={20}
                  height={20}
                  className={`object-cover h-7 w-7 transition-all mb-5 mt-auto ${i === currentImage ? "" : "opacity-30"}`}
                />
              </button>
            ))}
            <div className="absolute right-0 max-sm:h-full sm:bottom-0 h-full flex">
              <button
                onClick={handleNext}
                className="bg-background h-7 w-7 max-sm:h-10 max-sm:w-8 mr-5 max-sm:my-auto sm:mt-auto sm:mb-5 transition-all hover:bg-foreground"
              >
                <MdArrowRight
                  size={1}
                  className="fill-foreground h-full w-full transition-all hover:fill-background"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
