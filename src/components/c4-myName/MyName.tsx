import React, { useState } from 'react';

import { EnumChat } from '../../enums/enum-chat';
import { useAppDispatch } from '../../redux/store';
import { ReturnComponentType } from '../../types/componentType';
import { setMyName } from '../c2-chat/slice/chat-slice';

import style from './style/myNameStyle.module.scss';

export const MyName = (): ReturnComponentType => {
  const [value, setValue] = useState<string>('');
  const dispatch = useAppDispatch();

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };
  const sendName = (event: React.KeyboardEvent): void => {
    if (event.code === EnumChat.enter && value.trim()) {
      localStorage.setItem('name', value);
      dispatch(setMyName(value));
    }
  };

  return (
    <div className={style.myName}>
      <div className={style.myName__container}>
        <p className="text">Введите Ваше имя:</p>
        <input type="text" value={value} onChange={changeValue} onKeyPress={sendName} />
      </div>
    </div>
  );
};
