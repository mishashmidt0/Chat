import React, { useState } from 'react';

import { ReturnComponentType } from '../../types';

import { Emoji } from './emoji/Emoji';
import style from './style/TextAreaStyle.module.scss';

export const TextArea = (): ReturnComponentType => {
  const [value, setValue] = useState('');

  const changeText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return (
    <div className={style.TextArea}>
      <input
        className={`${style.TextArea__input} text`}
        type="text"
        value={value}
        onChange={event => changeText(event)}
        placeholder="Напишите сообщение..."
      />
      <div className={style.TextArea__emoji}>
        <Emoji />
      </div>
    </div>
  );
};
