import axios from 'axios';

import { domain } from '../constants/const-api';

export const instance = axios.create({
  baseURL: domain,
});

export const MessagesApi = {
  getMessages(skip: number, limit: number) {
    return instance.get(`api/messages?skip=${skip}&limit=${limit}`);
  },
};
