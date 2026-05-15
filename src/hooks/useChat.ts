import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef, useState } from 'react';

import type { ChatMessage } from '../types/consult';

interface UseChatProps {
  roomId: number | null;
  myUserId: number;
}

export const useChat = ({ roomId, myUserId }: UseChatProps) => {
  const client = useRef<Client | null>(null);

  const subscription = useRef<any>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS('/ws'),

      reconnectDelay: 5000,

      onConnect: () => {
        console.log('WebSocket Connected');

        if (!roomId) return;

        subscription.current = stompClient.subscribe(
          `/topic/chatroom/${roomId}`,
          (message) => {
            const receivedMessage: ChatMessage = JSON.parse(message.body);

            setMessages((prev) => [...prev, receivedMessage]);
          },
        );

        stompClient.publish({
          destination: '/app/chat.addUser',

          body: JSON.stringify({
            senderId: myUserId,
            roomId,
            type: 'JOIN',
          }),
        });
      },
    });

    stompClient.activate();

    client.current = stompClient;

    return () => {
      subscription.current?.unsubscribe();

      stompClient.deactivate();
    };
  }, [roomId]);

  const sendMessage = (content: string) => {
    if (!client.current?.connected || !roomId) return;

    const chatMessage: ChatMessage = {
      senderId: myUserId,
      content,
      type: 'USER',
      roomId,
      createdAt: '',
    };

    console.log(chatMessage);
    client.current.publish({
      destination: '/app/chat.sendMessage',

      body: JSON.stringify(chatMessage),
    });
  };

  return {
    messages,
    sendMessage,
    setMessages,
  };
};
