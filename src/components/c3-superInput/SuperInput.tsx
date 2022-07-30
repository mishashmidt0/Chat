import React, { useCallback, useEffect, useRef } from 'react';

import { EnumChat } from '../../enums/enum-chat';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { messageSocket } from '../../socket/Socket';
import { ReturnComponentType } from '../../types/componentType';
import { addMyMessage } from '../c2-chat/slice/chat-slice';

import { Emoji } from './emoji/Emoji';
import { changeMessage, changeScroll } from './slice/message-slice';
import style from './style/TextAreaStyle.module.scss';
import { createPayload } from './util/payload';

export const SuperInput = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const message = useAppSelector(state => state.message.message);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const changeText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeMessage(event.target.value));
  };

  const sendMessage = useCallback((event: React.KeyboardEvent, message: string): void => {
    if (event.code === EnumChat.enter && message.trim()) {
      const msg = {
        from: localStorage.name,
        text: message,
      };

      messageSocket.send(msg);
      dispatch(addMyMessage(createPayload(message)));
      dispatch(changeMessage(''));
      dispatch(changeScroll(true));
    }
  }, []);

  useEffect(() => {
    inputRef.current!.focus();
  }, [message]);

  return (
    <div className={style.TextArea}>
      <input
        ref={inputRef}
        className={`${style.TextArea__input} text`}
        type="text"
        value={message}
        onChange={event => changeText(event)}
        onKeyPress={event => sendMessage(event, message)}
        placeholder="Напишите сообщение..."
      />
      <div className={style.TextArea__emoji}>
        <Emoji />
      </div>
    </div>
  );
};
