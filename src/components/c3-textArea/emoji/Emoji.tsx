import React, { useEffect, useState } from 'react';

import Picker, { IEmojiData } from 'emoji-picker-react';

import emoji from '../../../assets/emoji.svg';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { ReturnComponentType } from '../../../types/componentType';
import { changeMessage } from '../slice/message-slice';

import style from './style/emojiStyle.module.scss';

export const Emoji = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const message = useAppSelector(state => state.message.message);
  const [isActive, setIsActive] = useState(false);

  const onEmojiClick = (event: React.MouseEvent, emojiObject: IEmojiData): void => {
    dispatch(changeMessage(`${message}${emojiObject?.emoji}`));
  };

  const chooseEmoji = (): void => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const messageInput = document.getElementById('inputMessage');

    if (messageInput) {
      messageInput.focus();
    }
  }, [message]);

  return (
    <>
      <div role="presentation" onClick={chooseEmoji} onKeyPress={chooseEmoji}>
        <img src={emoji} alt="emoji" className={style.emoji__smile} />
      </div>
      <div className={style.emoji__picker}>
        {isActive && <Picker onEmojiClick={onEmojiClick} />}
      </div>
    </>
  );
};
