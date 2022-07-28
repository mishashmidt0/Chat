import { ChannelsEnum } from '../enums/enum-channels';

export type channelsNameType =
  | ChannelsEnum.Friends
  | ChannelsEnum.Clan
  | ChannelsEnum.General
  | ChannelsEnum.Hunters
  | ChannelsEnum.News
  | ChannelsEnum.Vikings;

export type channelsArrType = {
  id: string;
  name: channelsNameType;
  isActive: boolean;
}[];
