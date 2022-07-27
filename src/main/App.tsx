import React from 'react';

import { Channels } from '../components/c1-channels/Channels';
import { Chat } from '../components/c2-chat/Chat';
import { TextArea } from '../components/c3-textArea/TextArea';
import { useAppSelector } from '../redux/store';
import { ReturnComponentType } from '../types';

import style from './style/appStyle.module.scss';

export const App = (): ReturnComponentType => {
  const isCollapse = useAppSelector(state => state.channels.isCollapse);
  const isBigSize = useAppSelector(state => state.channels.isBigSize);

  return (
    <div className={style.app}>
      <div
        className={`${style.app__chat} ${isCollapse ? style.app__chatClose : ''} ${
          isBigSize ? style.app__bigChat : ''
        }`}
      >
        <Channels />
        {!isCollapse && <Chat /> && <TextArea />}
      </div>
    </div>
  );
};
