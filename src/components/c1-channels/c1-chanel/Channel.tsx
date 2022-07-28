import React, { useMemo, useState } from 'react';

import arrow from '../../../assets/arrowRight.svg';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { ReturnComponentType } from '../../../types/componentType';
import { changeActiveChannel } from '../c4-slice/Channels-slice';

import style from './style/channelStyle.module.scss';

export const Channel = (): ReturnComponentType => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();
  const channelsArr = useAppSelector(state => state.channels.channelState);
  const changeChannel = (id: string): void => {
    dispatch(changeActiveChannel({ id }));
  };

  const channelArr = useMemo(
    () =>
      channelsArr.map(channel => (
        <span
          tabIndex={0}
          role="button"
          key={channel.id}
          className={`${style.channel} ${channel.isActive ? style.channel__active : ''}`}
          onClick={() => changeChannel(channel.id)}
          onKeyPress={() => changeChannel(channel.id)}
        >
          {channel.name}
        </span>
      )),
    [channelsArr],
  );

  return (
    <div className={style.channels}>
      <div className={style.channels__container}>
        <div
          className={style.channels__container__arr}
          style={isActive ? { right: '160px' } : { right: '0' }}
        >
          {channelArr}
        </div>
      </div>
      <span
        className={style.channels__container__arrow}
        tabIndex={0}
        role="button"
        onClick={() => setIsActive(!isActive)}
        onKeyPress={() => setIsActive(!isActive)}
      >
        <img
          className={`${style.channels__container__arrow__img} ${
            isActive ? style.channels__container__arrow__imgActive : ''
          }`}
          src={arrow}
          alt="arrow"
        />
      </span>
    </div>
  );
};
