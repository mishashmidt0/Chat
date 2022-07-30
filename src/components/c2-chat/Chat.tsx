import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ReturnComponentType } from '../../types/componentType';

import { MessageOther } from './messageOther/MessageOther';
import { MyMessage } from './myMessage/MyMessage';
import { changeLoading, getMessage } from './slice/chat-slice';
import style from './style/chatStyle.module.scss';

const timeout = 350;

export const Chat = (): ReturnComponentType => {
  const channelsArr = useAppSelector(state => state.channels.channelState);
  const activeChannel = channelsArr.find(el => el.isActive);

  const messages = useAppSelector(state => state.chat.messages[`${activeChannel!.id}`]);

  const limit = useAppSelector(state => state.chat.limit);
  const skip = useAppSelector(state => state.chat.skip);
  const isLoading = useAppSelector(state => state.chat.isLoading);
  const isBigSize = useAppSelector(state => state.channels.isBigSize);

  const reverseMessage = [...messages].reverse();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMessage(skip, limit));

    const chat = document.getElementById('chat');

    if (chat) {
      chat.scrollTop = chat.scrollHeight;
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

  const throttle = (
    func: (event: Event) => Promise<any>,
    timeout: number,
  ): ((...args: any[]) => void) => {
    let timer: any = null;

    return function perform(event: Event) {
      if (timer) return;

      timer = setTimeout(() => {
        func(event);

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
