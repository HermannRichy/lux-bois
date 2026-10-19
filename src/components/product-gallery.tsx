"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

/** Galerie de la fiche produit : image principale, flèches, balayage tactile et vignettes. */
export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = images.length;

  if (count === 0) {
    return <div className="h-[260px] md:h-[480px] bg-neutral-300" aria-hidden />;
  }

  const go = (i: number) => setIndex(((i % count) + count) % count);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  };

  const arrow =
    "absolute top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center bg-bg/90 border border-divider cursor-pointer hover:bg-bg active:scale-90 transition";

  return (
    <div className="flex flex-col gap-2.5" onKeyDown={onKeyDown}>
      <div
        className="relative h-[260px] md:h-[480px] overflow-hidden grayscale-photo bg-neutral-300"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        <Image
          key={index}
          src={images[index]}
          alt={count > 1 ? `${name} — photo ${index + 1} sur ${count}` : name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover animate-fade-in"
          priority={index === 0}
        />
      </div>

      {count > 1 && (
        <>
          <div className="relative -mt-[260px] md:-mt-[480px] h-[260px] md:h-[480px] pointer-events-none">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Photo précédente"
              className={`${arrow} left-2.5 pointer-events-auto`}
            >
              <IconChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Photo suivante"
              className={`${arrow} right-2.5 pointer-events-auto`}
            >
              <IconChevronRight size={20} />
            </button>
            <span className="absolute bottom-2.5 right-2.5 bg-bg/90 px-2 py-1 text-[11px] font-mono">
              {index + 1} / {count}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Photos du produit">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Voir la photo ${i + 1}`}
                onClick={() => go(i)}
                className={`relative w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden grayscale-photo cursor-pointer border-2 transition ${
                  i === index ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
