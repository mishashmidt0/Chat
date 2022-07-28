import React from 'react';

import adminIco from '../../../assets/admin.svg';
import btc from '../../../assets/BTC.svg';
import { finalMessage } from '../../../types/ChatType/ChatType';
import { ReturnComponentType } from '../../../types/componentType';
import { parseDate } from '../util/parseDate';

import style from './style/messageOtherStyle.module.scss';

export const MessageOther = ({
  from,
  lvl,
  text,
  createdAt,
}: finalMessage): ReturnComponentType => {
  return (
    <div className={style.messageOther}>
      <div className={style.messageOther__container}>
        <div className={style.messageOther__name}>
          <img src={btc} alt="btc" />
          <span>{from}</span>
          <img src={adminIco} alt="adminIco" />
          <span>{lvl}</span>
        </div>
        <div className={style.messageOther__text}>{text}</div>
      </div>
      <div className={style.messageOther__data}>{parseDate(createdAt)}</div>
    </div>
  );
};
