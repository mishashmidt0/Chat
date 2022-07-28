import React, { useState } from 'react';

import Picker, { IEmojiData } from 'emoji-picker-react';

import emoji from '../../../assets/emoji.svg';
import { ReturnComponentType } from '../../../types';

import style from './style/emojiStyle.module.scss';

export const Emoji = (): ReturnComponentType => {
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);
  const [isActive, setIsACtive] = useState(false);

  const onEmojiClick = (event: React.MouseEvent, emojiObject: IEmojiData): void => {
    setChosenEmoji(emojiObject);
    console.log(chosenEmoji);
  };

  const chooseEmoji = (): void => {
    setIsACtive(!isActive);
  };

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
