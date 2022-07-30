import React, { useEffect, useState } from 'react';

import BgMini from '../assets/bg-min.jpg';
import bgMax from '../assets/bg.jpg';
import { Channels } from '../components/c1-channels/Channels';
import { Chat } from '../components/c2-chat/Chat';
import { addMyMessage } from '../components/c2-chat/slice/chat-slice';
import { changeScroll } from '../components/c3-superInput/slice/message-slice';
import { SuperInput } from '../components/c3-superInput/SuperInput';
import { SelectLanguage } from '../enums/enum-channels';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { socket } from '../socket/Socket';
import { ReturnComponentType } from '../types/componentType';

import style from './style/appStyle.module.scss';

export const App = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isCollapse = useAppSelector(state => state.channels.isCollapse);
  const isBigSize = useAppSelector(state => state.channels.isBigSize);
  const activeLanguage = useAppSelector(state => state.channels.activeLanguage);
  const [bg, setBg] = useState(BgMini);

  useEffect(() => {
    const image = new Image();

    socket.on('message', event => {
      dispatch(addMyMessage(event));
      dispatch(changeScroll(true));
    });

    image.src = bgMax;
    image.onload = () => {
      setBg(bgMax);
    };
  }, []);

  return (
    <div className={style.app} style={{ backgroundImage: `url(${bg})` }}>
      <div
        className={`${style.app__chat} ${isCollapse ? style.app__chatClose : ''} ${
          isBigSize ? style.app__bigChat : ''
        }`}
      >
        <Channels />
        {!isCollapse && (
          <>
            {activeLanguage === SelectLanguage.Russian && <Chat />}
            <SuperInput />
          </>
        )}
      </div>
    </div>
  );
};
