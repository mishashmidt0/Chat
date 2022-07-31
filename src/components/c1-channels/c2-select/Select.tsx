import React from 'react';

import arrowLanguage from '../../../assets/arrowLanguage.svg';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { ReturnComponentType } from '../../../types/componentType';
import { languageType } from '../../../types/SelectType/SelectType';
import { changeScroll } from '../../c3-superInput/slice/message-slice';
import { changeLanguage, changeSelect } from '../c4-slice/Channels-slice';

import style from './style/selectStyle.module.scss';

export const Select = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const isCollapse = useAppSelector(state => state.channels.isCollapse);
  const isSelect = useAppSelector(state => state.channels.isSelect);
  const languagesArr = useAppSelector(state => state.channels.languagesArr);
  const activeLanguage = useAppSelector(state => state.channels.activeLanguage);

  const chooseLanguage = (value: languageType): void => {
    dispatch(changeLanguage(value));
    dispatch(changeSelect(false));
    dispatch(changeScroll(true));
  };

  return (
    <div className={style.select}>
      <span
        className={style.select__activeLanguage}
        tabIndex={0}
        role="button"
        onClick={() => dispatch(changeSelect(!isSelect))}
        onKeyPress={() => dispatch(changeSelect(!isSelect))}
      >
        {activeLanguage}
        <img
          className={`${style.select__activeLanguage__img} ${
            isSelect ? style.select__activeLanguage__imgActive : ''
          }`}
          src={arrowLanguage}
          alt="arrow"
        />
      </span>
      <div
        className={`${style.select__languages} ${
          isCollapse ? style.select__languagesUp : ''
        }`}
      >
        {isSelect &&
          languagesArr.map(el => (
            <span
              tabIndex={0}
              role="button"
              onClick={() => chooseLanguage(el.language)}
              onKeyPress={() => chooseLanguage(el.language)}
              key={el.id}
            >
              {el.language}
            </span>
          ))}
      </div>
    </div>
  );
};
