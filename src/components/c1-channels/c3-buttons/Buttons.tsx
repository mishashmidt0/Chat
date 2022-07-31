import React from 'react';

import collapse from '../../../assets/collapse.svg';
import sizeDoMore from '../../../assets/sizeDoMore.svg';
import { timeDelaySize } from '../../../constants/const-channels';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { ReturnComponentType } from '../../../types/componentType';
import { changeScroll } from '../../c3-superInput/slice/message-slice';
import { changeCollapse, changeIsBigSize } from '../c4-slice/Channels-slice';

import style from './style/buttonsStyle.module.scss';

export const Buttons = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isCollapse = useAppSelector(state => state.channels.isCollapse);
  const isBigSize = useAppSelector(state => state.channels.isBigSize);
  const collapsing = (): void => {
    if (!isCollapse && isBigSize) {
      dispatch(changeIsBigSize(false));
      dispatch(changeCollapse(true));
    } else {
      dispatch(changeCollapse(!isCollapse));
    }
    setTimeout(() => {
      dispatch(changeScroll(true));
    }, timeDelaySize);
  };

  const makeBigSize = (): void => {
    if (isCollapse && !isBigSize) {
      dispatch(changeIsBigSize(true));
      dispatch(changeCollapse(false));
    } else {
      dispatch(changeIsBigSize(!isBigSize));
    }
    setTimeout(() => {
      dispatch(changeScroll(true));
    }, timeDelaySize);
  };

  return (
    <>
      <div
        className={style.size}
        role="presentation"
        onClick={makeBigSize}
        onKeyPress={makeBigSize}
      >
        <img src={sizeDoMore} alt="expand" />
      </div>

      <div
        className={style.collapse}
        role="presentation"
        onClick={collapsing}
        onKeyPress={collapsing}
      >
        <img src={collapse} alt="collapse" />
      </div>
    </>
  );
};
