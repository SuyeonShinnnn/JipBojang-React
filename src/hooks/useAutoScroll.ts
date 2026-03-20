import { useEffect, useRef } from 'react';

export const useAutoScroll = (deps: any[]) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth',
    });
  }, deps);

  return ref;
};
