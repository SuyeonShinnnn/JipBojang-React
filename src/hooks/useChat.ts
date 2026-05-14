import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '../types/consult';

export const useChat = () => {
  const client = useRef<Client | null>(null);

  const connected = useRef(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (connected.current) return;

    connected.current = true;

    const stompClient = new Client({
      webSocketFactory: () => new SockJS('/ws'),

      reconnectDelay: 5000,

      onConnect: () => {
        console.log('WebSocket Connected');

        stompClient.subscribe('/topic/public', (message) => {
          const receivedMessage: ChatMessage = JSON.parse(message.body);

          setMessages((prev) => [...prev, receivedMessage]);
        });

        stompClient.publish({
          destination: '/app/chat.addUser',

          body: JSON.stringify({
            sender: 'me',
            type: 'JOIN',
          }),
        });
      },

      onStompError: (frame) => {
        console.error(frame);
      },

      onWebSocketError: (error) => {
        console.error(error);
      },
    });

    stompClient.activate();

    client.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const sendMessage = (sender: string, content: string) => {
    if (!client.current?.connected) return;

    const chatMessage: ChatMessage = {
      sender,
      content,
      type: 'CHAT',
      roomId: 'room-1',
      timestamp: '',
    };

    client.current.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(chatMessage),
    });
  };

  return {
    messages,
    sendMessage,
  };
};
