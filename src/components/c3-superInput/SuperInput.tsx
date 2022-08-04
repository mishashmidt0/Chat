import React, { useCallback, useEffect, useRef, useState } from 'react';

import { EnumChat } from '../../enums/enum-chat';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { messageSocket } from '../../socket/Socket';
import { ReturnComponentType } from '../../types/componentType';
import { addMyMessage } from '../c2-chat/slice/chat-slice';

import { Emoji } from './emoji/Emoji';
import { changeMessage, changeScroll } from './slice/message-slice';
import style from './style/SuperInputStyle.module.scss';
import { filter } from './util/filter';
import { createPayload } from './util/payload';

export const SuperInput = (): ReturnComponentType => {
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();
  const message = useAppSelector(state => state.message.message);
  const isCollapse = useAppSelector(state => state.channels.isCollapse);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const changeText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeMessage(event.target.value));
  };

  const sendMessage = useCallback((event: React.KeyboardEvent, message: string): void => {
    if (event.code === EnumChat.enter) {
      const answerFilter = filter(message);

      if (answerFilter.isPasses) {
        const msg = {
          from: localStorage.name,
          text: message,
        };

        setError(answerFilter.error);
        messageSocket.send(msg);
        dispatch(addMyMessage(createPayload(message)));
        dispatch(changeMessage(''));
        dispatch(changeScroll(true));
      } else {
        setError(answerFilter.error);
      }
    }
  }, []);

  useEffect(() => {
    inputRef.current!.focus();
  }, [message]);

  return (
    <div className={`${style.SuperInput}  ${isCollapse ? style.SuperInputHidden : ''}`}>
      <input
        ref={inputRef}
        className={`${style.SuperInput__input} text`}
        type="text"
        value={message}
        onChange={event => changeText(event)}
        onKeyPress={event => sendMessage(event, message)}
        placeholder="Напишите сообщение..."
      />
      <div className={style.SuperInput__emoji}>
        <Emoji />
      </div>
      {error && <div className={`${style.error} text`}>{error}</div>}
    </div>
  );
};
