import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ReturnComponentType } from '../../types/componentType';

import { MessageOther } from './messageOther/MessageOther';
import { MyMessage } from './myMessage/MyMessage';
import { getMessage } from './slice/chat-slice';
import style from './style/chatStyle.module.scss';

export const Chat = (): ReturnComponentType => {
  const messages = useAppSelector(state => state.chat.message);
  const isBigSize = useAppSelector(state => state.channels.isBigSize);

  const reverseMessage = [...messages].reverse();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMessage());
  }, []);

  return (
    <div className={`${style.chat} text ${isBigSize ? style.chatLargeSize : ''}`}>
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
