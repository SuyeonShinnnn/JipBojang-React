import type { ChatMessage } from '../types/consult';

const isSameDate = (a: string, b: string) => {
  const dateA = new Date(a);
  const dateB = new Date(b);

  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
};

const isSameMinute = (a: string, b: string) => {
  const dateA = new Date(a);
  const dateB = new Date(b);

  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate() &&
    dateA.getHours() === dateB.getHours() &&
    dateA.getMinutes() === dateB.getMinutes()
  );
};

export const buildChatGroups = (messages: ChatMessage[], userId: number) => {
  return messages.map((msg, index, arr) => {
    const prev = arr[index - 1];
    const next = arr[index + 1];

    return {
      ...msg,
      isMe: msg.senderId === userId,
      showDateDivider: !prev || !isSameDate(prev.createdAt, msg.createdAt),
      showProfile: !prev || prev.senderId !== msg.senderId,
      showTime:
        !next ||
        next.senderId !== msg.senderId ||
        !isSameMinute(next.createdAt, msg.createdAt),
    };
  });
};
