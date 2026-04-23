"use client";

import { useEffect, useRef } from "react";

export function useAnimatedDiagram(playingClass: string, threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(playingClass);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [playingClass, threshold]);

  const replay = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove(playingClass);
    void el.offsetWidth; // force reflow to restart CSS animations
    el.classList.add(playingClass);
  };

  return { ref, replay };
}
