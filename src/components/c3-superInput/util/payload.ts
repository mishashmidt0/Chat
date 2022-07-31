import { v4 as uuidv4 } from 'uuid';

import { MyAccount } from '../../../constants/const-chat';
import { message } from '../../../types/ChatType/ChatType';

export const createPayload = (message: string): message => {
  return {
    ...MyAccount,
    id: uuidv4(),
    text: message,
    createdAt: new Date().toString(),
  };
};
