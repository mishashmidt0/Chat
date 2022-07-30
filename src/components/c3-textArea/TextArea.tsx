import React, { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { MyAccount } from '../../constants/ChatInitData';
import { EnumChat } from '../../enums/enum-chat';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { message } from '../../types/ChatType/ChatType';
import { ReturnComponentType } from '../../types/componentType';
import { addMyMessage } from '../c2-chat/slice/chat-slice';

import { Emoji } from './emoji/Emoji';
import { changeMessage } from './slice/message-slice';
import style from './style/TextAreaStyle.module.scss';

export const TextArea = (): ReturnComponentType => {
  const [isScroll, setIsScroll] = useState(false);
  const dispatch = useAppDispatch();
  const message = useAppSelector(state => state.message.message);

  const changeText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeMessage(event.target.value));
  };
  const sendMessage = (event: React.KeyboardEvent): void => {
    if (event.code === EnumChat.enter && message.trim()) {
      const payload: message = {
        ...MyAccount,
        id: uuidv4(),
        text: message,
        createdAt: new Date().toString(),
      };

      dispatch(addMyMessage(payload));
      dispatch(changeMessage(''));
      setIsScroll(true);
    }
  };

  useEffect(() => {
    // document.addEventListener("keypress", )
    const chat = document.getElementById('chat');

    if (chat) {
      chat.scrollTop = chat.scrollHeight;
      setIsScroll(false);
    }
  }, [isScroll]);

  return (
    <div className={style.TextArea}>
      <input
        id="inputMessage"
        className={`${style.TextArea__input} text`}
        type="text"
        value={message}
        onChange={event => changeText(event)}
        onKeyPress={sendMessage}
        placeholder="Напишите сообщение..."
      />
      <div className={style.TextArea__emoji}>
        <Emoji />
      </div>
    </div>
  );
};
