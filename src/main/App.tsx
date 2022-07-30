import React, { useEffect, useState } from 'react';

import BgMini from '../assets/bg-min.jpg';
import bgMax from '../assets/bg.jpg';
import { Channels } from '../components/c1-channels/Channels';
import { Chat } from '../components/c2-chat/Chat';
import { TextArea } from '../components/c3-textArea/TextArea';
import { SelectLanguage } from '../enums/enum-channels';
import { useAppSelector } from '../redux/store';
import { ReturnComponentType } from '../types/componentType';

import style from './style/appStyle.module.scss';

export const App = (): ReturnComponentType => {
  const isCollapse = useAppSelector(state => state.channels.isCollapse);
  const isBigSize = useAppSelector(state => state.channels.isBigSize);
  const activeLanguage = useAppSelector(state => state.channels.activeLanguage);
  const [bg, setBg] = useState(BgMini);

  useEffect(() => {
    const image = new Image();

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
            <TextArea />
          </>
        )}
      </div>
    </div>
  );
};
