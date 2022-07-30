import { v4 as uuidv4 } from 'uuid';

import { chatType } from '../components/c2-chat/slice/chat-slice';

import {
  VikingsId,
  ClanId,
  FriendsId,
  GeneralId,
  HuntersId,
  NewsId,
} from './const-channels';

export const timeout = 350;
const data = new Date().toString();

export const limit = 10;
export const skip = 0;
export const scrollMax = 250;

export const MyAccount = {
  id: uuidv4(),
  from: 'Me',
  text: '',
  createdAt: '',
  lvl: 10,
};

export const initialState: chatType = {
  skip,
  limit,
  isLoading: false,
  myName: localStorage.getItem('name'),
  messages: {
    [GeneralId]: [
      {
        id: uuidv4(),
        from: 'Me',
        text: 'Сегодня идем на Германию',
        createdAt: data,
        lvl: 10,
      },
      {
        id: uuidv4(),
        from: 'Skylifesky',
        text: 'Цена 1 wac =0,1$ и цена не изменится',
        createdAt: data,
        lvl: 10,
      },
      {
        id: uuidv4(),
        from: 'Nigativ',
        text: 'wac можно только купить',
        createdAt: data,
        lvl: 3,
      },
      {
        id: uuidv4(),
        from: 'BivOld',
        text: 'Я думал, что они будут пополнятся разв н-ное время. А тут реально игра закончена',
        createdAt: data,
        lvl: 5,
      },
      {
        id: uuidv4(),
        from: 'Skylifesky',
        text: 'Прикольно. все СОС потрачены, теперь игра закончена)))',
        createdAt: data,
        lvl: 10,
      },
    ],
    [VikingsId]: [],
    [ClanId]: [],
    [FriendsId]: [],
    [HuntersId]: [],
    [NewsId]: [],
  },
};
