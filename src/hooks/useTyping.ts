import { useEffect, useRef, useState } from 'react';

interface UseTypingOptions {
  text: string;
  typeSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
}

export const useTyping = ({
  text,
  typeSpeed = 80,
  pauseAfterType = 2000,
  pauseAfterDelete = 600,
}: UseTypingOptions) => {
  const [displayText, setDisplayText] = useState('');

  const iRef = useRef(0);
  const deletingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isMounted = true;

    const tick = () => {
      if (!isMounted) return;

      if (!deletingRef.current) {
        if (iRef.current < text.length) {
          iRef.current++;
          setDisplayText(text.slice(0, iRef.current));
          timerRef.current = setTimeout(tick, typeSpeed);
        } else {
          deletingRef.current = true;
          timerRef.current = setTimeout(tick, pauseAfterType);
        }
      } else {
        setDisplayText('');
        iRef.current = 0;
        deletingRef.current = false;
        timerRef.current = setTimeout(tick, pauseAfterDelete);
      }
    };

    tick();

    return () => {
      isMounted = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, typeSpeed, pauseAfterType, pauseAfterDelete]);

  return displayText;
};
