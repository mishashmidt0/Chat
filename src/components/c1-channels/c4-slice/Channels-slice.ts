import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { ChannelsEnum, SelectLanguage } from '../../../enums/enum-channels';
import { SliceName } from '../../../enums/enum-slice';
import { channelsArrType } from '../../../types/ChannelsType';
import { languageType, selectType } from '../../../types/SelectType';

// state
const initialState: channelsType = {
  languagesArr: [
    { id: uuidv4(), language: SelectLanguage.Russian },
    { id: uuidv4(), language: SelectLanguage.English },
    { id: uuidv4(), language: SelectLanguage.Chinese },
  ],
  activeLanguage: SelectLanguage.Russian,
  channelState: [
    { id: uuidv4(), name: ChannelsEnum.General, isActive: true },
    { id: uuidv4(), name: ChannelsEnum.Friends, isActive: false },
    { id: uuidv4(), name: ChannelsEnum.Clan, isActive: false },
    { id: uuidv4(), name: ChannelsEnum.News, isActive: false },
    { id: uuidv4(), name: ChannelsEnum.Vikings, isActive: false },
    { id: uuidv4(), name: ChannelsEnum.Hunters, isActive: false },
  ],
  isCollapse: false,
  isSelect: false,
  isBigSize: false,
};

// toolkit
const ChannelsSlice = createSlice({
  name: SliceName.channels,
  initialState,
  reducers: {
    changeLanguage(state, { payload }) {
      return { ...state, activeLanguage: payload };
    },
    changeCollapse(state, { payload }) {
      return { ...state, isCollapse: payload, isSelect: false };
    },
    changeSelect(state, { payload }) {
      return { ...state, isSelect: payload };
    },
    changeIsBigSize(state, { payload }) {
      return { ...state, isBigSize: payload };
    },
    changeActiveChannel(state, { payload: { id } }) {
      return {
        ...state,
        channelState: state.channelState.map(el =>
          el.id === id ? { ...el, isActive: true } : { ...el, isActive: false },
        ),
      };
    },
  },
});

export default ChannelsSlice.reducer;

// action
export const {
  changeLanguage,
  changeActiveChannel,
  changeCollapse,
  changeSelect,
  changeIsBigSize,
} = ChannelsSlice.actions;

// type
export type channelsType = {
  languagesArr: selectType;
  activeLanguage: languageType;

  channelState: channelsArrType;
  isCollapse: boolean;
  isSelect: boolean;
  isBigSize: boolean;
};
