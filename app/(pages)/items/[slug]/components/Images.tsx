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
  priceInt = "",
  priceDec = "",
  isSold = false,
}: {
  urls: string[];
  title: string;
  className?: string;
  imageX?: string;
  thumbnailX?: string;
  ofX?: string;
  priceInt?: string;
  priceDec?: string;
  isSold?: boolean;
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
      <div className="md:ml-25 relative aspect-square">
        {priceInt ? (
          <div className="md:-ml-25 absolute bottom-0 mb-15 md:mb-20 left-0 px-3 pr-2 pl-5 md:pl-30 text-2xl font-label z-10 filterTag border-2 border-l-0 flex">
            {isSold ? (
              `Sold`
            ) : (
              <>
                {priceInt}
                {priceDec != "00" && (
                  <span className="text-lg">,{priceDec}</span>
                )}
                <span className="ml-2">DKK</span>
              </>
            )}
          </div>
        ) : null}
        <ImageLoader
          src={urls[currentImage]}
          alt={`${title} (${imageX} ${currentImage + 1} ${ofX} ${urls.length})`}
          fill
          className="object-cover"
        />
        {urls.length > 1 && (
          <div className="absolute w-full h-full bottom-0 flex justify-evenly items-end px-5 md:px-10">
            <div className="absolute left-0 max-md:h-full md:bottom-0 h-full flex">
              <button
                onClick={handlePrev}
                className="border-2 h-7 w-7 max-md:h-10 max-md:w-8 ml-5 max-md:my-auto md:mt-auto md:mb-5 transition-all imgNavBtn"
              >
                <MdArrowLeft
                  size={1}
                  className="h-full w-full transition-all"
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
                  className={`object-cover h-7 w-7 transition-all mb-5 mt-auto ${i === currentImage ? "" : "opacity-50"}`}
                />
              </button>
            ))}
            <div className="absolute right-0 max-md:h-full md:bottom-0 h-full flex">
              <button
                onClick={handleNext}
                className="border-2 h-7 w-7 max-md:h-10 max-md:w-8 mr-5 max-md:my-auto md:mt-auto md:mb-5 transition-all imgNavBtn"
              >
                <MdArrowRight
                  size={1}
                  className="h-full w-full transition-all"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
