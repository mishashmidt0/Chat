import React from 'react';

import { finalMessage } from '../../../types/ChatType/ChatType';
import { ReturnComponentType } from '../../../types/componentType';
import { parseDate } from '../util/parseDate';

import style from './style/myMessageStyle.module.scss';

export const MyMessage = ({ text, createdAt }: finalMessage): ReturnComponentType => {
  return (
    <div className={style.meMessage}>
      <div className={style.meMessage__data}>{parseDate(createdAt)}</div>
      <div className={style.meMessage__container}>
        <div>{text}</div>
      </div>
    </div>
  );
};
