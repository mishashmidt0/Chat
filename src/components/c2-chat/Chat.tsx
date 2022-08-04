import React, { useEffect, useRef } from 'react';

import { quarter, timeout } from '../../constants/const-chat';
import { SelectLanguage } from '../../enums/enum-channels';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ReturnComponentType } from '../../types/componentType';
import { changeScroll } from '../c3-superInput/slice/message-slice';

import { MessageOther } from './messageOther/MessageOther';
import { MyMessage } from './myMessage/MyMessage';
import { getMessage, initMessage } from './slice/chat-slice';
import style from './style/chatStyle.module.scss';
import { throttle } from './util/throttle';

export const Chat = (): ReturnComponentType => {
  const channelsArr = useAppSelector(state => state.channels.channelState);
  const activeChannel = channelsArr.find(el => el.isActive);

  const messages = useAppSelector(state => state.chat.messages[`${activeChannel!.id}`]);

  const isLoading = useAppSelector(state => state.chat.isLoading);
  const isBigSize = useAppSelector(state => state.channels.isBigSize);
  const isScroll = useAppSelector(state => state.message.scroll);
  const activeLanguage = useAppSelector(state => state.channels.activeLanguage);
  const myName = useAppSelector(state => state.chat.myName);
  const isCollapse = useAppSelector(state => state.channels.isCollapse);

  const chatRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reverseMessage = [...messages].reverse();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initMessage());
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
    const scrolled = chat.scrollTop;

    const lineDispatch = screenHeight / quarter;

    if (scrolled < lineDispatch && !isLoading) {
      console.log('123');
      dispatch(getMessage());
    }
  };

  return (
    <div
      ref={chatRef}
      className={`${style.chat} text ${isBigSize ? style.chatLargeSize : ''} ${
        isCollapse || activeLanguage !== SelectLanguage.Russian ? style.chatHidden : ''
      }`}
    >
      <div ref={containerRef} className={style.chat__container}>
        {reverseMessage.map(el =>
          el.from === myName ? (
            <MyMessage key={el.id} {...el} />
          ) : (
            <MessageOther key={el.id} {...el} />
          ),
        )}
      </div>
    </div>
  );
};
