import React from 'react';

import { io, Socket } from 'socket.io-client';

export const useSocket = (): Socket => {
  const socketRef = React.useRef<Socket>();

  socketRef.current = io('wss://test-chat-backend-hwads.ondigitalocean.app', {
    transports: ['websocket'],
    upgrade: false,
  });

  return socketRef.current;
};
