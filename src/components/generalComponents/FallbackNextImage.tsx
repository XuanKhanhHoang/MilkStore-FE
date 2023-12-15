"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageFallback({
  src = "/",
  fallbackSrc = "/imagenotfound.jfif",
  ...rest
}: {
  src: string | undefined;
  fallbackSrc: string | undefined;
  [key: string]: any;
}) {
  const [imgSrc, set_imgSrc] = useState(src);
  useEffect(() => {
    set_imgSrc(src);
  }, [src]);

  return (
    <Image
      alt=""
      width="0"
      height="0"
      sizes="100vw"
      className="h-fit w-auto"
      {...rest}
      src={imgSrc}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          set_imgSrc(fallbackSrc);
        }
      }}
      onError={() => {
        set_imgSrc(fallbackSrc);
      }}
    />
  );
}
