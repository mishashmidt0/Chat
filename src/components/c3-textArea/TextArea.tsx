import React, { useCallback, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { MyAccount } from '../../constants/const-chat';
import { EnumChat } from '../../enums/enum-chat';
import { useSocket } from '../../hook/useSocket';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { message } from '../../types/ChatType/ChatType';
import { ReturnComponentType } from '../../types/componentType';
import { addMyMessage } from '../c2-chat/slice/chat-slice';

import { Emoji } from './emoji/Emoji';
import { changeMessage, changeScroll } from './slice/message-slice';
import style from './style/TextAreaStyle.module.scss';

export const TextArea = (): ReturnComponentType => {
  const messageSocket = useSocket();
  const dispatch = useAppDispatch();
  const message = useAppSelector(state => state.message.message);
  const isScroll = useAppSelector(state => state.message.scroll);
  const channelsArr = useAppSelector(state => state.channels.channelState);

  const changeText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeMessage(event.target.value));
  };

  const sendMessage = useCallback((event: React.KeyboardEvent, message: string): void => {
    if (event.code === EnumChat.enter && message.trim()) {
      const payload: message = {
        ...MyAccount,
        id: uuidv4(),
        text: message,
        createdAt: new Date().toString(),
      };

      messageSocket.emit('message', {
        from: 'Me',
        text: message,
      });

      dispatch(addMyMessage(payload));
      dispatch(changeMessage(''));
      dispatch(changeScroll(true));
    }
  }, []);

  messageSocket.on('message', event => {
    dispatch(addMyMessage(event));
    dispatch(changeScroll(true));
  });

  useEffect(() => {
    const chat = document.getElementById('chat');

    if (chat) {
      chat.scrollTop = chat.scrollHeight;
      dispatch(changeScroll(false));
    }
  }, [isScroll, channelsArr]);

  return (
    <div className={style.TextArea}>
      <input
        id="inputMessage"
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
