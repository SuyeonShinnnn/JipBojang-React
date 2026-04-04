import { useRef, useState } from 'react';

export const useTyping = () => {
  const [isTyping, setIsTyping] = useState(false);
  const typingEpoch = useRef(0);

  const typeMessage = async (
    setMessages: React.Dispatch<React.SetStateAction<any>>,
    text: string,
    delay = 30,
  ) => {
    setIsTyping(true);
    const currentEpoch = typingEpoch.current;

    let typed = '';

    for (let i = 0; i < text.length; i++) {
      if (typingEpoch.current !== currentEpoch) return;

      typed += text[i];

      setMessages((prev: any[]) => {
        const updated = [...prev];
        updated[updated.length - 1].text = typed;
        return updated;
      });

      await new Promise((r) => setTimeout(r, delay));
    }

    setIsTyping(false);
  };

  const stopTyping = () => {
    typingEpoch.current++;
    setIsTyping(false);
  };

  return { isTyping, typeMessage, stopTyping };
};
