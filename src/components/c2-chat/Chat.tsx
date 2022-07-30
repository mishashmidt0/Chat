import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ReturnComponentType } from '../../types/componentType';

import { MessageOther } from './messageOther/MessageOther';
import { MyMessage } from './myMessage/MyMessage';
import { getMessage } from './slice/chat-slice';
import style from './style/chatStyle.module.scss';

const timeout = 300;

export const Chat = (): ReturnComponentType => {
  const messages = useAppSelector(state => state.chat.message);
  const limit = useAppSelector(state => state.chat.limit);
  const skip = useAppSelector(state => state.chat.skip);
  const isBigSize = useAppSelector(state => state.channels.isBigSize);

  const reverseMessage = [...messages].reverse();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMessage(skip, limit));

    const chat = document.getElementById('chat');

    if (chat) {
      chat.addEventListener('scroll', throttle(checkPosition, timeout));
    }

    return () => {
      // delete
      if (chat) {
        chat.removeEventListener('scroll', throttle(checkPosition, timeout));
      }
    };
  }, []);

  const checkPosition = async (event: Event): Promise<any> => {
    const container = document.getElementById('chat_container')!;
    const chat = event.target as HTMLElement;
    const screenHeight = container.scrollHeight;
    const scrolled = chat.scrollTop;
    const lineDispatch = 700;

    if (scrolled < lineDispatch && screenHeight > lineDispatch) {
      chat.scrollTop = 800;
      dispatch(getMessage(skip, limit));
    }
  };

  const throttle = (
    callee: (event: Event) => Promise<any>,
    timeout: number,
  ): ((...args: any[]) => void) => {
    let timer: any = null;

    return function perform(event: Event) {
      if (timer) return;

      timer = setTimeout(() => {
        callee(event);

        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  };

  return (
    <div
      className={`${style.chat} text ${isBigSize ? style.chatLargeSize : ''}`}
      id="chat"
    >
      <div className={style.chat__container} id="chat_container">
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
