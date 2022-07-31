import { io } from 'socket.io-client';

import { msgType } from '../types/SuperInputType/SuperInputType';

export const socket = io('wss://test-chat-backend-hwads.ondigitalocean.app', {
  transports: ['websocket'],
  upgrade: false,
});

socket.connect();
export const messageSocket = {
  send(msg: msgType) {
    socket.emit('message', msg, (err: any) => {
      if (err) {
        console.error(err);
      } else {
        console.log('success');
      }
    });
  },
};
