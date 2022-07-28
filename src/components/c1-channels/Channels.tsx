import React from 'react';

import { ReturnComponentType } from '../../types';

import { Channel } from './c1-chanel/Channel';
import { Select } from './c2-select/Select';
import { Buttons } from './c3-buttons/Buttons';
import style from './c5-style/channelsStyle.module.scss';

export const Channels = (): ReturnComponentType => {
  return (
    <div className={`${style.channels} text`}>
      <Channel />
      <Select />
      <Buttons />
    </div>
  );
};
