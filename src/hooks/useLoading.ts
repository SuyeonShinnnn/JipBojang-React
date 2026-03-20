import { useState, useRef } from 'react';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dots, setDots] = useState('');
  const intervalRef = useRef<number | null>(null);

  const startLoading = () => {
    setIsLoading(true);
    let count = 0;

    intervalRef.current = setInterval(() => {
      count = (count + 1) % 4;
      setDots('•'.repeat(count | 1));
    }, 500);
  };

  const stopLoading = () => {
    setIsLoading(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDots('');
  };

  return { isLoading, dots, startLoading, stopLoading };
};
