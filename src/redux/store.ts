import { combineReducers, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';

import ChannelsSlice, {
  changeActiveChannel,
  changeCollapse,
  changeIsBigSize,
  changeLanguage,
  changeSelect,
} from '../components/c1-channels/c4-slice/Channels-slice';
import ChatSlice, { setMessage } from '../components/c2-chat/slice/chat-slice';

const reducer = combineReducers({
  channels: ChannelsSlice,
  chat: ChatSlice,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});
export type storeType = ReturnType<typeof reducer>;

export type AllActionType =
  | ReturnType<typeof changeLanguage>
  | ReturnType<typeof changeCollapse>
  | ReturnType<typeof changeSelect>
  | ReturnType<typeof changeIsBigSize>
  | ReturnType<typeof setMessage>
  | ReturnType<typeof changeActiveChannel>;

export type TypedDispatch = ThunkDispatch<storeType, any, AllActionType>;
export const useAppDispatch = (): TypedDispatch => useDispatch<TypedDispatch>();

export const useAppSelector: TypedUseSelectorHook<storeType> = useSelector;

// @ts-ignore
window.store = store;
