import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef, useState } from 'react';

export const useChat = () => {
  const client = useRef<Client | null>(null);

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5 * 1000,
      onConnect: () => {
        console.log('WebSocket Connected');

        stompClient.subscribe('/topic/messages', (message) => {
          const data = JSON.parse(message.body);

          setMessages((prev) => [...prev, data]);
        });
      },

      onStompError: (frame) => {
        console.error(frame);
      },
    });

    stompClient.activate();

    client.current = stompClient;

    return () => {
      stompClient.deactivate;
    };
  }, []);

  const sendMessage = (sender: string, message: string) => {
    client.current?.publish({
      destination: '/app/chat',
      body: JSON.stringify({ sender, message }),
    });
  };

  return {
    messages,
    sendMessage,
  };
};
