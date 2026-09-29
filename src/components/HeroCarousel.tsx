"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Dict } from "@/lib/i18n";

const slides = [
  "/hero/mooda-hero-woman-01.webp",
  "/hero/mooda-hero-man-01.webp",
  "/hero/mooda-hero-woman-02.webp",
  "/hero/mooda-hero-man-02.webp",
  "/hero/mooda-hero-woman-03.webp",
] as const;

export function HeroCarousel({ d }: { d: Dict }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={d.carouselLabel}
      tabIndex={0}
      className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sand md:aspect-[5/4]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <Image
        key={slides[current]}
        src={slides[current]}
        alt={d.heroImageAlts[current]}
        fill
        priority={current === 0}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="hero-slide-in object-cover"
      />
    </div>
  );
}
