import React, { useEffect, useRef } from 'react';

import { timeout } from '../../constants/const-chat';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ReturnComponentType } from '../../types/componentType';
import { changeScroll } from '../c3-superInput/slice/message-slice';

import { MessageOther } from './messageOther/MessageOther';
import { MyMessage } from './myMessage/MyMessage';
import { changeLoading, getMessage } from './slice/chat-slice';
import style from './style/chatStyle.module.scss';
import { throttle } from './util/throttle';

export const Chat = (): ReturnComponentType => {
  const channelsArr = useAppSelector(state => state.channels.channelState);
  const activeChannel = channelsArr.find(el => el.isActive);

  const messages = useAppSelector(state => state.chat.messages[`${activeChannel!.id}`]);

  const limit = useAppSelector(state => state.chat.limit);
  const skip = useAppSelector(state => state.chat.skip);
  const isLoading = useAppSelector(state => state.chat.isLoading);
  const isBigSize = useAppSelector(state => state.channels.isBigSize);
  const isScroll = useAppSelector(state => state.message.scroll);
  const activeLanguage = useAppSelector(state => state.channels.activeLanguage);

  const chatRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reverseMessage = [...messages].reverse();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMessage(skip, limit));

    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
      chatRef.current.addEventListener('scroll', throttle(checkPosition, timeout));
    }

    return () => {
      // delete
      if (chatRef.current) {
        chatRef.current.removeEventListener('scroll', throttle(checkPosition, timeout));
      }
    };
  }, []);

  useEffect(() => {
    chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
    dispatch(changeScroll(false));
  }, [isScroll, channelsArr, activeLanguage]);

  const checkPosition = (event: Event): void => {
    const chat = event.target as HTMLElement;
    const screenHeight = containerRef.current!.scrollHeight;
    const height = chat.offsetHeight;
    const scrolled = chat.scrollTop;
    const lineDispatch = 700;

    if (scrolled < height) {
      chat.scrollTop = 200;
    }
    if (scrolled < lineDispatch && screenHeight > lineDispatch && !isLoading) {
      dispatch(changeLoading(true));
      dispatch(getMessage(skip, limit));
    }
  };

  return (
    <div
      ref={chatRef}
      className={`${style.chat} text ${isBigSize ? style.chatLargeSize : ''}`}
    >
      <div ref={containerRef} className={style.chat__container}>
        {reverseMessage.map(el =>
          el.from === 'Me' ? (
            <MyMessage key={el.id} {...el} />
          ) : (
            <MessageOther key={el.id} {...el} />
          ),
        )}
      </div>
    </div>
  );
};
