import React, { useEffect } from 'react';

import { scrollMax } from '../../constants/ChatInitData';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ReturnComponentType } from '../../types/componentType';

import { MessageOther } from './messageOther/MessageOther';
import { MyMessage } from './myMessage/MyMessage';
import { getMessage } from './slice/chat-slice';
import style from './style/chatStyle.module.scss';

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
      chat.scrollTop = chat.scrollHeight;
      chat.addEventListener('scroll', () => {
        if (chat.scrollHeight - chat.scrollTop <= chat.scrollTop - scrollMax) {
          // dispatch(getMessage(skip, limit));
        }
      });
    }
  }, []);

  return (
    <div
      className={`${style.chat} text ${isBigSize ? style.chatLargeSize : ''}`}
      id="chat"
    >
      {reverseMessage.map(el =>
        el.from === 'Me' ? (
          <MyMessage key={el.id} {...el} />
        ) : (
          <MessageOther key={el.id} {...el} />
        ),
      )}
    </div>
  );
};
