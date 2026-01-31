"use client";

import { CollagePhotoType } from "../../lib/definitions";
import { RefObject, createRef, useEffect, useState } from "react";

export default function Collage({ images }: { images: CollagePhotoType[] }) {
  const [audioRefs, setAudioRefs] = useState<RefObject<HTMLAudioElement>[]>([]);

  useEffect(() => {
    setAudioRefs(prev =>
      Array(images.length)
        .fill(null)
        .map((_, i) => prev[i] || createRef())
    );
  }, [images.length]);

  function playImageAudio(imageIndex: number) {
    const audio = audioRefs[imageIndex].current;
    if (audio) {
      audio.src = images[imageIndex].audio_url;
      audio.load();
      audio.play();
    }
  }

  function pauseImageAudio(imageIndex: number) {
    const audio = audioRefs[imageIndex].current;
    audio?.pause();
  }

  return (
    <article className="h-full w-[90%] lg:w-[75%] xl:w-[60%] 2xl:w-[45%]">
      <svg
        viewBox="0 0 2700 1900"
        xmlns="http://www.w3.org/2000/svg"
        className="object-contain w-full h-full"
      >
        {images.map((i: CollagePhotoType, idx: number) => {
          return (
            <image
              key={i.id}
              href={i.url}
              width={i.width}
              height={i.height}
              x={i.x_coord + "px"}
              y={i.y_coord + "px"}
              onMouseEnter={() => playImageAudio(idx)}
              onMouseLeave={() => pauseImageAudio(idx)}
              role="presentation"
            />
          );
        })}
      </svg>
      {images.map((_, idx: number) => (
        <audio key={idx} ref={audioRefs[idx]} loop preload="auto">
          <source src="" type="audio/mpeg" />
        </audio>
      ))}
    </article>
  );
}
